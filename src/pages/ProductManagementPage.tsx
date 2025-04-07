
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { useAuth } from '@/context/AuthContext';
import { Product, productData } from '../data/products';
import { Package, Edit, Plus, Trash, Image } from "lucide-react";

const ProductManagementPage = () => {
  const [products, setProducts] = useState<Product[]>(productData);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();
  const { hasRole } = useAuth();
  const navigate = useNavigate();
  
  // Create form
  const form = useForm<Product>({
    defaultValues: {
      id: 0,
      name: "",
      description: "",
      price: 0,
      image: "",
      category: "",
    }
  });
  
  // Update form when editing product changes
  useEffect(() => {
    if (editingProduct) {
      Object.entries(editingProduct).forEach(([key, value]) => {
        form.setValue(key as keyof Product, value);
      });
    } else {
      form.reset({
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name: "",
        description: "",
        price: 0,
        image: "https://images.unsplash.com/photo-1533616688419-b7a585564566",
        category: "",
      });
    }
  }, [editingProduct, form, products]);

  const onSubmit = (data: Product) => {
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(product => 
        product.id === editingProduct.id ? data : product
      ));
      toast({
        title: "Product updated",
        description: `${data.name} has been updated successfully.`,
      });
    } else {
      // Add new product
      setProducts([...products, data]);
      toast({
        title: "Product added",
        description: `${data.name} has been added successfully.`,
      });
    }
    
    setEditingProduct(null);
    form.reset();
  };
  
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleDelete = (productId: number) => {
    setProducts(products.filter(product => product.id !== productId));
    if (editingProduct?.id === productId) {
      setEditingProduct(null);
      form.reset();
    }
    
    toast({
      title: "Product deleted",
      description: "The product has been removed from the catalog.",
    });
  };
  
  const handleCancel = () => {
    setEditingProduct(null);
    form.reset();
  };

  const categories = [
    "Bouquets",
    "Plants",
    "Vases",
    "Gifts",
    "Arrangements",
    "Seasonal"
  ];

  if (!hasRole(['manager', 'admin'])) {
    return (
      <div className="bloom-container py-12 text-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-bloom-pink">Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You don't have permission to manage products.</p>
            <p className="mt-2">Please contact an administrator if you believe this is an error.</p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => navigate("/")}
              className="bg-bloom-green hover:bg-bloom-green/90"
            >
              Return to Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-12">
      <div className="bloom-container">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-bloom-green mb-3 relative inline-block">
            Product <span className="text-bloom-pink">Management</span>
            <div className="absolute w-full h-2 bg-bloom-light-pink -bottom-1 left-0 rounded-full transform -rotate-1"></div>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            Add, edit, or delete products from the Bloom Express catalog.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="lg:col-span-3 border-2 border-gray-100">
            <div className="h-2 bg-gradient-to-r from-bloom-light-pink to-bloom-light-green"></div>
            <CardHeader>
              <CardTitle className="flex items-center text-bloom-green">
                <Package className="h-5 w-5 mr-2 text-bloom-pink" />
                {editingProduct ? `Edit Product: ${editingProduct.name}` : "Add New Product"}
              </CardTitle>
              <CardDescription>
                {editingProduct 
                  ? "Update the product information below."
                  : "Fill in the details to add a new product to the catalog."
                }
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
                            defaultValue={field.value}
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
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price ($)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="29.99" 
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
                          <FormLabel>Image URL</FormLabel>
                          <FormControl>
                            <div className="flex space-x-2">
                              <Input placeholder="https://example.com/image.jpg" {...field} />
                              <Button
                                type="button"
                                size="icon"
                                variant="outline"
                                className="flex-shrink-0"
                              >
                                <Image className="h-4 w-4" />
                              </Button>
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
          </Card>
        </div>
        
        <Card className="border-2 border-gray-100">
          <div className="h-2 bg-gradient-to-r from-bloom-light-pink to-bloom-light-green"></div>
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-md" 
                      />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEdit(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {products.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No products available.</p>
                <Button 
                  className="mt-4 bg-bloom-green hover:bg-bloom-green/90"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Product
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductManagementPage;
