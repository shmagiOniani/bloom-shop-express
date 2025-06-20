import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Store } from "lucide-react";
import { DialogTrigger, Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { userService } from "@/services/user.service";

const Overview = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    userService.updateUserStatus(user.id, "manager").then((res) => {
      toast({
        title: "Application Submitted",
        description: "Your store application has been submitted for review.",
      });
      logout();
    })
    .catch((err) => {
      toast({
        title: "Error",
        description: "An error occurred while submitting your application.",
      });
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  const handleCancel = () => {
    setIsSubmitting(false);
  };

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                View your personal information below
              </CardDescription>
            </div>
            <div>
              {user?.role === "customer" && (
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-bloom-green hover:bg-bloom-green/90">
                      <Store className="mr-2 h-4 w-4" />
                      Apply for Store Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      დსფსდფ
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button type="button" variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmit} className="bg-bloom-green hover:bg-bloom-green/90">
                        Submit
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
              <p className="mt-1">{user.firstName} {user.lastName}</p>
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
    </>
  );
};

export default Overview; 