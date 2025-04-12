import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff, Flower, UserPlus, Mail } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { otpService } from '@/services/otp.service';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await register(formData.email, formData.password, {
        firstName: formData.firstName,
        lastName: formData.lastName
      });
      
      toast({
        title: "Success!",
        description: "Account created successfully. Please log in.",
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Failed to create account",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!forgotPasswordEmail) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }
    
    setIsSendingOTP(true);
    
    try {
      await otpService.sendOTP({
        email: forgotPasswordEmail,
        type: 'password-reset'
      });
      
      setOtpSent(true);
      toast({
        title: "OTP Sent",
        description: "Please check your email for the verification code.",
      });
    } catch (error) {
      toast({
        title: "Failed to send OTP",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsSendingOTP(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp) {
      toast({
        title: "Error",
        description: "Please enter the verification code",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await otpService.verifyOTP({
        email: forgotPasswordEmail,
        otp
      });
      
      setOtpVerified(true);
      toast({
        title: "Success",
        description: "Email verified successfully",
      });
      setForgotPasswordOpen(false);
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: error instanceof Error ? error.message : "Invalid verification code",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="py-12 md:py-24 flex items-center justify-center">
      <Card className="w-full max-w-md border-2 border-gray-100">
        <div className="h-2 bg-gradient-to-r from-bloom-light-pink to-bloom-light-green"></div>
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-3">
            <div className="rounded-full bg-bloom-light-pink/20 p-3">
              <Flower className="h-6 w-6 text-bloom-pink" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center text-bloom-green">Create Account</CardTitle>
          <CardDescription className="text-center">
            Enter your details to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-bloom-green hover:bg-bloom-green/90"
              disabled={isSubmitting}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <p className="text-center text-sm text-gray-600 w-full">
            Already have an account?{" "}
            <Link to="/login" className="text-bloom-pink hover:underline">
              Sign in
            </Link>
          </p>
          
          <Dialog open={forgotPasswordOpen} onOpenChange={setForgotPasswordOpen}>
            <DialogTrigger asChild>
              <Button variant="link" className="text-sm text-bloom-pink">
                Forgot Password?
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Reset Password</DialogTitle>
                <DialogDescription>
                  {!otpSent 
                    ? "Enter your email address and we'll send you a verification code."
                    : "Enter the verification code sent to your email."
                  }
                </DialogDescription>
              </DialogHeader>
              {!otpSent ? (
                <form onSubmit={handleSendOTP} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="resetEmail">Email</Label>
                    <Input
                      id="resetEmail"
                      type="email"
                      placeholder="you@example.com"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      required
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      className="bg-bloom-green hover:bg-bloom-green/90"
                      disabled={isSendingOTP}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      {isSendingOTP ? "Sending..." : "Send Verification Code"}
                    </Button>
                  </DialogFooter>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp">Verification Code</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      required
                    />
                  </div>
                  <DialogFooter className="flex flex-col space-y-2">
                    <Button
                      type="submit"
                      className="w-full bg-bloom-green hover:bg-bloom-green/90"
                    >
                      Verify Code
                    </Button>
                    <Button
                      type="button"
                      variant="link"
                      onClick={handleSendOTP}
                      className="text-sm"
                    >
                      Resend Code
                    </Button>
                  </DialogFooter>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage; 