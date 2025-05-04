export interface Product {
  product_id: number;
  name: string;
  category_id: number;
  categoryName: string;
  price: number;
  stock_quantity: number;
  description: string;
  image_url: string;
}

export interface Category {
  category_id: number;
  category_name: string;
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  category_id: number;
  image_url?: string;
}

const API_URL = 'http://localhost:3000/api';

export const getProducts = async (category?: string, search?: string): Promise<Product[]> => {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (search) params.append('search', search);

  const response = await fetch(`${API_URL}/products?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const products = await response.json();
  // Convert price strings to numbers
  return products.map((product: any) => ({
    ...product,
    price: parseFloat(product.price)
  }));
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_URL}/products/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
};

export const getProductById = async (id: number): Promise<Product> => {
  try {
    const response = await fetch(`http://localhost:3000/api/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const createProduct = async (productData: CreateProductData): Promise<Product> => {
  try {
    const response = await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error('Failed to create product');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}; 