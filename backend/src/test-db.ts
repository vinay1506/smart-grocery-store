import { pool } from './db';

async function testDatabase() {
  try {
    const connection = await pool.getConnection();
    console.log('Database connection successful!');

    // Test Orders table
    console.log('\nTesting Orders table...');
    const [orders] = await connection.execute('SELECT * FROM Orders');
    console.log('Orders table exists with', (orders as any[]).length, 'records');

    // Test Order_Details table
    console.log('\nTesting Order_Details table...');
    const [orderDetails] = await connection.execute('SELECT * FROM Order_Details');
    console.log('Order_Details table exists with', (orderDetails as any[]).length, 'records');

    // Test Product_Details table
    console.log('\nTesting Product_Details table...');
    const [products] = await connection.execute('SELECT * FROM Product_Details');
    console.log('Product_Details table exists with', (products as any[]).length, 'records');

    // Test the complex orders query
    console.log('\nTesting orders query...');
    const [testOrders] = await connection.execute(`
      SELECT 
        o.*,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'product_id', od.product_id,
            'product_name', p.name,
            'quantity', od.quantity,
            'price', od.price
          )
        ) as items
      FROM Orders o
      JOIN Order_Details od ON o.order_id = od.order_id
      JOIN Product_Details p ON od.product_id = p.product_id
      GROUP BY o.order_id
      ORDER BY o.created_at DESC
    `);
    console.log('Complex orders query successful with', (testOrders as any[]).length, 'results');

    connection.release();
    console.log('\nAll database tests completed successfully!');
  } catch (error) {
    console.error('Database test failed:', error);
  } finally {
    process.exit();
  }
}

testDatabase(); 