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
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  const product = await response.json();
  // Convert price string to number
  return {
    ...product,
    price: parseFloat(product.price)
  };
}; 