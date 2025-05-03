import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Search, Eye, Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

// Sample orders data
const sampleOrders = [
  {
    id: '12345',
    customer: 'Alice Brown',
    email: 'alice@gmail.com',
    date: '2025-04-28',
    total: 18.45,
    status: 'delivered',
    items: [
      { name: 'Organic Milk', quantity: 2, price: 3.99 },
      { name: 'Fresh Apples', quantity: 5, price: 1.49 },
      { name: 'Whole Wheat Bread', quantity: 1, price: 2.50 },
    ],
  },
  {
    id: '12346',
    customer: 'Bob Johnson',
    email: 'bob@yahoo.com',
    date: '2025-05-01',
    total: 22.30,
    status: 'shipped',
    items: [
      { name: 'Orange Juice', quantity: 2, price: 4.99 },
      { name: 'Chicken Breast', quantity: 1, price: 8.99 },
      { name: 'Mixed Vegetables', quantity: 1, price: 3.99 },
    ],
  },
  {
    id: '12347',
    customer: 'John Smith',
    email: 'john@gmail.com',
    date: '2025-05-02',
    total: 8.75,
    status: 'pending',
    items: [
      { name: 'Bananas', quantity: 6, price: 0.79 },
      { name: 'Cereal', quantity: 1, price: 4.99 },
    ],
  },
  {
    id: '12348',
    customer: 'Sarah Davis',
    email: 'sarah@outlook.com',
    date: '2025-05-02',
    total: 35.60,
    status: 'pending',
    items: [
      { name: 'Pasta', quantity: 2, price: 1.99 },
      { name: 'Tomato Sauce', quantity: 2, price: 2.49 },
      { name: 'Ground Beef', quantity: 1, price: 7.99 },
      { name: 'Cheese', quantity: 1, price: 4.99 },
      { name: 'Garlic Bread', quantity: 1, price: 3.99 },
      { name: 'Ice Cream', quantity: 1, price: 5.99 },
    ],
  },
  {
    id: '12349',
    customer: 'Michael Wilson',
    email: 'michael@gmail.com',
    date: '2025-04-29',
    total: 12.99,
    status: 'delivered',
    items: [
      { name: 'Pizza', quantity: 1, price: 8.99 },
      { name: 'Soda', quantity: 2, price: 1.99 },
    ],
  },
  {
    id: '12350',
    customer: 'Emma Clark',
    email: 'emma@yahoo.com',
    date: '2025-04-30',
    total: 27.85,
    status: 'cancelled',
    items: [
      { name: 'Avocados', quantity: 3, price: 1.99 },
      { name: 'Lettuce', quantity: 1, price: 2.49 },
      { name: 'Tomatoes', quantity: 2, price: 0.99 },
      { name: 'Salmon', quantity: 1, price: 14.99 },
      { name: 'Lemon', quantity: 2, price: 0.79 },
    ],
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'delivered':
      return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" /> Delivered</Badge>;
    case 'shipped':
      return <Badge className="bg-blue-500"><Truck className="w-3 h-3 mr-1" /> Shipped</Badge>;
    case 'pending':
      return <Badge className="bg-yellow-500"><Package className="w-3 h-3 mr-1" /> Processing</Badge>;
    case 'cancelled':
      return <Badge className="bg-red-500"><XCircle className="w-3 h-3 mr-1" /> Cancelled</Badge>;
    default:
      return <Badge className="bg-gray-500"><Clock className="w-3 h-3 mr-1" /> {status}</Badge>;
  }
};

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState(sampleOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const [orderStatusDialog, setOrderStatusDialog] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const viewOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setOrderDetailsOpen(true);
  };
  
  const openStatusChangeDialog = (order: any) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setOrderStatusDialog(true);
  };
  
  const changeOrderStatus = () => {
    if (selectedOrder) {
      const updatedOrders = orders.map(order => {
        if (order.id === selectedOrder.id) {
          return { ...order, status: newStatus };
        }
        return order;
      });
      
      setOrders(updatedOrders);
      setSelectedOrder({ ...selectedOrder, status: newStatus });
      setOrderStatusDialog(false);
      toast.success(`Order #${selectedOrder.id} status updated to ${newStatus}`);
    }
  };
  
  // Filter orders based on search query and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter ? order.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>
      
      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by order ID, customer name or email..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-8"
            />
          </div>
          <div className="w-full sm:w-56">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      {/* Orders Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Orders List</CardTitle>
          <CardDescription>
            Showing {filteredOrders.length} of {orders.length} orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">Loading orders...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No orders found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <div>{order.customer}</div>
                            <div className="text-sm text-gray-500">{order.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="cursor-pointer" onClick={() => openStatusChangeDialog(order)}>
                            {getStatusBadge(order.status)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => viewOrderDetails(order)}
                          >
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
          
          {/* Order Details Dialog */}
          {selectedOrder && (
            <Dialog open={orderDetailsOpen} onOpenChange={setOrderDetailsOpen}>
              <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Order #{selectedOrder.id}</DialogTitle>
                  <DialogDescription>
                    Placed on {new Date(selectedOrder.date).toLocaleDateString()}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6">
                  {/* Customer & Status */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2">Customer</h3>
                      <p>{selectedOrder.customer}</p>
                      <p className="text-sm text-gray-500">{selectedOrder.email}</p>
                    </div>
                    <div className="text-right">
                      <h3 className="font-semibold mb-2">Status</h3>
                      <div 
                        className="inline-block cursor-pointer" 
                        onClick={() => {
                          setOrderDetailsOpen(false);
                          openStatusChangeDialog(selectedOrder);
                        }}
                      >
                        {getStatusBadge(selectedOrder.status)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Items */}
                  <div>
                    <h3 className="font-semibold mb-2">Order Items</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead className="text-right">Subtotal</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedOrder.items.map((item: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>${item.price.toFixed(2)}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell className="text-right">
                              ${(item.price * item.quantity).toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell colSpan={3} className="text-right font-semibold">
                            Total
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            ${selectedOrder.total.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
          
          {/* Change Status Dialog */}
          {selectedOrder && (
            <Dialog open={orderStatusDialog} onOpenChange={setOrderStatusDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Order Status</DialogTitle>
                  <DialogDescription>
                    Change the status for order #{selectedOrder.id}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Select value={newStatus} onValueChange={setNewStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setOrderStatusDialog(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-grocery-primary hover:bg-grocery-primary/90" onClick={changeOrderStatus}>
                      Update Status
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOrdersPage;
