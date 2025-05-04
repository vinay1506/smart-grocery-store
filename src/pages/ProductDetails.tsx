import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { getProductById } from '../api/products';
import { useCart } from '../contexts/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;
        const productData = await getProductById(parseInt(id));
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.product_id,
      name: product.name,
      price: product.price,
      image: product.image_url
    });
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-grocery-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-grocery-dark mb-2">Product not found</h3>
        <button
          onClick={() => navigate('/products')}
          className="btn btn-primary mt-4"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-grocery-dark hover:text-grocery-primary"
      >
        <ArrowLeft className="mr-2" size={20} />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative h-96 rounded-xl overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-grocery-primary text-white text-xs font-semibold px-2 py-1 rounded">
            {product.categoryName}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-grocery-dark mb-2">{product.name}</h1>
            <p className="text-2xl font-bold text-grocery-primary mb-4">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-grocery-dark hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-grocery-dark hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 btn btn-primary flex items-center justify-center"
            >
              <ShoppingCart className="mr-2" size={20} />
              Add to Cart
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-grocery">
            <h3 className="text-lg font-semibold text-grocery-dark mb-4">Product Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Category</span>
                <span className="font-medium">{product.categoryName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Stock</span>
                <span className="font-medium">{product.stock_quantity} available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 