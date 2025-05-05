import express from 'express';
import { pool } from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

const router = express.Router();

interface Product extends RowDataPacket {
  product_id: number;
  name: string;
  category_id: number;
  price: string;
  stock_quantity: number;
  description: string;
  categoryName: string;
  image_url: string;
}

// Get all products with optional category filter
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let sql = `
      SELECT 
        pd.*, 
        pc.category_name as categoryName,
        CONCAT('https://source.unsplash.com/random/300x300/?', pd.name) as image_url
      FROM Product_Details pd
      LEFT JOIN Product_Category pc ON pd.category_id = pc.category_id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (category && category !== 'all') {
      sql += ' AND pd.category_id = ?';
      params.push(category);
    }

    if (search) {
      sql += ' AND (pd.name LIKE ? OR pd.description LIKE ?)';
      const searchParam = `%${search}%`;
      params.push(searchParam, searchParam);
    }

    const [products] = await pool.execute<Product[]>(sql, params);

    const formattedProducts = products.map((product) => ({
      ...product,
      price: parseFloat(product.price)
    }));

    res.json(formattedProducts);
  } catch (error: any) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const [categories] = await pool.execute('SELECT * FROM Product_Category');
    res.json(categories);
  } catch (error: any) {
    console.error('Error fetching categories:', error.message);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [products] = await pool.query<RowDataPacket[]>(
      `SELECT 
        pd.*, 
        pc.category_name as categoryName
      FROM Product_Details pd
      LEFT JOIN Product_Category pc ON pd.category_id = pc.category_id
      WHERE pd.product_id = ?`,
      [id]
    );

    if (products.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(products[0]);
  } catch (error: any) {
    console.error('Error fetching product:', error.message);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  try {
    const { name, description, price, category_id, image_url, stock_quantity } = req.body;

    if (!name || !description || !price || !category_id || stock_quantity == null) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO Product_Details 
        (name, description, price, category_id, image_url, stock_quantity) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, description, price, category_id, image_url, stock_quantity]
    );

    const [products] = await pool.query<RowDataPacket[]>(
      `SELECT 
        pd.*, 
        pc.category_name as categoryName
      FROM Product_Details pd
      LEFT JOIN Product_Category pc ON pd.category_id = pc.category_id
      WHERE pd.product_id = ?`,
      [result.insertId]
    );

    res.status(201).json(products[0]);
  } catch (error: any) {
    console.error('Error creating product:', error.message);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

export default router;
