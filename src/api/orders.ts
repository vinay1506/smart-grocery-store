export interface Order {
  order_id: number;
  customer_id: number;
  total_price: number;
  status: string;
  product_ids: string;
  quantities: string;
  subtotals: string;
  tracking_number: string;
  delivery_status: string;
  estimated_arrival: string;
  payment_method: string;
  payment_status: string;
}

const API_URL = 'http://localhost:3000/api';

export const createOrder = async (orderData: {
  customer_id: number;
  items: Array<{
    product_id: number;
    quantity: number;
    price: number;
  }>;
  total_price: number;
  shipping_info: {
    address: string;
    payment_method: string;
  };
}): Promise<{ orderId: number }> => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error('Failed to create order');
  }

  return response.json();
};

export const getOrderById = async (id: number): Promise<Order> => {
  const response = await fetch(`${API_URL}/orders/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch order');
  }
  return response.json();
}; 