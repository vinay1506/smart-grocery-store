
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
      SELECT pd.*, pc.category_name as categoryName
      FROM Product_Details pd
      LEFT JOIN Product_Category pc ON pd.category_id = pc.category_id
      WHERE 1=1
    `;
    
    const params: any[] = [];
    
    if (categoryFilter && categoryFilter !== 'all') {
      sql += ' AND pd.category_id = ?';
      params.push(categoryFilter);
    }
    
    if (searchQuery) {
      sql += ' AND (pd.name LIKE ? OR pd.description LIKE ?)';
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
    const results = await query('SELECT * FROM Product_Category');
    return results;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Product operations
export const addProduct = async (product: any) => {
  const { name, price, category_id, stock_quantity, description, supplier_id } = product;
  const sql = `
    INSERT INTO Product_Details (name, price, category_id, stock_quantity, description, supplier_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  return await query(sql, [name, price, category_id, stock_quantity, description, supplier_id]);
};

export const updateProduct = async (id: number, product: any) => {
  const { name, price, category_id, stock_quantity, description, supplier_id } = product;
  const sql = `
    UPDATE Product_Details
    SET name = ?, price = ?, category_id = ?, stock_quantity = ?, description = ?, supplier_id = ?
    WHERE product_id = ?
  `;
  return await query(sql, [name, price, category_id, stock_quantity, description, supplier_id, id]);
};

export const deleteProduct = async (id: number) => {
  const sql = 'DELETE FROM Product_Details WHERE product_id = ?';
  return await query(sql, [id]);
};

// Supplier related queries
export const getSuppliers = async () => {
  try {
    const results = await query('SELECT * FROM Supplier');
    return results;
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    return [];
  }
};

// Customer related queries
export const getCustomers = async () => {
  try {
    const results = await query('SELECT * FROM Customer');
    return results;
  } catch (error) {
    console.error('Error fetching customers:', error);
    return [];
  }
};

// Order related queries
export const getOrders = async (statusFilter?: string, customerId?: number) => {
  try {
    let sql = `
      SELECT o.*, c.name as customerName, c.email as customerEmail
      FROM Orders o
      LEFT JOIN Customer c ON o.customer_id = c.customer_id
      WHERE 1=1
    `;
    
    const params: any[] = [];
    
    if (statusFilter && statusFilter !== 'all') {
      sql += ' AND o.status = ?';
      params.push(statusFilter);
    }
    
    if (customerId) {
      sql += ' AND o.customer_id = ?';
      params.push(customerId);
    }
    
    sql += ' ORDER BY o.order_date DESC';
    
    const results = await query(sql, params);
    return results;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};

export const getOrderDetails = async (orderId: number) => {
  try {
    const sql = `
      SELECT od.*, pd.name as productName, pd.price
      FROM Order_Details od
      LEFT JOIN Product_Details pd ON od.product_id = pd.product_id
      WHERE od.order_id = ?
    `;
    
    const results = await query(sql, [orderId]);
    return results;
  } catch (error) {
    console.error('Error fetching order details:', error);
    return [];
  }
};

export const updateOrderStatus = async (orderId: number, status: string) => {
  const sql = 'UPDATE Orders SET status = ? WHERE order_id = ?';
  return await query(sql, [status, orderId]);
};

// Admin authentication
export const adminLogin = async (email: string, password: string) => {
  try {
    const sql = 'SELECT * FROM Admin WHERE email = ? AND password = ?';
    const results = await query(sql, [email, password]);
    const admins = results as any[];
    
    if (admins.length > 0) {
      const admin = admins[0];
      // Remove password before returning
      delete admin.password;
      return admin;
    }
    return null;
  } catch (error) {
    console.error('Error during admin login:', error);
    return null;
  }
};

// Customer authentication
export const customerLogin = async (email: string, password: string) => {
  try {
    const sql = 'SELECT * FROM Customer WHERE email = ? AND password = ?';
    const results = await query(sql, [email, password]);
    const customers = results as any[];
    
    if (customers.length > 0) {
      const customer = customers[0];
      // Remove password before returning
      delete customer.password;
      return customer;
    }
    return null;
  } catch (error) {
    console.error('Error during customer login:', error);
    return null;
  }
};

// Customer registration
export const registerCustomer = async (customer: any) => {
  const { name, email, password, phone, address } = customer;
  const sql = `
    INSERT INTO Customer (name, email, password, phone, address)
    VALUES (?, ?, ?, ?, ?)
  `;
  return await query(sql, [name, email, password, phone, address]);
};

// Website information
export const getWebsiteInfo = async () => {
  try {
    const results = await query('SELECT * FROM Website LIMIT 1');
    const websites = results as any[];
    return websites.length > 0 ? websites[0] : null;
  } catch (error) {
    console.error('Error fetching website information:', error);
    return null;
  }
};

export default {
  testConnection,
  query,
  getProducts,
  getCategories,
  addProduct,
  updateProduct,
  deleteProduct,
  getSuppliers,
  getCustomers,
  getOrders,
  getOrderDetails,
  updateOrderStatus,
  adminLogin,
  customerLogin,
  registerCustomer,
  getWebsiteInfo
};
