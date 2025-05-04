import express from 'express';
import { pool } from '../db';

const router = express.Router();

// Create a new order
router.post('/', async (req, res) => {
  const { customer_id, items, total_price, shipping_info } = req.body;

  try {
    // Start a transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // Insert order
      const [orderResult] = await connection.execute(
        'INSERT INTO Orders (customer_id, total_price, status) VALUES (?, ?, ?)',
        [customer_id, total_price, 'pending']
      );

      const orderId = (orderResult as any).insertId;

      // Insert order details
      for (const item of items) {
        await connection.execute(
          'INSERT INTO Order_Details (order_id, product_id, quantity, subtotal) VALUES (?, ?, ?, ?)',
          [orderId, item.product_id, item.quantity, item.price * item.quantity]
        );
      }

      // Insert shipping info
      await connection.execute(
        'INSERT INTO Shipping_Info (order_id, tracking_number, delivery_address, delivery_status, estimated_arrival) VALUES (?, ?, ?, ?, ?)',
        [
          orderId,
          `TRK${Date.now()}`,
          shipping_info.address,
          'processing',
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
        ]
      );

      // Insert payment info
      await connection.execute(
        'INSERT INTO Payment (order_id, payment_method, payment_status, transaction_id, amount) VALUES (?, ?, ?, ?, ?)',
        [
          orderId,
          shipping_info.payment_method,
          'completed',
          `TXN${Date.now()}`,
          total_price
        ]
      );

      // Commit the transaction
      await connection.commit();
      connection.release();

      res.status(201).json({
        message: 'Order created successfully',
        orderId,
      });
    } catch (error) {
      // Rollback the transaction in case of error
      await connection.rollback();
      connection.release();
      throw error;
    }
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [orders] = await pool.execute(
      `SELECT o.*, 
              GROUP_CONCAT(od.product_id) as product_ids,
              GROUP_CONCAT(od.quantity) as quantities,
              GROUP_CONCAT(od.subtotal) as subtotals,
              si.tracking_number,
              si.delivery_status,
              si.estimated_arrival,
              p.payment_method,
              p.payment_status
       FROM Orders o
       LEFT JOIN Order_Details od ON o.order_id = od.order_id
       LEFT JOIN Shipping_Info si ON o.order_id = si.order_id
       LEFT JOIN Payment p ON o.order_id = p.order_id
       WHERE o.order_id = ?
       GROUP BY o.order_id`,
      [id]
    );

    if (Array.isArray(orders) && orders.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(orders[0]);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

export default router; 