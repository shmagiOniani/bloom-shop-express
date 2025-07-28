import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Database, ArrowLeft, Download, Upload, Trash2, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Backup {
  _id: string;
  name: string;
  size: string;
  createdAt: string;
  status: "completed" | "in_progress" | "failed";
}

const DataManagement = () => {
  const navigate = useNavigate();
  const [backups, setBackups] = useState<Backup[]>([
    {
      _id: "1",
      name: "backup_2024_01_15_10_30",
      size: "2.5 GB",
      createdAt: "2024-01-15T10:30:00Z",
      status: "completed"
    },
    {
      _id: "2",
      name: "backup_2024_01_14_10_30",
      size: "2.3 GB",
      createdAt: "2024-01-14T10:30:00Z",
      status: "completed"
    },
    {
      _id: "3",
      name: "backup_2024_01_13_10_30",
      size: "2.4 GB",
      createdAt: "2024-01-13T10:30:00Z",
      status: "completed"
    }
  ]);

  const [isCreatingBackup, setIsCreatingBackup] = useState(false);

  const handleCreateBackup = () => {
    setIsCreatingBackup(true);
    // Simulate backup creation
    setTimeout(() => {
      const newBackup: Backup = {
        _id: Date.now().toString(),
        name: `backup_${new Date().toISOString().slice(0, 19).replace(/:/g, '_')}`,
        size: "2.5 GB",
        createdAt: new Date().toISOString(),
        status: "completed"
      };
      setBackups([newBackup, ...backups]);
      setIsCreatingBackup(false);
    }, 3000);
  };

  const handleDeleteBackup = (backupId: string) => {
    setBackups(backups.filter(backup => backup._id !== backupId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Backup Management */}
        <Card className="border-2 border-gray-100 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-bloom-light-pink to-bloom-light-green animate-gradient-x"></div>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center text-bloom-green">
                  <Database className="h-5 w-5 mr-2 text-bloom-pink" />
                  Backup Management
                </CardTitle>
                <CardDescription>
                  Create and manage system backups
                </CardDescription>
              </div>
              <Button
                className="bg-bloom-green hover:bg-bloom-green/90"
                onClick={handleCreateBackup}
                disabled={isCreatingBackup}
              >
                {isCreatingBackup ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="mr-2 h-4 w-4" />
                )}
                {isCreatingBackup ? "Creating..." : "Create Backup"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {backups.map((backup) => (
                <div key={backup._id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{backup.name}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(backup.createdAt).toLocaleDateString()} • {backup.size}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(backup.status)}`}>
                      {backup.status.replace('_', ' ')}
                    </span>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDeleteBackup(backup._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Data Statistics */}
        <Card className="border-2 border-gray-100 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-bloom-light-pink to-bloom-light-green animate-gradient-x"></div>
          <CardHeader>
            <CardTitle className="flex items-center text-bloom-green">
              <Database className="h-5 w-5 mr-2 text-bloom-pink" />
              Data Statistics
            </CardTitle>
            <CardDescription>
              System data overview and metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900">Total Products</h4>
                  <p className="text-2xl font-bold text-blue-600">1,247</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900">Total Users</h4>
                  <p className="text-2xl font-bold text-green-600">892</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900">Total Orders</h4>
                  <p className="text-2xl font-bold text-purple-600">5,634</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-900">Database Size</h4>
                  <p className="text-2xl font-bold text-orange-600">2.5 GB</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataManagement; 