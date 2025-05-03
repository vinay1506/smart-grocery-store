
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Check, CreditCard, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const CheckoutPage = () => {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('shipping');
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: user?.phone || '',
  });
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  
  // Fixed shipping cost and tax rate
  const shipping = 5.99;
  const taxRate = 0.07;
  const tax = subtotal * taxRate;
  
  // Calculate total
  const total = subtotal + shipping + tax;
  
  const handleShippingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActiveTab('payment');
  };
  
  const handlePaymentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast.success('Order placed successfully!');
    clearCart();
    navigate('/orders');
  };
  
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-4">Add some products to your cart before checkout</p>
        <Button onClick={() => navigate('/products')}>Continue Shopping</Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
              <TabsTrigger value="payment" disabled={activeTab === 'shipping'}>Payment</TabsTrigger>
            </TabsList>
            
            <TabsContent value="shipping">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                  <CardDescription>Enter your shipping details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input 
                          id="fullName" 
                          value={shippingInfo.fullName} 
                          onChange={(e) => setShippingInfo({...shippingInfo, fullName: e.target.value})}
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          type="tel" 
                          value={shippingInfo.phone} 
                          onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                          required 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input 
                        id="address" 
                        value={shippingInfo.address} 
                        onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                        required 
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input 
                          id="city" 
                          value={shippingInfo.city} 
                          onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input 
                          id="state" 
                          value={shippingInfo.state} 
                          onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">Zip Code</Label>
                        <Input 
                          id="zipCode" 
                          value={shippingInfo.zipCode} 
                          onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                          required 
                        />
                      </div>
                    </div>
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="w-full bg-grocery-primary hover:bg-grocery-primary/90"
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Choose how you want to pay</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <RadioGroup 
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2 border p-4 rounded-md">
                        <RadioGroupItem value="credit_card" id="credit_card" />
                        <Label htmlFor="credit_card" className="flex items-center gap-2 cursor-pointer">
                          <CreditCard className="h-5 w-5" />
                          <span>Credit/Debit Card</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border p-4 rounded-md">
                        <RadioGroupItem value="cash_on_delivery" id="cash_on_delivery" />
                        <Label htmlFor="cash_on_delivery" className="flex items-center gap-2 cursor-pointer">
                          <Truck className="h-5 w-5" />
                          <span>Cash on Delivery</span>
                        </Label>
                      </div>
                    </RadioGroup>
                    
                    {paymentMethod === 'credit_card' && (
                      <div className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input id="expiryDate" placeholder="MM/YY" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nameOnCard">Name on Card</Label>
                          <Input id="nameOnCard" placeholder="John Doe" required />
                        </div>
                      </div>
                    )}
                    
                    <div className="pt-4 space-y-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setActiveTab('shipping')}
                      >
                        Back to Shipping
                      </Button>
                      <Button 
                        type="submit" 
                        className="w-full bg-grocery-primary hover:bg-grocery-primary/90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Processing...' : `Pay ${total.toFixed(2)}`}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <div className="flex items-start gap-2">
                    <span className="bg-slate-100 rounded-full h-6 w-6 flex items-center justify-center text-xs">
                      {item.quantity}
                    </span>
                    <span>{item.name}</span>
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
