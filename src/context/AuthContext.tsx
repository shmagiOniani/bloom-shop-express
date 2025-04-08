
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export type UserRole = 'customer' | 'manager' | 'admin';

export interface User {
  id: number | string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasRole: (role: UserRole | UserRole[]) => boolean;
  register: (email: string, password: string, profile: { firstName: string; lastName: string }) => Promise<boolean>;
}

// Mock users for development
const mockUsers: User[] = [
  { id: 1, name: 'Customer User', email: 'customer@example.com', role: 'customer' },
  { id: 2, name: 'Store Manager', email: 'manager@example.com', role: 'manager' },
  { id: 3, name: 'Admin User', email: 'admin@example.com', role: 'admin' },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      try {
        // Check if there's an active session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setIsLoading(false);
          return;
        }
        
        if (session) {
          // If we have a session, get the user
          handleUserSession(session);
        } else {
          // Check for stored user in localStorage (fallback for development)
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Session check error:', error);
        setIsLoading(false);
      }
    };
    
    // Initial session check
    checkSession();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event);
      
      if (event === 'SIGNED_IN' && session) {
        handleUserSession(session);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        localStorage.removeItem('user');
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const handleUserSession = async (session: any) => {
    try {
      // For now, we'll use a simplified user object
      // In a production app, you would likely fetch additional user data from your profiles table
      const userData: User = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
        // Default to customer role for new users
        role: session.user.user_metadata?.role || 'customer'
      };
      
      setUser(userData);
      // Store in localStorage as fallback
      localStorage.setItem('user', JSON.stringify(userData));
      setIsLoading(false);
    } catch (error) {
      console.error('Error handling user session:', error);
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Try to sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error('Supabase login error:', error);
        
        // Fallback to mock users for development
        if (process.env.NODE_ENV === 'development') {
          console.info('Falling back to mock users for development');
          const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
          
          if (foundUser && password === 'password') {
            setUser(foundUser);
            localStorage.setItem('user', JSON.stringify(foundUser));
            return true;
          }
        }
        
        return false;
      }
      
      // Successful login with Supabase
      return !!data.session;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const hasRole = (role: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    
    return user.role === role;
  };

  const register = async (email: string, password: string, profile: { firstName: string; lastName: string }): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: `${profile.firstName} ${profile.lastName}`,
            role: 'customer' // Default role for new users
          }
        }
      });
      
      if (error) {
        console.error('Registration error:', error);
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive"
        });
        return false;
      }
      
      toast({
        title: "Registration successful",
        description: "Your account has been created. Please check your email for verification instructions.",
      });
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      register,
      isAuthenticated: !!user,
      isLoading,
      hasRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
