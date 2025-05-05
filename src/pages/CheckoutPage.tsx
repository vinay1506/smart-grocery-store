import React, { useState } from 'react';
import OrderForm from '../components/OrderForm';
import OrderDetails from '../components/OrderDetails';

const CheckoutPage: React.FC = () => {
    const [orderId, setOrderId] = useState<number | null>(null);

    const handleOrderPlaced = (newOrderId: number) => {
        setOrderId(newOrderId);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {orderId ? (
                <OrderDetails orderId={orderId} />
            ) : (
                <OrderForm onOrderPlaced={handleOrderPlaced} />
            )}
        </div>
    );
};

export default CheckoutPage; 