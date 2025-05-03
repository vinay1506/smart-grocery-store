
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';

// Example order data
const mockOrders = [
  {
    id: '12345',
    date: '2025-04-28',
    items: [
      { name: 'Organic Milk', quantity: 2 },
      { name: 'Fresh Apples', quantity: 5 },
      { name: 'Whole Wheat Bread', quantity: 1 },
    ],
    total: 18.45,
    status: 'delivered',
    tracking: 'TRK872341',
  },
  {
    id: '12346',
    date: '2025-05-01',
    items: [
      { name: 'Orange Juice', quantity: 2 },
      { name: 'Chicken Breast', quantity: 1 },
      { name: 'Mixed Vegetables', quantity: 1 },
    ],
    total: 22.30,
    status: 'shipped',
    tracking: 'TRK872342',
  },
  {
    id: '12347',
    date: '2025-05-02',
    items: [
      { name: 'Bananas', quantity: 6 },
      { name: 'Cereal', quantity: 1 },
    ],
    total: 8.75,
    status: 'pending',
    tracking: null,
  },
];

type Order = typeof mockOrders[0];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'delivered':
      return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" /> Delivered</Badge>;
    case 'shipped':
      return <Badge className="bg-blue-500"><Truck className="w-3 h-3 mr-1" /> Shipped</Badge>;
    case 'cancelled':
      return <Badge className="bg-red-500"><XCircle className="w-3 h-3 mr-1" /> Cancelled</Badge>;
    case 'pending':
    default:
      return <Badge className="bg-yellow-500"><Clock className="w-3 h-3 mr-1" /> Processing</Badge>;
  }
};

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch orders
    const fetchOrders = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setOrders(mockOrders);
      setLoading(false);
    };
    
    fetchOrders();
  }, []);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-xl">Loading orders...</div>
      </div>
    );
  }
  
  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">No orders found</h2>
        <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
        <Link to="/products" className="text-grocery-primary hover:underline">
          Browse Products
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between flex-wrap gap-2">
                <div>
                  <CardTitle>Order #{order.id}</CardTitle>
                  <p className="text-sm text-gray-500">Placed on {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-semibold">${order.total.toFixed(2)}</span>
                  {getStatusBadge(order.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Items</h3>
                  <ul className="space-y-1 text-sm">
                    {order.items.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{item.name} × {item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between items-end pt-2">
                  {order.tracking ? (
                    <div className="text-sm">
                      <span className="text-gray-600">Tracking: </span>
                      <span className="font-medium">{order.tracking}</span>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <Link
                    to={`/orders/${order.id}`}
                    className="text-grocery-primary hover:underline text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
