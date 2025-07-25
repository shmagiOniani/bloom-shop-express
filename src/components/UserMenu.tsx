import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  LogIn,
  LogOut,
  Settings,
  ShieldCheck,
  User,
  Store,
  Package,
} from "lucide-react";

const UserMenu = () => {
  const { user, logout, isAuthenticated, hasRole } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleLogout = () => {
    logout();
    toast({
      title: t('user.logout'),
      description: t('user.logoutText'),
    });
  };

  if (!isAuthenticated) {
    return (
      <Link to="/login">
        <Button
          variant="outline"
          className="border-bloom-pink text-bloom-pink hover:bg-bloom-light-pink/10"
        >
          <LogIn className="mr-2 h-4 w-4" />
          {t("user.login")}
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-bloom-pink bg-white text-bloom-pink hover:bg-bloom-light-pink/10 flex gap-2"
        >
          <User className="h-4 w-4" />
          {user?.firstName?.split(" ")[0] || t("user.account")}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
      <DropdownMenuLabel>{t("user.account")}</DropdownMenuLabel>
        <Link to="/profile">
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>{t("user.profile")}</span>
          </DropdownMenuItem>
        </Link>
        {hasRole(["manager", "admin"]) && (
          <>
          

         
         
            {hasRole("admin") && (
              <Link to="/admin-panel">
                <DropdownMenuItem className="cursor-pointer">
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  <span>{t("user.adminPanel")}</span>
                </DropdownMenuItem>
              </Link>
            )}
          </>
        )}

     

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-red-500 focus:text-red-500"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t("user.logout")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
