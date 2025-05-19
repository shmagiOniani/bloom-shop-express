import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast, useToast } from "@/components/ui/use-toast";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Store } from "lucide-react";
import { storeService } from "@/services/store.ervice";
import { Store as StoreType } from "@/pages/StoresPage";
import { FormControl, FormMessage } from "@/components/ui/form";
import { FormItem, FormLabel } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { Form, useForm, FormProvider } from "react-hook-form";

const SettingsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [name, setName] = useState(
    user?.firstName + " " + user?.lastName || ""
  );
  const [email, setEmail] = useState(user?.email || "");

  const form = useForm<StoreType>({
    defaultValues: {
      name: "",
      address: "",
      city: "",
      phone: "",
      hours: "",
    },
  });

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

  const handleSubmit = async (data: StoreType) => {
      setIsSubmitting(true);

    try {
      await storeService.apply(data).then((res) => {
        toast({
          title: "Application Submitted",
          description: "Your store application has been submitted for review.",
        });
      });

    

      setIsOpen(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit store application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.reset();
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
                  <p className="text-xs text-gray-500">
                    Account type cannot be changed
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="bg-bloom-pink hover:bg-bloom-pink/90"
                >
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
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      isNotificationsOpen ? "transform rotate-180" : ""
                    }`}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 pt-0 border-t">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="email-notifications" />
                      <Label htmlFor="email-notifications">
                        Email notifications
                      </Label>
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
                    <Button
                      onClick={handleNotificationSave}
                      className="mt-2 bg-bloom-pink hover:bg-bloom-pink/90"
                    >
                      Save Notification Settings
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-4">
                  Display Preferences
                </h3>
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
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      isSecurityOpen ? "transform rotate-180" : ""
                    }`}
                  />
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
                      <Label htmlFor="confirm-password">
                        Confirm New Password
                      </Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <Button
                      onClick={handleSecuritySave}
                      className="mt-2 bg-bloom-pink hover:bg-bloom-pink/90"
                    >
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
                    <Label htmlFor="data-collection">
                      Allow data collection for improved experience
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="third-party" />
                    <Label htmlFor="third-party">
                      Share data with third parties
                    </Label>
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
              <Button
                variant="outline"
                className="text-red-500 hover:text-red-700 border-red-500 hover:border-red-700"
              >
                Delete Account
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {user?.role === "customer" && (
        <div className="mt-6 p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Become a Store Owner</h2>
          <p className="text-gray-600 mb-4">
            Want to sell your products? Apply to become a store owner!
          </p>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-bloom-green hover:bg-bloom-green/90">
                <Store className="mr-2 h-4 w-4" />
                Apply for Store Account
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Store Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Bloom Express Downtown"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main Street" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="Seattle" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                     
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="(206) 555-1234" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="hours"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Hours</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Mon-Sat: 9am-7pm, Sun: 10am-5pm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleCancel()}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-bloom-green hover:bg-bloom-green/90"
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  </div>
                </form>
              </FormProvider>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
