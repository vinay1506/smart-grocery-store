import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Product } from '../api/products';

interface OrderFormProps {
    onOrderPlaced: (orderId: number) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onOrderPlaced }) => {
    const { items, totalPrice, clearCart } = useCart();
    const [formData, setFormData] = useState({
        customer_name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const orderData = {
                customer_name: formData.customer_name,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                total_amount: totalPrice,
                items: items.map(item => ({
                    product_id: item.id,
                    quantity: item.quantity,
                    price: item.price
                }))
            };

            const response = await fetch('http://localhost:3000/api/orders/place-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to place order');
            }

            clearCart();
            onOrderPlaced(data.orderId);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Place Your Order</h2>
            
            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="customer_name">
                    Full Name
                </label>
                <input
                    type="text"
                    id="customer_name"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="phone">
                    Phone Number
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="address">
                    Delivery Address
                </label>
                <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                <div className="bg-gray-50 p-4 rounded">
                    <p className="font-medium">Total Amount: ${totalPrice.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">{items.length} items in cart</p>
                </div>
            </div>

            <div className="flex gap-4">
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="flex-1 py-3 px-4 rounded text-gray-700 font-medium border border-gray-300 hover:bg-gray-50"
                >
                    Back to Cart
                </button>
                <button
                    type="submit"
                    disabled={loading || items.length === 0}
                    className={`flex-1 py-3 px-4 rounded text-white font-medium ${
                        loading || items.length === 0
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {loading ? 'Placing Order...' : 'Place Order'}
                </button>
            </div>
        </form>
    );
};

export default OrderForm; 