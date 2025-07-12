import { ProductForm } from "@/components/ProductForm";
import { IProduct } from "@/models/Product.model";
import { productService } from "@/services/products.service";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";

const AddProduct = () => {
  const { id } = useParams();
  
  const { data: product } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getById(id),
    enabled: !!id,
  });

  const form = useForm<IProduct>({
    defaultValues: {
      storeId: product?.storeId || "",
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      image: product?.image || "",
      category: product?.category || "",
    },
  });

  if (id && product?.storeId) {
    form.setValue("storeId", product?.storeId);
    form.setValue("name", product?.name);
    form.setValue("description", product?.description);
    form.setValue("price", product?.price);
    form.setValue("image", product?.image);
    form.setValue("category", product?.category);
    
  }
  return (
    <div>
      <ProductForm
        editingProduct={product}
        form={form}
        // stores={stores}
      />
    </div>
  );
};
export default AddProduct;
