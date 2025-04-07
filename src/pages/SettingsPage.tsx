
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";

const SettingsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  
  // Form states
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user profile
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };
  
  const handleNotificationSave = () => {
    toast({
      title: "Notification Preferences Saved",
      description: "Your notification settings have been updated.",
    });
  };
  
  const handleSecuritySave = () => {
    toast({
      title: "Security Settings Updated",
      description: "Your security settings have been saved.",
    });
  };

  if (!user) {
    return <div>Loading settings...</div>;
  }

  return (
    <div className="bloom-container py-12">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <form onSubmit={handleProfileUpdate}>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Account Type</Label>
                  <Input 
                    id="role" 
                    value={user.role}
                    disabled
                    className="bg-gray-100"
                  />
                  <p className="text-xs text-gray-500">Account type cannot be changed</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="bg-bloom-pink hover:bg-bloom-pink/90">
                  Save Changes
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Manage your app preferences and notification settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Collapsible
                open={isNotificationsOpen}
                onOpenChange={setIsNotificationsOpen}
                className="border rounded-md"
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4">
                  <h3 className="text-lg font-medium">Notification Settings</h3>
                  <ChevronDown className={`h-5 w-5 transition-transform ${isNotificationsOpen ? 'transform rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 pt-0 border-t">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="email-notifications" />
                      <Label htmlFor="email-notifications">Email notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="order-updates" defaultChecked />
                      <Label htmlFor="order-updates">Order updates</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="promotions" />
                      <Label htmlFor="promotions">Promotional offers</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="newsletter" defaultChecked />
                      <Label htmlFor="newsletter">Newsletter</Label>
                    </div>
                    <Button onClick={handleNotificationSave} className="mt-2 bg-bloom-pink hover:bg-bloom-pink/90">
                      Save Notification Settings
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
              
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-4">Display Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="dark-mode" />
                    <Label htmlFor="dark-mode">Dark mode</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="high-contrast" />
                    <Label htmlFor="high-contrast">High contrast</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="animations" defaultChecked />
                    <Label htmlFor="animations">Show animations</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-bloom-pink hover:bg-bloom-pink/90">
                Save All Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Security</CardTitle>
              <CardDescription>
                Manage your privacy and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Collapsible
                open={isSecurityOpen}
                onOpenChange={setIsSecurityOpen}
                className="border rounded-md"
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4">
                  <h3 className="text-lg font-medium">Security Settings</h3>
                  <ChevronDown className={`h-5 w-5 transition-transform ${isSecurityOpen ? 'transform rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 pt-0 border-t">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <Button onClick={handleSecuritySave} className="mt-2 bg-bloom-pink hover:bg-bloom-pink/90">
                      Update Password
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
              
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-4">Privacy Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="data-collection" defaultChecked />
                    <Label htmlFor="data-collection">Allow data collection for improved experience</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="third-party" />
                    <Label htmlFor="third-party">Share data with third parties</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cookies" defaultChecked />
                    <Label htmlFor="cookies">Accept cookies</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-bloom-pink hover:bg-bloom-pink/90 mr-2">
                Save Privacy Settings
              </Button>
              <Button variant="outline" className="text-red-500 hover:text-red-700 border-red-500 hover:border-red-700">
                Delete Account
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
