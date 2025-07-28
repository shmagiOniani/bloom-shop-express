import { CustomTable } from "@/components/reusable/custom-table/CustomTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit, MapPin, Plus, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Location {
  _id: string;
  name: string;
  city: string;
  country: string;
  isActive: boolean;
  storeCount: number;
  createdAt: string;
}

const Locations = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState<Location[]>([
    {
      _id: "1",
      name: "New York",
      city: "New York",
      country: "USA",
      isActive: true,
      storeCount: 5,
      createdAt: "2024-01-01T00:00:00Z"
    },
    {
      _id: "2",
      name: "Los Angeles",
      city: "Los Angeles",
      country: "USA",
      isActive: true,
      storeCount: 3,
      createdAt: "2024-01-02T00:00:00Z"
    },
    {
      _id: "3",
      name: "Chicago",
      city: "Chicago",
      country: "USA",
      isActive: false,
      storeCount: 0,
      createdAt: "2024-01-03T00:00:00Z"
    }
  ]);

  const handleDelete = (locationId: string) => {
    setLocations(locations.filter(location => location._id !== locationId));
  };

  const columns = [
    { id: "name", label: "Location Name" },
    { id: "city", label: "City" },
    { id: "country", label: "Country" },
    { id: "storeCount", label: "Stores" },
    { 
      id: "isActive", 
      label: "Status", 
      render: (row: Location) => (
        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
          row.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {row.isActive ? 'Active' : 'Inactive'}
        </span>
      )
    },
    { 
      id: "createdAt", 
      label: "Created At", 
      render: (row: Location) => (
        <div className="text-gray-500">
          {new Date(row.createdAt).toLocaleDateString()}
        </div>
      )
    },
    {
      id: "actions",
      label: "Actions",
      render: (row: Location) => (
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="outline" onClick={() => navigate(`/profile/system-parameters/locations/edit/${row._id}`)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={() => handleDelete(row._id)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
    

      <Card className="border-2 border-gray-100 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-bloom-light-pink to-bloom-light-green animate-gradient-x"></div>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center text-bloom-green">
                <MapPin className="h-5 w-5 mr-2 text-bloom-pink" />
                Locations
              </CardTitle>
              <CardDescription>
                Manage store locations and regions
              </CardDescription>
            </div>
            <Button
              className="bg-bloom-green hover:bg-bloom-green/90"
              onClick={() => navigate("/profile/system-parameters/locations/add")}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Location
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <CustomTable columns={columns} data={locations} />

          {locations.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No locations available.</p>
              <Button
                className="mt-4 bg-bloom-green hover:bg-bloom-green/90"
                onClick={() => navigate("/profile/system-parameters/locations/add")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Location
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Locations; 