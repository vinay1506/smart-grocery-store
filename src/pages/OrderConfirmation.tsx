import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Order, getOrderById } from '../api/orders';

export default function OrderConfirmation() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      try {
        const orderData = await getOrderById(parseInt(orderId));
        setOrder(orderData);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-500">{error || 'Order not found'}</h2>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <svg
            className="mx-auto h-16 w-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h1 className="text-3xl font-bold mt-4">Order Confirmed!</h1>
          <p className="text-gray-600 mt-2">
            Thank you for your order. We have received your order and will process it shortly.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold mb-4">Order Details</h2>
          <div className="space-y-4">
            <div>
              <span className="font-semibold">Order ID:</span> {order.order_id}
            </div>
            <div>
              <span className="font-semibold">Status:</span> {order.status}
            </div>
            <div>
              <span className="font-semibold">Total Amount:</span> ${order.total_price.toFixed(2)}
            </div>
            <div>
              <span className="font-semibold">Payment Method:</span> {order.payment_method}
            </div>
            <div>
              <span className="font-semibold">Payment Status:</span> {order.payment_status}
            </div>
            <div>
              <span className="font-semibold">Tracking Number:</span> {order.tracking_number}
            </div>
            <div>
              <span className="font-semibold">Delivery Status:</span> {order.delivery_status}
            </div>
            <div>
              <span className="font-semibold">Estimated Arrival:</span>{' '}
              {new Date(order.estimated_arrival).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </button>
          <button
            className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
} 