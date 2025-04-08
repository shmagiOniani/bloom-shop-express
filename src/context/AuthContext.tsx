
import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

export type UserRole = 'customer' | 'manager' | 'admin';

interface UserProfile {
  firstName: string;
  lastName: string;
}

export interface User {
  id: string;
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
  register: (email: string, password: string, profile: UserProfile) => Promise<any>;
}

// Mock users for demonstration
const mockUsers: User[] = [
  { id: '1', name: 'Customer User', email: 'customer@example.com', role: 'customer' },
  { id: '2', name: 'Store Manager', email: 'manager@example.com', role: 'manager' },
  { id: '3', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Convert Firebase user to our User type
  const createUserFromFirebaseUser = async (firebaseUser: FirebaseUser): Promise<User> => {
    try {
      // Try to get user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      const userData = userDoc.data();
      
      return {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || userData?.firstName + ' ' + userData?.lastName || 'User',
        email: firebaseUser.email || '',
        role: userData?.role || 'customer'
      };
    } catch (error) {
      console.warn('Failed to get user data from Firestore, using default values');
      return {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || 'User',
        email: firebaseUser.email || '',
        role: 'customer'
      };
    }
  };

  useEffect(() => {
    // First check local storage for cached user
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user', e);
        localStorage.removeItem('user');
      }
    }

    // Then listen for Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);
      if (firebaseUser) {
        try {
          const appUser = await createUserFromFirebaseUser(firebaseUser);
          setUser(appUser);
          localStorage.setItem('user', JSON.stringify(appUser));
        } catch (error) {
          console.error('Error setting up user from Firebase:', error);
          // Fallback to mock user for development
          setUser(mockUsers[0]);
          localStorage.setItem('user', JSON.stringify(mockUsers[0]));
        }
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
      setIsLoading(false);
    });

    // If auth state doesn't change in 2 seconds, assume we're in dev mode and use mock user
    const timeout = setTimeout(() => {
      if (isLoading && !user) {
        console.log('Using mock user for development');
        setUser(mockUsers[0]);
        localStorage.setItem('user', JSON.stringify(mockUsers[0]));
        setIsLoading(false);
      }
    }, 2000);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // For development/demo, allow login with mock users
      const mockUser = mockUsers.find(u => u.email === email);
      if (mockUser && password === 'password') {
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return true;
      }

      // Real authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      const appUser = await createUserFromFirebaseUser(firebaseUser);
      setUser(appUser);
      localStorage.setItem('user', JSON.stringify(appUser));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Let the component handle the error
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if Firebase logout fails, clear local state
      setUser(null);
      localStorage.removeItem('user');
      throw error;
    }
  };

  const hasRole = (role: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    
    return user.role === role;
  };

  const register = async (email: string, password: string, profile: UserProfile) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Update display name
      await updateProfile(firebaseUser, {
        displayName: `${profile.firstName} ${profile.lastName}`
      });

      // Store additional user data in Firestore
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: email,
        role: 'customer', // Default role
        createdAt: new Date().toISOString()
      });

      // Set user in state
      const appUser: User = {
        id: firebaseUser.uid,
        name: `${profile.firstName} ${profile.lastName}`,
        email: email,
        role: 'customer'
      };
      
      setUser(appUser);
      localStorage.setItem('user', JSON.stringify(appUser));

      return firebaseUser;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      isLoading,
      hasRole,
      register
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
