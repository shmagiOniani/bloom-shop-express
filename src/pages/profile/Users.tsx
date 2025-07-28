import { CustomTable } from "@/components/reusable/custom-table/CustomTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit, Users as UsersIcon, Plus, Trash, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userService } from "@/services/user.service";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
}

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const columns = [
    { id: "firstName", label: "First Name" },
    { id: "lastName", label: "Last Name" },
    { id: "email", label: "Email" },
    { id: "role", label: "Role" },
    { id: "isActive", label: "Active" },
    { id: "lastLogin", label: "Last Login" },
    { id: "createdAt", label: "Created At", render: (row: any) => (
      <div className="text-gray-500">
        {new Date(row.createdAt).toLocaleDateString() + " " + new Date(row.createdAt).toLocaleTimeString()}
      </div>
    )},
    { id: "actions", label: "Actions", render: (row: any) => (
      <div className="flex justify-end gap-2">
        <Button size="sm" variant="outline" onClick={() => navigate(`/profile/system-parameters/users/edit/${row._id}`)}>
          <Edit className="h-4 w-4" />
        </Button>
      </div>
    )},
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await userService.getUsers();
        setUsers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-gray-100 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-bloom-light-pink to-bloom-light-green animate-gradient-x"></div>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center text-bloom-green">
                <UsersIcon className="h-5 w-5 mr-2 text-bloom-pink" />
                User Management
              </CardTitle>
              <CardDescription>
                Manage system users and permissions
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CustomTable columns={columns} data={users} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Users; 
                    