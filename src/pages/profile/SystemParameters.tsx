import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Tag, Users, MapPin, Settings, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SystemParameters = () => {
    const navigate = useNavigate();

    const systemParams = [
        {
            id: "categories",
            title: "Product Categories",
            description: "Manage product categories and subcategories",
            icon: Tag,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            route: "/profile/system-parameters/categories"
        },
        {
            id: "users",
            title: "User Management",
            description: "Manage system users and permissions",
            icon: Users,
            color: "text-green-600",
            bgColor: "bg-green-50",
            route: "/profile/system-parameters/users"
        },
        {
            id: "locations",
            title: "Locations",
            description: "Manage store locations and regions",
            icon: MapPin,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
            route: "/profile/system-parameters/locations"
        },
        {
            id: "settings",
            title: "System Settings",
            description: "Configure system-wide settings and preferences",
            icon: Settings,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
            route: "/profile/system-parameters/settings"
        },
        {
            id: "data",
            title: "Data Management",
            description: "Manage system data and backups",
            icon: Database,
            color: "text-red-600",
            bgColor: "bg-red-50",
            route: "/profile/system-parameters/data"
        }
    ];

    return (
        <div className="space-y-6">
            <Card className="lg:col-span-3 border-2 border-gray-100 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-bloom-light-pink to-bloom-light-green animate-gradient-x"></div>
                <CardHeader>
                    <CardTitle className="flex items-center text-bloom-green">
                        <Package className="h-5 w-5 mr-2 text-bloom-pink" />
                        System Parameters
                    </CardTitle>
                    <CardDescription>
                        Manage system libraries and configuration parameters
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {systemParams.map((param) => {
                            const IconComponent = param.icon;
                            return (
                                <Card
                                    key={param.id}
                                    className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-bloom-light-green"
                                    onClick={() => navigate(param.route)}
                                >
                                    <CardContent className="p-6">
                                        <div className="flex items-center space-x-4">
                                            <div className={`p-3 rounded-lg ${param.bgColor}`}>
                                                <IconComponent className={`h-6 w-6 ${param.color}`} />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900">{param.title}</h3>
                                                <p className="text-sm text-gray-600 mt-1">{param.description}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SystemParameters; 