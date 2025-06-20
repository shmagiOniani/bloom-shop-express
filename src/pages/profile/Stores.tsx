import { CustomTable } from "@/components/reusable/custom-table/CustomTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { Edit, Plus , Trash, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { Store, storeData } from "../StoresPage";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { storeService } from "@/services/store.ervice";

const Stores = () => {
  const [stores, setStores] = useState<Store[]>(storeData);

  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleDelete = (storeId: string) => {
  

    toast({
      title: "Store deleted",
      description: "The store has been removed from the system.",
    });
  };

  const fetchStores = async () => {
    const response = await storeService.getMyStores();
    setStores(response);
  };
  
  useEffect(() => {
    fetchStores();
  }, []);

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
          <Button size="sm" variant="outline" onClick={() => navigate(`/profile/stores/edit/${row._id}`)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-bloom-light-green hover:bg-bloom-green hover:text-white"
            onClick={() => navigate(`/profile/add-product`, {state: {store: row}})}
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
    )
};
export default Stores; 