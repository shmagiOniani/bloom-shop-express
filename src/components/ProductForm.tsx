import { Package } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Form } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Image } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { uploadService } from "@/services/upload.service";
import { useEffect, useState } from "react";
import ImageUploader from "./ImageUploader";
import { useLanguage } from "@/context/LanguageContext";
import { productCategoriesService } from "@/services/product-categoies.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { storeService } from "@/services/store.ervice";
import { productService } from "@/services/products.service";
import { toast } from "sonner";
import { IProduct } from "@/models/Product.model";

export const ProductForm = ({
  editingProduct,
  form,
}: // stores,
{
  editingProduct: any;
  form: any;
  // stores: any;
}) => {
  const { t } = useLanguage();



  const uploadImage = (file: File) => {
    return uploadService
      .uploadImage(file)
      .then((response) => {
        form.setValue("image", response);
        return response;
      })
      .catch((error) => console.error("Error uploading image:", error));
  };

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => productCategoriesService.getCategories(),
  });

  const { data: stores } = useQuery({
    queryKey: ["stores"],
    queryFn: () => storeService.getMyStores(),
  });

  const { mutate: createProduct, isPending: isCreating } = useMutation({
    mutationFn: (data: IProduct) => productService.create(data),
    onSuccess: () => form.reset(),
  });

  const { mutate: updateProduct, isPending: isUpdating } = useMutation({
    mutationFn: (data: IProduct) =>
      productService.update(editingProduct._id, data),
    onSuccess: () => form.reset(),
  });

  const onSubmit = (data: IProduct) => {
    console.log(data);
    if (editingProduct) {
      updateProduct(data);
    } else {
      createProduct(data);
    }
  };

  return (
    <Card className="lg:col-span-3 border-2 border-gray-100 overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-bloom-light-pink to-bloom-light-green animate-gradient-x"></div>
      <CardHeader>
        <CardTitle className="flex items-center text-bloom-green">
          <Package className="h-5 w-5 mr-2 text-bloom-pink" />
          {editingProduct
            ? `${t("product.editProduct")}: ${editingProduct.name}`
            : t("product.addNewProduct")}
        </CardTitle>
        <CardDescription>
          {editingProduct
            ? t("product.updateProduct")
            : t("product.addNewProductDesc")}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#9ca3af]">
                      {t("product.name")}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Sunrise Bouquet" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#9ca3af]" onClick={() => console.log(categories)}>
                      {t("product.category")}
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.map((category: any) => (
                          <SelectItem key={category._id} value={category._id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="storeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#9ca3af]">
                      {t("product.store")}
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a store" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {stores?.map((store) => (
                          <SelectItem key={store._id} value={store._id}>
                            {store.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#9ca3af]">
                      {t("product.price")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="29.99"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#9ca3af]">
                        {t("product.images")}
                      </FormLabel>
                      <FormControl>
                        <ImageUploader
                          value={field.value || []}
                          onChange={field.onChange}
                          maxImages={3}
                          uploadImage={uploadImage}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel className="text-[#9ca3af]">
                      {t("product.description")}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A beautiful arrangement of seasonal flowers..."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-3">
              {/* <Button type="button" variant="outline" onClick={handleCancel}>
                {t("product.cancel")}
              </Button> */}
              <Button
                type="submit"
                className="bg-bloom-green hover:bg-bloom-green/90"
              >
                {editingProduct
                  ? t("product.updateProduct")
                  : t("product.addProduct")}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
