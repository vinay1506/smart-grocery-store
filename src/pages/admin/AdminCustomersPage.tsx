
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Search, Eye, Mail, Phone, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Sample customers data
const sampleCustomers = [
  {
    id: 1,
    name: 'Alice Brown',
    email: 'alice@gmail.com',
    phone: '9876543210',
    address: '123 Main St, New York, NY 10001',
    joinedDate: '2024-12-15',
    orderCount: 8,
    totalSpent: 156.45,
  },
  {
    id: 2,
    name: 'Bob Johnson',
    email: 'bob@yahoo.com',
    phone: '8765432109',
    address: '456 Oak Ave, San Francisco, CA 94102',
    joinedDate: '2025-01-20',
    orderCount: 5,
    totalSpent: 87.30,
  },
  {
    id: 3,
    name: 'Charlie Wilson',
    email: 'charlie@gmail.com',
    phone: '7654321098',
    address: '789 Elm St, Chicago, IL 60601',
    joinedDate: '2025-02-10',
    orderCount: 3,
    totalSpent: 45.75,
  },
  {
    id: 4,
    name: 'Diana Clark',
    email: 'diana@outlook.com',
    phone: '6543210987',
    address: '101 Pine St, Seattle, WA 98101',
    joinedDate: '2025-03-05',
    orderCount: 12,
    totalSpent: 232.60,
  },
  {
    id: 5,
    name: 'Edward Smith',
    email: 'edward@gmail.com',
    phone: '5432109876',
    address: '202 Maple Ave, Boston, MA 02108',
    joinedDate: '2025-01-15',
    orderCount: 7,
    totalSpent: 124.99,
  },
  {
    id: 6,
    name: 'Frances Davis',
    email: 'frances@yahoo.com',
    phone: '4321098765',
    address: '303 Cedar Blvd, Austin, TX 78701',
    joinedDate: '2025-04-01',
    orderCount: 2,
    totalSpent: 34.50,
  },
  {
    id: 7,
    name: 'George Taylor',
    email: 'george@outlook.com',
    phone: '3210987654',
    address: '404 Birch Ln, Denver, CO 80201',
    joinedDate: '2025-02-28',
    orderCount: 6,
    totalSpent: 98.75,
  },
];

// Sample order data for customer detail view
const sampleCustomerOrders = [
  {
    id: '12345',
    date: '2025-04-28',
    total: 18.45,
    status: 'delivered',
    items: 3,
  },
  {
    id: '12346',
    date: '2025-05-01',
    total: 22.30,
    status: 'shipped',
    items: 3,
  },
  {
    id: '12347',
    date: '2025-05-02',
    total: 8.75,
    status: 'pending',
    items: 2,
  },
];

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

const AdminCustomersPage = () => {
  const [customers, setCustomers] = useState(sampleCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
  const [customerDetailsOpen, setCustomerDetailsOpen] = useState(false);
  
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
  
  const viewCustomerDetails = (customer: any) => {
    setSelectedCustomer(customer);
    setCustomerDetailsOpen(true);
  };
  
  // Filter customers based on search query
  const filteredCustomers = customers.filter(customer => {
    return (
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
    );
  });
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customers</h1>
      </div>
      
      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-8"
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Customers Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Customers List</CardTitle>
          <CardDescription>
            Showing {filteredCustomers.length} of {customers.length} customers
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">Loading customers...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Spent</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No customers found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                            </Avatar>
                            <span>{customer.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center text-sm">
                              <Mail className="h-3 w-3 mr-1" />
                              <span>{customer.email}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Phone className="h-3 w-3 mr-1" />
                              <span>{customer.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{new Date(customer.joinedDate).toLocaleDateString()}</TableCell>
                        <TableCell>{customer.orderCount}</TableCell>
                        <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => viewCustomerDetails(customer)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="ghost">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  Delete Customer
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
          
          {/* Customer Details Dialog */}
          {selectedCustomer && (
            <Dialog open={customerDetailsOpen} onOpenChange={setCustomerDetailsOpen}>
              <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Customer Details</DialogTitle>
                  <DialogDescription>
                    View detailed information about this customer
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6">
                  {/* Customer Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="sm:col-span-1 flex flex-col items-center sm:border-r sm:pr-4">
                      <Avatar className="h-20 w-20 mb-2">
                        <AvatarFallback className="text-2xl">
                          {getInitials(selectedCustomer.name)}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-center">{selectedCustomer.name}</h3>
                      <p className="text-sm text-gray-500 text-center">
                        Customer since {new Date(selectedCustomer.joinedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="sm:col-span-3 space-y-4">
                      <div>
                        <h3 className="font-semibold mb-1">Contact Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p>{selectedCustomer.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p>{selectedCustomer.phone}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Address</h3>
                        <p>{selectedCustomer.address}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50 p-4 rounded-md">
                          <div className="text-sm text-gray-600">Total Orders</div>
                          <div className="text-2xl font-bold">{selectedCustomer.orderCount}</div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-md">
                          <div className="text-sm text-gray-600">Total Spent</div>
                          <div className="text-2xl font-bold">${selectedCustomer.totalSpent.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Recent Orders */}
                  <div>
                    <h3 className="font-semibold mb-2">Recent Orders</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sampleCustomerOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                            <TableCell>{order.items}</TableCell>
                            <TableCell>
                              <span className={`capitalize px-2 py-1 rounded-full text-xs ${
                                order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                                order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {order.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              ${order.total.toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
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

export default AdminCustomersPage;
