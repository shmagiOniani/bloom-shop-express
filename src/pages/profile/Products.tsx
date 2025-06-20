import { CustomTable } from "@/components/reusable/custom-table/CustomTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Edit, Package, Plus, Trash } from "lucide-react";
import { CardTitle } from "@/components/ui/card";
import { Product } from "@/data/products";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productService } from "@/services/products.service";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: products } = useQuery({
    queryKey: ['myProducts'],
    queryFn: () => productService.getMyProducts()
  });

  const {mutate: deleteProduct} = useMutation({
    mutationFn: (id: string) => productService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myProducts'] });
    }
  });

  const columns = [
    { id: "name", label: "Name" },
    { id: "category", label: "Category", render: (row: Product) => row.category.name },
    { id: "price", label: "Price" },
    {
      id: "actions",
      label: "Actions",
      render: (row: Product) => (
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="outline" onClick={() => navigate(`/profile/products/edit/${row._id}`)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={() => deleteProduct(row._id)}
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
          <Package className="h-5 w-5 mr-2 text-bloom-pink" />
          Product Catalog
        </CardTitle>
        <CardDescription>
          Current products in the Bloom Express catalog
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CustomTable columns={columns} data={products || []} />

        {products?.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No products available.</p>
            <Button
              className="mt-4 bg-bloom-green hover:bg-bloom-green/90"
              onClick={() => navigate("/profile/add-product")}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Product
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default Products;
