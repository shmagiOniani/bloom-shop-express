
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
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { useAuth } from '@/context/AuthContext';
import { Store, storeData } from './StoresPage';
import { Building2, Edit, MapPin, Phone, Plus, Trash } from "lucide-react";

const StoreManagementPage = () => {
  const [stores, setStores] = useState<Store[]>(storeData);
  const [editingStore, setEditingStore] = useState<Store | null>(null);
  const { toast } = useToast();
  const { user, hasRole } = useAuth();
  const navigate = useNavigate();
  
  // Create form
  const form = useForm<Store>({
    defaultValues: {
      id: 0,
      name: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      hours: "",
      specialty: "",
    }
  });
  
  // Update form when editing store changes
  useEffect(() => {
    if (editingStore) {
      Object.entries(editingStore).forEach(([key, value]) => {
        form.setValue(key as keyof Store, value);
      });
    } else {
      form.reset({
        id: stores.length > 0 ? Math.max(...stores.map(s => s.id)) + 1 : 1,
        name: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        phone: "",
        hours: "",
        specialty: "",
      });
    }
  }, [editingStore, form, stores]);

  const onSubmit = (data: Store) => {
    if (editingStore) {
      // Update existing store
      setStores(stores.map(store => 
        store.id === editingStore.id ? data : store
      ));
      toast({
        title: "Store updated",
        description: `${data.name} has been updated successfully.`,
      });
    } else {
      // Add new store
      setStores([...stores, data]);
      toast({
        title: "Store added",
        description: `${data.name} has been added successfully.`,
      });
    }
    
    setEditingStore(null);
    form.reset();
  };
  
  const handleEdit = (store: Store) => {
    setEditingStore(store);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleDelete = (storeId: number) => {
    setStores(stores.filter(store => store.id !== storeId));
    if (editingStore?.id === storeId) {
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

  if (!hasRole(['manager', 'admin'])) {
    return (
      <div className="bloom-container py-12 text-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-bloom-pink">Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You don't have permission to manage stores.</p>
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
            Store <span className="text-bloom-pink">Management</span>
            <div className="absolute w-full h-2 bg-bloom-light-pink -bottom-1 left-0 rounded-full transform -rotate-1"></div>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            Add, edit, or delete stores from the Bloom Express network.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="lg:col-span-3 border-2 border-gray-100">
            <div className="h-2 bg-gradient-to-r from-bloom-light-pink to-bloom-light-green"></div>
            <CardHeader>
              <CardTitle className="flex items-center text-bloom-green">
                <Building2 className="h-5 w-5 mr-2 text-bloom-pink" />
                {editingStore ? `Edit Store: ${editingStore.name}` : "Add New Store"}
              </CardTitle>
              <CardDescription>
                {editingStore 
                  ? "Update the store information below."
                  : "Fill in the details to add a new store to the network."
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
                          <FormLabel>Store Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Bloom Express Downtown" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="specialty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specialty</FormLabel>
                          <FormControl>
                            <Input placeholder="Fresh Bouquets" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main Street" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="Seattle" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="WA" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Zip Code</FormLabel>
                            <FormControl>
                              <Input placeholder="98101" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="(206) 555-1234" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="hours"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Hours</FormLabel>
                          <FormControl>
                            <Input placeholder="Mon-Sat: 9am-7pm, Sun: 10am-5pm" {...field} />
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
                      {editingStore ? "Update Store" : "Add Store"}
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
              <MapPin className="h-5 w-5 mr-2 text-bloom-pink" />
              Store Listings
            </CardTitle>
            <CardDescription>
              Current stores in the Bloom Express network
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stores.map((store) => (
                  <TableRow key={store.id}>
                    <TableCell className="font-medium">{store.name}</TableCell>
                    <TableCell>{store.city}, {store.state}</TableCell>
                    <TableCell>{store.phone}</TableCell>
                    <TableCell>{store.specialty}</TableCell>
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
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDelete(store.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {stores.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No stores available.</p>
                <Button 
                  className="mt-4 bg-bloom-green hover:bg-bloom-green/90"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
