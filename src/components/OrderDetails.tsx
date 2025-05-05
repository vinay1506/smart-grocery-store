import React, { useEffect, useState } from 'react';

interface OrderDetailsProps {
    orderId: number;
}

interface OrderItem {
    product_id: number;
    product_name: string;
    quantity: number;
    price: number;
}

interface Order {
    order_id: number;
    customer_name: string;
    email: string;
    phone: string;
    address: string;
    total_amount: number;
    status: string;
    created_at: string;
    items: OrderItem[];
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderId }) => {
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/orders/${orderId}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to fetch order details');
                }

                setOrder(data.order);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch order details');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-100 text-red-700 rounded">
                {error}
            </div>
        );
    }

    if (!order) {
        return (
            <div className="p-4 bg-yellow-100 text-yellow-700 rounded">
                Order not found
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Order Confirmation</h2>
                <div className="bg-green-100 text-green-700 p-4 rounded mb-4">
                    <p className="font-medium">Order placed successfully!</p>
                    <p className="text-sm">Order ID: #{order.order_id}</p>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Customer Information</h3>
                <div className="bg-gray-50 p-4 rounded">
                    <p><span className="font-medium">Name:</span> {order.customer_name}</p>
                    <p><span className="font-medium">Email:</span> {order.email}</p>
                    <p><span className="font-medium">Phone:</span> {order.phone}</p>
                    <p><span className="font-medium">Address:</span> {order.address}</p>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Order Items</h3>
                <div className="bg-gray-50 p-4 rounded">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-2">Product</th>
                                <th className="text-right py-2">Quantity</th>
                                <th className="text-right py-2">Price</th>
                                <th className="text-right py-2">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((item) => (
                                <tr key={item.product_id} className="border-b">
                                    <td className="py-2">{item.product_name}</td>
                                    <td className="text-right py-2">{item.quantity}</td>
                                    <td className="text-right py-2">${item.price.toFixed(2)}</td>
                                    <td className="text-right py-2">
                                        ${(item.quantity * item.price).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={3} className="text-right py-2 font-medium">
                                    Total:
                                </td>
                                <td className="text-right py-2 font-medium">
                                    ${order.total_amount.toFixed(2)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <div className="text-sm text-gray-600">
                <p>Order placed on: {new Date(order.created_at).toLocaleString()}</p>
                <p>Status: <span className="capitalize">{order.status}</span></p>
            </div>
        </div>
    );
};

export default OrderDetails; 