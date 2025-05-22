import { Package } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Form } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Image } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "./ui/form";
import { productService } from "../services/products.service";
import { uploadService } from "@/services/upload.service";
import { UseFormReturn } from "react-hook-form";
import { Store } from "@/pages/StoresPage";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  storeId: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "bouquets" | "singles" | "arrangements";
  featured: boolean;
}

interface ProductFormProps {
  onSubmit: (data: Product) => void;
  editingProduct: Product | null;
  form: UseFormReturn<Product>;
  handleCancel: () => void;
  stores: Store[];
  title?: string;
  description?: string;
}

export const ProductForm = ({selectedStore, editingProduct, form, onSubmit, handleCancel, categories, stores}: {selectedStore: string, editingProduct: any, form: any, onSubmit: any, handleCancel: any, categories: any, stores: any}) => {
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    if (editingProduct?.image) {
      setImagePreview(editingProduct.image);
    }
  }, [editingProduct]);

  const uploadImage = (file: File) => {
    return uploadService.uploadImage(file)
      .then((response) => {
        form.setValue("image", response);
        setImagePreview(response);
        return response;
      })
      .catch((error) => console.error("Error uploading image:", error));
  }

  return  <Card className="lg:col-span-3 border-2 border-gray-100 overflow-hidden">
    <div className="h-2 bg-gradient-to-r from-bloom-light-pink to-bloom-light-green animate-gradient-x"></div>
    <CardHeader>
      <CardTitle className="flex items-center text-bloom-green">
        <Package className="h-5 w-5 mr-2 text-bloom-pink" />
        {editingProduct
          ? `Edit Product: ${editingProduct.name}`
          : "Add New Product"}
      </CardTitle>
      <CardDescription>
        {editingProduct
          ? "Update the product information below."
          : "Fill in the details to add a new product to the catalog."}
      </CardDescription>
    </CardHeader>

    {/* <div onClick={() => console.log(form.getValues())}>check</div> */}
    <CardContent>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
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
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
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
                  <FormLabel>Store</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a store" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {stores.map((store) => (
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
                  <FormLabel>Price ($)</FormLabel>
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

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Image</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <div className="flex space-x-2">
                        <Input
                          placeholder="https://example.com/image.jpg"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            setImagePreview(e.target.value);
                          }}
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="outline"
                          className="flex-shrink-0 hover:bg-bloom-light-pink/10"
                          onClick={() => {
                            const input = document.createElement("input");
                            input.type = "file";
                            input.accept = "image/*";
                            input.onchange = () => {
                              const file = input.files?.[0];
                              if (file) {
                                uploadImage(file);
                              }
                            };
                            input.click();
                          }}
                        >
                          <Image className="h-4 w-4 text-bloom-pink" />
                        </Button>
                      </div>
                      <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-dashed border-gray-200 bg-gray-50 transition-all duration-200 hover:border-bloom-light-pink group">
                        {imagePreview ? (
                          <>
                            <img
                              src={imagePreview}
                              alt="Product preview"
                              className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-105"
                              onError={() => setImagePreview("")}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-200" />
                          </>
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                            <Image className="h-12 w-12 mb-2 opacity-50" />
                            <p className="text-sm">Click the upload button or paste an image URL</p>
                            <p className="text-xs mt-1">Recommended size: 800x800px</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Description</FormLabel>
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
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-bloom-green hover:bg-bloom-green/90"
            >
              {editingProduct ? "Update Product" : "Add Product"}
            </Button>
          </div>
        </form>
      </Form>
    </CardContent>
  </Card>;
};
