
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell,
  Legend
} from 'recharts';
import { BarChart4, PieChart as PieChartIcon } from "lucide-react";

// Mock sales data
const salesData = [
  { id: 1, date: '2025-04-01', customer: 'Jane Smith', product: 'Spring Bouquet', amount: 49.99, status: 'completed' },
  { id: 2, date: '2025-04-02', customer: 'John Doe', product: 'Rose Arrangement', amount: 79.99, status: 'completed' },
  { id: 3, date: '2025-04-03', customer: 'Alice Johnson', product: 'Tulip Basket', amount: 59.99, status: 'processing' },
  { id: 4, date: '2025-04-04', customer: 'Bob Williams', product: 'Lily Bouquet', amount: 69.99, status: 'completed' },
  { id: 5, date: '2025-04-05', customer: 'Sarah Davis', product: 'Mixed Flowers', amount: 89.99, status: 'completed' },
  { id: 6, date: '2025-04-06', customer: 'Michael Miller', product: 'Orchid Arrangement', amount: 109.99, status: 'cancelled' },
  { id: 7, date: '2025-04-07', customer: 'Emma Wilson', product: 'Sunflower Bouquet', amount: 54.99, status: 'processing' },
];

// Mock chart data
const monthlySalesData = [
  { month: 'Jan', sales: 2400 },
  { month: 'Feb', sales: 1398 },
  { month: 'Mar', sales: 9800 },
  { month: 'Apr', sales: 3908 },
  { month: 'May', sales: 4800 },
  { month: 'Jun', sales: 3800 },
];

const productCategoryData = [
  { name: 'Bouquets', value: 400 },
  { name: 'Singles', value: 300 },
  { name: 'Arrangements', value: 500 },
];

const COLORS = ['#FF8042', '#F8BBC', '#00C49F', '#FFBB28'];

const AdminPanelPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter sales data based on search and status
  const filteredSales = salesData.filter(sale => {
    const matchesSearch = 
      sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
      sale.product.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || sale.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate total sales
  const totalSales = salesData.reduce((sum, sale) => sum + sale.amount, 0).toFixed(2);
  const completedSales = salesData.filter(sale => sale.status === 'completed').length;
  const processingOrders = salesData.filter(sale => sale.status === 'processing').length;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-bloom-pink">Admin Panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSales}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedSales}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Processing Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{processingOrders}</div>
            <p className="text-xs text-muted-foreground">-4% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sales" className="mb-8">
        <TabsList>
          <TabsTrigger value="sales" className="flex gap-2 items-center">
            <BarChart4 className="h-4 w-4" />
            Sales
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex gap-2 items-center">
            <PieChartIcon className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sales" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales History</CardTitle>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search customer or product..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-full md:w-48">
                  <Select 
                    value={statusFilter} 
                    onValueChange={setStatusFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSales.length > 0 ? (
                      filteredSales.map((sale) => (
                        <TableRow key={sale.id}>
                          <TableCell>{sale.date}</TableCell>
                          <TableCell>{sale.customer}</TableCell>
                          <TableCell>{sale.product}</TableCell>
                          <TableCell>${sale.amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                              sale.status === 'completed' ? 'bg-green-100 text-green-800' : 
                              sale.status === 'processing' ? 'bg-blue-100 text-blue-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {sale.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4">No sales found</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Sales</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlySalesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#F8BBC" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Product Categories</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={productCategoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {productCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanelPage;
