import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { authService } from "@/services/auth.service";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const AddUser = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;

  const { register } = useAuth();
  const [user, setUser] = useState<User>({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    if (isEditing) {
      // In a real app, you would fetch the user data here
      setUser({
        _id: id,
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: ""
      });
    }
  }, [id, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save the user here
    try {
      await register(user.email, user.password, {
        firstName: user.firstName,
        lastName: user.lastName
      });
      toast({
        title: "Success!",
        description: "Account created successfully.",
      });
      navigate('/profile/system-parameters/users');
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create user",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (field: keyof User, value: string | boolean) => {
    setUser(prev => ({
      ...prev,
      [field]: value
    }));
  };



  return (
    <div className="space-y-6">
      <Card className="border-2 border-gray-100 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-bloom-light-pink to-bloom-light-green animate-gradient-x"></div>
        <CardHeader>
          <CardTitle className="flex items-center text-bloom-green">
            <Users className="h-5 w-5 mr-2 text-bloom-pink" />
            {isEditing ? "Edit User" : "Add New User"}
          </CardTitle>
          <CardDescription>
            {isEditing ? "Update user information and permissions" : "Create a new system user account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={user.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="Enter first name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={user.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Enter last name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={user.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>



            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/profile/system-parameters/users")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-bloom-green hover:bg-bloom-green/90"
              >
                <Save className="mr-2 h-4 w-4" />
                {isEditing ? "Update User" : "Create User"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddUser; 