
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { LogIn, LogOut, Settings, ShieldCheck, User, Store, Package } from 'lucide-react';

const UserMenu = () => {
  const { user, logout, isAuthenticated, hasRole } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  if (!isAuthenticated) {
    return (
      <Link to="/login">
        <Button variant="outline" className="border-bloom-pink text-bloom-pink hover:bg-bloom-light-pink/10">
          <LogIn className="mr-2 h-4 w-4" />
          Login
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-bloom-pink bg-white text-bloom-pink hover:bg-bloom-light-pink/10 flex gap-2">
          <User className="h-4 w-4" />
          {user?.name?.split(' ')[0] || 'Account'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to="/profile">
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        <Link to="/settings">
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </Link>
        
        {hasRole(['manager', 'admin']) && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Management</DropdownMenuLabel>
            <Link to="/store-management">
              <DropdownMenuItem className="cursor-pointer">
                <Store className="mr-2 h-4 w-4" />
                <span>Store Management</span>
              </DropdownMenuItem>
            </Link>
            <Link to="/product-management">
              <DropdownMenuItem className="cursor-pointer">
                <Package className="mr-2 h-4 w-4" />
                <span>Product Management</span>
              </DropdownMenuItem>
            </Link>
            {hasRole('admin') && (
              <DropdownMenuItem className="cursor-pointer">
                <ShieldCheck className="mr-2 h-4 w-4" />
                <span>Admin Panel</span>
              </DropdownMenuItem>
            )}
          </>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:text-red-500">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
