import { pool } from './db';

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Database connection successful!');

    // Check existing categories
    const [categories] = await connection.execute('SELECT * FROM Product_Category');
    console.log('Categories:', categories);

    // Check existing products
    const [products] = await connection.execute('SELECT * FROM Product_Details');
    console.log('Products:', products);

    connection.release();
  } catch (error) {
    console.error('Database test failed:', error);
  }
}

testConnection(); 