
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Package, Truck, Check, MapPin, Calendar, Clock } from 'lucide-react';

// Example order data
const mockOrderDetails = {
  id: '12345',
  date: '2025-04-28',
  items: [
    { id: 1, name: 'Organic Milk', price: 3.99, quantity: 2, image: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Fresh Apples', price: 1.49, quantity: 5, image: 'https://via.placeholder.com/100' },
    { id: 3, name: 'Whole Wheat Bread', price: 2.50, quantity: 1, image: 'https://via.placeholder.com/100' },
  ],
  subtotal: 15.94,
  shipping: 2.99,
  tax: 1.52,
  total: 20.45,
  status: 'delivered',
  payment: {
    method: 'credit_card',
    lastFour: '1234',
    paid: true,
  },
  shipping: {
    address: '123 Main St, Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    tracking: 'TRK872341',
    carrier: 'UPS',
    estimatedDelivery: '2025-04-30',
  },
  timeline: [
    { status: 'ordered', date: '2025-04-28 09:15:00', message: 'Order placed' },
    { status: 'processing', date: '2025-04-28 10:30:00', message: 'Payment confirmed' },
    { status: 'shipped', date: '2025-04-29 14:20:00', message: 'Package shipped' },
    { status: 'delivered', date: '2025-04-30 11:45:00', message: 'Package delivered' },
  ],
};

// Mock order for order #12346
const mockOrderDetails2 = {
  id: '12346',
  date: '2025-05-01',
  items: [
    { id: 4, name: 'Orange Juice', price: 4.99, quantity: 2, image: 'https://via.placeholder.com/100' },
    { id: 5, name: 'Chicken Breast', price: 8.99, quantity: 1, image: 'https://via.placeholder.com/100' },
    { id: 6, name: 'Mixed Vegetables', price: 3.99, quantity: 1, image: 'https://via.placeholder.com/100' },
  ],
  subtotal: 18.97,
  shipping: 2.99,
  tax: 1.90,
  total: 23.86,
  status: 'shipped',
  payment: {
    method: 'credit_card',
    lastFour: '5678',
    paid: true,
  },
  shipping: {
    address: '123 Main St, Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    tracking: 'TRK872342',
    carrier: 'FedEx',
    estimatedDelivery: '2025-05-04',
  },
  timeline: [
    { status: 'ordered', date: '2025-05-01 14:22:00', message: 'Order placed' },
    { status: 'processing', date: '2025-05-01 15:10:00', message: 'Payment confirmed' },
    { status: 'shipped', date: '2025-05-02 09:45:00', message: 'Package shipped' },
  ],
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'delivered':
      return <Badge className="bg-green-500"><Check className="w-3 h-3 mr-1" /> Delivered</Badge>;
    case 'shipped':
      return <Badge className="bg-blue-500"><Truck className="w-3 h-3 mr-1" /> Shipped</Badge>;
    case 'processing':
      return <Badge className="bg-yellow-500"><Package className="w-3 h-3 mr-1" /> Processing</Badge>;
    case 'ordered':
      return <Badge className="bg-gray-500"><Clock className="w-3 h-3 mr-1" /> Ordered</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const OrderDetailPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch order details
    const fetchOrderDetails = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Get the correct mock order based on orderId
      if (orderId === '12345') {
        setOrder(mockOrderDetails);
      } else if (orderId === '12346') {
        setOrder(mockOrderDetails2);
      } else {
        // If order not found, navigate to orders page
        navigate('/orders', { replace: true });
      }
      
      setLoading(false);
    };
    
    fetchOrderDetails();
  }, [orderId, navigate]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-xl">Loading order details...</div>
      </div>
    );
  }
  
  if (!order) {
    return null;
  }
  
  return (
    <div>
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={() => navigate('/orders')} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
        </Button>
        <h1 className="text-3xl font-bold">Order #{order.id}</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>
                Placed on {new Date(order.date).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Items */}
              <div className="space-y-4">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex items-start space-x-4">
                    <div className="h-16 w-16 rounded border overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      <p className="text-gray-500 text-sm">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Order Total */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span>Shipping</span>
                  <span>${order.shipping.toFixed ? order.shipping.toFixed(2) : '2.99'}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span>Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold mt-4 pt-2 border-t">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Order Timeline */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative pl-8">
                {order.timeline.map((event: any, index: number) => (
                  <div key={index} className="mb-6 relative">
                    {/* Timeline connector */}
                    {index < order.timeline.length - 1 && (
                      <div className="absolute left-[-16px] top-6 bottom-0 w-0.5 bg-gray-200 z-0"></div>
                    )}
                    
                    {/* Status dot */}
                    <div className={`absolute left-[-20px] top-1 h-4 w-4 rounded-full z-10 ${
                      event.status === 'delivered' ? 'bg-green-500' : 
                      event.status === 'shipped' ? 'bg-blue-500' : 
                      'bg-gray-300'
                    }`}></div>
                    
                    <div>
                      <div className="flex items-center">
                        <span className="font-semibold">{event.message}</span>
                        <span className="ml-2">{getStatusBadge(event.status)}</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(event.date).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Order Info */}
        <div>
          {/* Status */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-2">
                {getStatusBadge(order.status)}
              </div>
            </CardContent>
          </Card>
          
          {/* Shipping Info */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Shipping</CardTitle>
                <MapPin className="h-4 w-4 text-gray-500" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><span className="font-medium">Address:</span> {order.shipping.address}</p>
              <p>{order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}</p>
              
              <Separator className="my-2" />
              
              {order.shipping.tracking && (
                <>
                  <div>
                    <span className="font-medium">Tracking:</span> {order.shipping.tracking}
                  </div>
                  <div>
                    <span className="font-medium">Carrier:</span> {order.shipping.carrier}
                  </div>
                </>
              )}
              
              {order.shipping.estimatedDelivery && (
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>
                    Estimated delivery: {new Date(order.shipping.estimatedDelivery).toLocaleDateString()}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Payment Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <span className="font-medium">Method:</span> {' '}
                {order.payment.method === 'credit_card' ? 'Credit Card' : order.payment.method}
              </p>
              
              {order.payment.lastFour && (
                <p><span className="font-medium">Card:</span> •••• {order.payment.lastFour}</p>
              )}
              
              <p>
                <span className="font-medium">Status:</span> {' '}
                {order.payment.paid ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Paid</Badge>
                ) : (
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>
                )}
              </p>
            </CardContent>
          </Card>
          
          {/* Help */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-2">Need help with this order?</p>
            <Link to="/contact" className="text-grocery-primary text-sm hover:underline">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
