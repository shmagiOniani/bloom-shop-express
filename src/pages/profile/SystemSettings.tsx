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
import { Switch } from "@/components/ui/switch";
import { Settings, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface SystemSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  maintenanceMode: boolean;
  allowRegistration: boolean;
  maxFileSize: number;
  sessionTimeout: number;
}

const SystemSettings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<SystemSettings>({
    siteName: "Bloom Express",
    siteDescription: "Your trusted flower delivery service",
    contactEmail: "contact@bloomexpress.com",
    maintenanceMode: false,
    allowRegistration: true,
    maxFileSize: 10,
    sessionTimeout: 30
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save the settings here
    console.log("Saving settings:", settings);
  };

  const handleInputChange = (field: keyof SystemSettings, value: string | number | boolean) => {
    setSettings(prev => ({
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
            <Settings className="h-5 w-5 mr-2 text-bloom-pink" />
            System Settings
          </CardTitle>
          <CardDescription>
            Configure system-wide settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => handleInputChange("siteName", e.target.value)}
                  placeholder="Enter site name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                  placeholder="Enter contact email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="siteDescription">Site Description</Label>
              <Input
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => handleInputChange("siteDescription", e.target.value)}
                placeholder="Enter site description"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
                <Input
                  id="maxFileSize"
                  type="number"
                  value={settings.maxFileSize}
                  onChange={(e) => handleInputChange("maxFileSize", parseInt(e.target.value))}
                  min="1"
                  max="100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleInputChange("sessionTimeout", parseInt(e.target.value))}
                  min="5"
                  max="1440"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                  <p className="text-sm text-gray-500">Enable maintenance mode to restrict access</p>
                </div>
                <Switch
                  id="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => handleInputChange("maintenanceMode", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="allowRegistration">Allow User Registration</Label>
                  <p className="text-sm text-gray-500">Allow new users to register accounts</p>
                </div>
                <Switch
                  id="allowRegistration"
                  checked={settings.allowRegistration}
                  onCheckedChange={(checked) => handleInputChange("allowRegistration", checked)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/profile/system-parameters")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-bloom-green hover:bg-bloom-green/90"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemSettings; 