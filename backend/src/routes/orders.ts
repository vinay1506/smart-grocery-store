import express from 'express';
import { pool } from '../db';

const router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
    try {
        const [orders] = await pool.query(`
            SELECT 
                o.*,
                COALESCE(
                    JSON_ARRAYAGG(
                        IF(od.order_detail_id IS NOT NULL,
                            JSON_OBJECT(
                                'product_id', od.product_id,
                                'product_name', p.name,
                                'quantity', od.quantity,
                                'price', od.price
                            ),
                            NULL
                        )
                    ),
                    '[]'
                ) as items
            FROM Orders o
            LEFT JOIN Order_Details od ON o.order_id = od.order_id
            LEFT JOIN Product_Details p ON od.product_id = p.product_id
            GROUP BY o.order_id
            ORDER BY o.created_at DESC
        `);

        // Handle empty orders table
        if (!orders || (orders as any[]).length === 0) {
            return res.json({
                success: true,
                orders: []
            });
        }

        // Parse the JSON string in items and handle potential parsing errors
        const formattedOrders = (orders as any[]).map(order => {
            try {
                const items = JSON.parse(order.items);
                // Filter out null values that might come from the LEFT JOIN
                const validItems = Array.isArray(items) ? items.filter(item => item !== null) : [];
                return {
                    ...order,
                    items: validItems
                };
            } catch (parseError) {
                console.error('Error parsing items for order:', order.order_id, parseError);
                return {
                    ...order,
                    items: []
                };
            }
        });

        res.json({
            success: true,
            orders: formattedOrders
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch orders',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Place a new order
router.post('/place-order', async (req, res) => {
    const connection = await pool.getConnection();
    
    try {
        await connection.beginTransaction();

        const {
            customer_name,
            email,
            phone,
            address,
            total_amount,
            items // Array of { product_id, quantity, price }
        } = req.body;

        // Validate input
        if (!customer_name || !email || !phone || !address || !total_amount || !items || !Array.isArray(items)) {
            throw new Error('Missing required fields');
        }

        // Insert into Orders table
        const [orderResult] = await connection.query(
            'INSERT INTO Orders (customer_name, email, phone, address, total_amount) VALUES (?, ?, ?, ?, ?)',
            [customer_name, email, phone, address, total_amount]
        );

        const orderId = (orderResult as any).insertId;

        // Insert order details
        for (const item of items) {
            await connection.query(
                'INSERT INTO Order_Details (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                [orderId, item.product_id, item.quantity, item.price]
            );

            // Update product stock
            await connection.query(
                'UPDATE Product_Details SET stock_quantity = stock_quantity - ? WHERE product_id = ?',
                [item.quantity, item.product_id]
            );
        }

        await connection.commit();

        res.json({
            success: true,
            orderId,
            message: 'Order placed successfully'
        });

    } catch (error) {
        await connection.rollback();
        console.error('Error placing order:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to place order',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    } finally {
        connection.release();
    }
});

// Get order details
router.get('/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;

        const [order] = await pool.query(
            `SELECT o.*, od.product_id, od.quantity, od.price, p.name as product_name
             FROM Orders o
             JOIN Order_Details od ON o.order_id = od.order_id
             JOIN Product_Details p ON od.product_id = p.product_id
             WHERE o.order_id = ?`,
            [orderId]
        );

        if (!order || (order as any[]).length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.json({
            success: true,
            order: order
        });

    } catch (error) {
        console.error('Error fetching order details:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch order details',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

export default router; 