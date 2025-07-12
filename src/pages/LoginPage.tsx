import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Flower, LogIn } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import GoogleAuthBtns from "@/components/google/google-auth-btns";

const LoginPage = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the return URL from location state or default to home
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await login(email, password);

      if (success) {
        toast({
          title: t("login.success"),
          description: t("login.successText"),
        });
        navigate(from, { replace: true });
      } else {
        toast({
          title: t("login.loginFailed"),
          description: t("login.invalidEmailOrPassword"),
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: t("login.error"),
        description: t("login.errorText"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 md:py-12  flex items-center justify-center">
      <Card className="w-full max-w-md border-2 border-gray-100">
        <div className="h-2 bg-gradient-to-r from-bloom-light-pink to-bloom-light-green"></div>
        <CardHeader className="space-y-1">
          {/* <div className="flex justify-center mb-3">
            <div className="rounded-full bg-bloom-light-pink/20 p-3">
              <Flower className="h-6 w-6 text-bloom-pink" />
            </div>
          </div> */}
          <CardTitle className="text-2xl text-center text-bloom-green">
            {t("login.welcomeBack")}
          </CardTitle>
          <CardDescription className="text-center">
            {t("login.welcomeBackDesc")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("login.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("login.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-gray-200 focus:border-bloom-green"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t("login.password")}</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-bloom-pink hover:underline"
                  >
                    {t("login.forgotPassword")}
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-gray-200 focus:border-bloom-green"
                />
              </div>
              <div className="text-end text-sm text-gray-600">
                {t("login.dontHaveAccount")}
                <Link
                  to="/register"
                  className="text-bloom-pink hover:underline"
                >
                  {t("login.signUp")}
                </Link>
              </div>
              <Button
                type="submit"
                className="w-full bg-bloom-green hover:bg-bloom-green/90"
                disabled={isSubmitting}
              >
                <LogIn className="mr-2 h-4 w-4" />
                {isSubmitting ? t("login.signingIn") : t("login.signIn")}
              </Button>
              <GoogleAuthBtns />
            </div>
          </form>
        </CardContent>
        {/* <CardFooter className="flex flex-col space-y-4">
      
          <div className="text-center text-sm text-gray-600">
            <span>Demo accounts:</span>
            <div className="mt-2 space-y-1">
              <div><strong>Manager:</strong> manager@gmail.com </div>
              <div><strong>Admin:</strong> admin@gmail.com </div>
              <div><strong>Customer:</strong> customer@gmail.com </div>
              <div className="mt-1 text-xs text-gray-500">(Use password: "Aa123456#" for all)</div>
            </div>
          </div>
        </CardFooter> */}
      </Card>
    </div>
  );
};

export default LoginPage;
