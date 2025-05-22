import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { toast, useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { Store, storeData } from "./StoresPage";
import { Edit, MapPin, Plus, Trash, ChevronRight, Home } from "lucide-react";
import { StoreForm } from "@/components/StoreForm";
import { storeService } from "@/services/store.ervice";
import { CustomTable } from "@/components/reusable/custom-table/CustomTable";
import { useLanguage } from "@/context/LanguageContext";
interface StoreApplication {
  _id: string;
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  businessEmail: string;
  taxId: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  userId: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

const StoreManagementPage = () => {
  const { t } = useLanguage();
  const [stores, setStores] = useState<Store[]>(storeData);
  const [applications, setApplications] = useState<StoreApplication[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingStore, setEditingStore] = useState<Store | null>(null);
  const { toast } = useToast();
  const { user, hasRole } = useAuth();
  const navigate = useNavigate();

  // Create form
  const form = useForm<Store>({
    defaultValues: {
      name: "",
      address: "",
      city: "",
      phone: "",
      hours: [],
    },
  });

  // Update form when editing store changes
  useEffect(() => {
    if (editingStore) {
      Object.entries(editingStore).forEach(([key, value]) => {
        form.setValue(key as keyof Store, value);
      });
    } else {
      form.reset({
        name: "",
        address: "",
        city: "",
        phone: "",
        hours: [],
      });
    }
  }, [editingStore, form, stores]);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    const response = await storeService.getMyStores();
    setStores(response);
  };

  const onSubmit = async (data: Store) => {
 
    if (editingStore) {
      storeService.updateStore(editingStore._id, data).then((res) => {
        fetchStores();
        toast({
          title: "Store updated",
          description: `${data.name} has been updated successfully.`,
        });
      });
    } else {
      storeService.createStore(data).then((res) => {
        fetchStores();
        toast({
          title: "Store added",
          description: `${data?.name} has been added successfully.`,
        });
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.response.data.message,
        });
      });
    }

    setEditingStore(null);
    form.reset();
  };

  const handleEdit = (store: Store) => {
    setEditingStore(store);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (storeId: string) => {
    setStores(stores.filter((store) => store._id !== storeId));
    if (editingStore?._id === storeId) {
      setEditingStore(null);
      form.reset();
    }

    toast({
      title: "Store deleted",
      description: "The store has been removed from the system.",
    });
  };

  const handleCancel = () => {
    setEditingStore(null);
    form.reset();
  };

  if (!hasRole(["manager", "admin"])) {
    return (
      <div className="bloom-container py-12 text-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-bloom-pink">{t("store.accessDenied")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{t("store.accessDeniedDesc")}</p>
            <p className="mt-2">
              {t("store.accessDeniedContact")}
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => navigate("/")}
              className="bg-bloom-green hover:bg-bloom-green/90"
            >
              {t("store.returnToHome")}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const columns = [
    { id: "name", label: "Name" },
    { id: "city", label: "City" },
    { id: "address", label: "Address" },
    { id: "phone", label: "Phone" },
    { id: "createdAt", label: "Created At" , render: (row: any) => (
      <div className="text-gray-500">
        {new Date(row.createdAt).toLocaleDateString() + " " + new Date(row.createdAt).toLocaleTimeString()}
      </div>
    )},
    {
      id: "actions",
      label: "Actions",
      render: (row: any) => (
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="outline" onClick={() => handleEdit(row)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-bloom-light-green hover:bg-bloom-green hover:text-white"
            onClick={() => navigate(`/product-management/${row._id}`)}
          >
            <Plus className="h-4 w-4" />
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
    <div className="py-8 md:py-12">
      <div className="bloom-container">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-bloom-pink flex items-center">
            <Home className="h-4 w-4" />
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-bloom-pink"> {t("store.title")}</span>
        </nav>

        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-bloom-green mb-3 relative inline-block">
            {t("store.store")} <span className="text-bloom-pink">{t("store.management")}</span>
            <div className="absolute w-full h-2 bg-bloom-light-pink -bottom-1 left-0 rounded-full transform -rotate-1"></div>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            {t("store.storeManagementDesc")} 
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <StoreForm
            title={t("store.add")}
            description={t("store.addDesc")}
            onSubmit={onSubmit}
            editingStore={editingStore}
            form={form}
            handleCancel={handleCancel}
          />
        </div>

        <Card className="border-2 border-gray-100 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-bloom-light-pink to-bloom-light-green animate-gradient-x"></div>
          <CardHeader>
            <CardTitle className="flex items-center text-bloom-green">
              <MapPin className="h-5 w-5 mr-2 text-bloom-pink" />
              {t("store.listings")}
            </CardTitle>
            <CardDescription>
                {t("store.listingsDesc")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stores.map((store) => (
                      <TableRow key={store._id}>
                        <TableCell className="font-medium">{store.name}</TableCell>
                        <TableCell>{store.city}</TableCell>
                        <TableCell>{store.phone}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEdit(store)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="bg-bloom-light-green hover:bg-bloom-green hover:text-white"
                              onClick={() => navigate(`/product-management`)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDelete(store._id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table> */}
            <CustomTable columns={columns} data={stores} />

            {stores.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No stores available.</p>
                <Button
                  className="mt-4 bg-bloom-green hover:bg-bloom-green/90"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Store
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StoreManagementPage;
