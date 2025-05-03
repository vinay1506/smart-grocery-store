
import mysql from 'mysql2/promise';
import { dbConfig } from './env';

// Create a pool for database connections
const pool = mysql.createPool(dbConfig);

// Test database connection
export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connection established successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
};

// Helper function to execute SQL queries
export const query = async (sql: string, params?: any[]) => {
  try {
    const [results] = await pool.execute(sql, params || []);
    return results;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

// Product related queries
export const getProducts = async (categoryFilter?: string, searchQuery?: string) => {
  try {
    let sql = `
      SELECT p.*, c.name as categoryName
      FROM products p
      LEFT JOIN categories c ON p.categoryId = c.id
      WHERE 1=1
    `;
    
    const params: any[] = [];
    
    if (categoryFilter && categoryFilter !== 'all') {
      sql += ' AND p.categoryId = ?';
      params.push(categoryFilter);
    }
    
    if (searchQuery) {
      sql += ' AND (p.name LIKE ? OR p.description LIKE ?)';
      const searchParam = `%${searchQuery}%`;
      params.push(searchParam, searchParam);
    }
    
    const results = await query(sql, params);
    return results;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getCategories = async () => {
  try {
    const results = await query('SELECT * FROM categories');
    return results;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Product operations
export const addProduct = async (product: any) => {
  const { name, price, categoryId, stock, description, image } = product;
  const sql = `
    INSERT INTO products (name, price, categoryId, stock, description, image)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  return await query(sql, [name, price, categoryId, stock, description, image]);
};

export const updateProduct = async (id: number, product: any) => {
  const { name, price, categoryId, stock, description, image } = product;
  const sql = `
    UPDATE products
    SET name = ?, price = ?, categoryId = ?, stock = ?, description = ?, image = ?
    WHERE id = ?
  `;
  return await query(sql, [name, price, categoryId, stock, description, image, id]);
};

export const deleteProduct = async (id: number) => {
  const sql = 'DELETE FROM products WHERE id = ?';
  return await query(sql, [id]);
};

export default {
  testConnection,
  query,
  getProducts,
  getCategories,
  addProduct,
  updateProduct,
  deleteProduct
};
