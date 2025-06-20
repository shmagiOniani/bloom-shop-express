import { StoreForm } from "@/components/StoreForm";
import { useLanguage } from "@/context/LanguageContext";
import { Store } from "../StoresPage";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { storeService } from "@/services/store.ervice";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const AddStore = () => {
  const { id } = useParams();
  console.log(id);
  const { t } = useLanguage();
  const [editingStore, setEditingStore] = useState<Store | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<Store>({
    defaultValues: {
      name: "",
      address: "",
      city: "",
      phone: "",
      hours: [],
    },
  });

  useEffect(() => {
    if (id) {
      storeService.getStoreById(id).then((res) => {
        setEditingStore(res);
        form.reset(res);
      });
    }
  }, [id]);
  const onSubmit = async (data: Store) => {
    if (editingStore) {
      storeService.updateStore(editingStore._id, data).then((res) => {
        if (id) {
          navigate(`/profile/stores`);
        }
        toast({
          title: "Store updated",
          description: `${data.name} has been updated successfully.`,
        });
      });
    } else {
      storeService
        .createStore(data)
        .then((res) => {
          if (id) {
            navigate(`/profile/stores`);
          }
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

  const handleCancel = () => {
    console.log("cancel");
  };

  return (
    <div>
      {/* <h2 className="text-2xl font-bold">Add Store</h2> */}
      {/* <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-bloom-green mb-3 relative inline-block">
            {t("store.store")}{" "}
            <span className="text-bloom-pink">{t("store.management")}</span>
            <div className="absolute w-full h-2 bg-bloom-light-pink -bottom-1 left-0 rounded-full transform -rotate-1"></div>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            {t("store.storeManagementDesc")}
          </p>
        </div> */}

      <StoreForm
        title={t("store.add")}
        description={t("store.addDesc")}
        onSubmit={onSubmit}
        editingStore={editingStore}
        form={form}
        handleCancel={handleCancel}
      />
    </div>
  );
};
export default AddStore;
