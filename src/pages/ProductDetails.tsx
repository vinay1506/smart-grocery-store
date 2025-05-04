import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../api/products';
import { useCart } from '../contexts/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) {
          throw new Error('Product ID is required');
        }
        const productData = await getProductById(parseInt(id));
        setProduct(productData);
      } catch (error) {
        setError('Failed to load product');
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-grocery-primary"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-grocery-dark mb-2">Product not found</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => navigate('/products')}
          className="btn btn-primary"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-grocery overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          <div className="relative h-96">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute top-2 right-2 bg-grocery-primary text-white text-xs font-semibold px-2 py-1 rounded">
              {product.categoryName}
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-grocery-dark">{product.name}</h1>
            <p className="text-2xl font-bold text-grocery-primary">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-600">{product.description}</p>
            <button
              onClick={() => addToCart({
                id: product.product_id,
                name: product.name,
                price: product.price,
                image: product.image_url
              })}
              className="btn btn-primary w-full"
            >
              Add to Cart
            </button>
            <button
              onClick={() => navigate('/products')}
              className="btn btn-secondary w-full"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 