
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading profile...</div>;
  }

  // Get first letter of first and last name for avatar
  const getInitials = (name: string) => {
    return name.split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="bloom-container py-12">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="text-2xl bg-bloom-light-pink text-bloom-pink">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">Role:</span>
                  <span className="font-medium capitalize">{user.role}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">Member since:</span>
                  <span className="font-medium">April 2025</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">Status:</span>
                  <span className="font-medium text-green-500">Active</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>View your personal information below</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                  <p className="mt-1">{user.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                  <p className="mt-1">{user.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Account Type</h3>
                  <p className="mt-1 capitalize">{user.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent activity on Bloom Express</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Logged in</p>
                    <p className="text-gray-500">Successfully logged into your account</p>
                  </div>
                  <span className="text-xs text-gray-500">Today</span>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Viewed products</p>
                    <p className="text-gray-500">Browsed through seasonal flowers</p>
                  </div>
                  <span className="text-xs text-gray-500">Yesterday</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Updated profile</p>
                    <p className="text-gray-500">Changed account preferences</p>
                  </div>
                  <span className="text-xs text-gray-500">3 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
