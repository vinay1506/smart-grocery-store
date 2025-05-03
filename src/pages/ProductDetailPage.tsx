
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ChevronRight, Minus, Plus, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data
const products = [
  {
    id: 1,
    name: 'Milk',
    price: 2.50,
    categoryId: 1, 
    categoryName: 'Dairy',
    stock: 100,
    description: 'Fresh milk from local farms. Our milk is sourced from cows raised on organic feed without hormones or antibiotics. It is pasteurized to ensure safety while maintaining its nutritional value. Great for drinking, cooking, or baking.',
    image: 'https://images.unsplash.com/photo-1635174241296-82d5762cd93e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG1pbGt8ZW58MHx8MHx8&auto=format&fit=crop&w=300&h=300&q=80',
    nutrition: {
      calories: '150 kcal',
      fat: '8g',
      carbs: '12g',
      protein: '8g',
    },
    reviews: [
      { id: 1, author: 'Alice Brown', rating: 5, comment: 'Great quality milk, very fresh!', date: '2025-04-28' },
      { id: 2, author: 'Bob Johnson', rating: 4, comment: 'Good taste, quick delivery', date: '2025-04-25' },
    ],
  },
  {
    id: 2,
    name: 'Apple',
    price: 1.20,
    categoryId: 2,
    categoryName: 'Vegetables',
    stock: 200,
    description: 'Red apples sourced from organic farms. These apples are juicy, crisp, and have the perfect balance of sweet and tart flavors. They are perfect for eating fresh, baking into desserts, or adding to salads. Packed with essential vitamins and fiber.',
    image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=300&h=300&q=80',
    nutrition: {
      calories: '95 kcal',
      fat: '0g',
      carbs: '25g',
      protein: '0.5g',
    },
    reviews: [
      { id: 1, author: 'Emma Wilson', rating: 5, comment: 'Very fresh and delicious apples!', date: '2025-04-27' },
      { id: 2, author: 'David Lee', rating: 3, comment: 'Good apples but some had bruises', date: '2025-04-24' },
    ],
  },
  // Add more product details as needed
];

// Related products mock data
const relatedProducts = [
  {
    id: 3,
    name: 'Orange Juice',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8anVpY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=300&h=300&q=80',
    category: 'Beverages',
  },
  {
    id: 4,
    name: 'Cheese',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1589881133595-a3c085cb731d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2hlZXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80',
    category: 'Dairy',
  },
  {
    id: 5,
    name: 'Yogurt',
    price: 2.75,
    image: 'https://images.unsplash.com/photo-1579954793243-3ba31251662d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8eW9ndXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80',
    category: 'Dairy',
  },
  {
    id: 6,
    name: 'Tomato',
    price: 1.00,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dG9tYXRvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80',
    category: 'Vegetables',
  },
];

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<any | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const foundProduct = products.find(p => p.id.toString() === productId);
        setProduct(foundProduct || null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);
  
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleIncreaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity: 0 }, quantity);
    }
  };
  
  const getAverageRating = (reviews: any[]) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return sum / reviews.length;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6 text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  const averageRating = getAverageRating(product.reviews);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center mb-6 text-sm">
        <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
        <ChevronRight className="h-4 w-4 mx-2 text-gray-500" />
        <Link to="/products" className="text-gray-500 hover:text-gray-700">Products</Link>
        <ChevronRight className="h-4 w-4 mx-2 text-gray-500" />
        <Link to={`/products?category=${product.categoryId}`} className="text-gray-500 hover:text-gray-700">{product.categoryName}</Link>
        <ChevronRight className="h-4 w-4 mx-2 text-gray-500" />
        <span className="text-gray-900 font-medium">{product.name}</span>
      </div>

      <div className="mb-8">
        <Link to="/products" className="inline-flex items-center text-grocery-primary hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Products
        </Link>
      </div>

      {/* Product Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg"
          />
        </div>
        
        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="outline" className="mb-2">
              {product.categoryName}
            </Badge>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(averageRating)
                        ? 'text-yellow-500 fill-yellow-500'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {averageRating.toFixed(1)} ({product.reviews.length} reviews)
              </span>
            </div>
            <p className="text-2xl font-bold text-grocery-primary mb-4">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-700 mb-6">{product.description}</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="font-medium mr-4">Availability:</span>
              {product.stock > 0 ? (
                <span className="text-green-600">In Stock ({product.stock} available)</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </div>
          </div>
          
          {product.stock > 0 && (
            <div className="space-y-6">
              <div className="flex items-center">
                <span className="font-medium mr-4">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-none"
                    onClick={handleDecreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-none"
                    onClick={handleIncreaseQuantity}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Button
                onClick={handleAddToCart}
                className="w-full bg-grocery-primary hover:bg-grocery-primary/90"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Product Tabs */}
      <Tabs defaultValue="details" className="mb-12">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition Info</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="p-6 bg-white rounded-lg shadow-sm mt-2">
          <h2 className="text-xl font-semibold mb-4">Product Details</h2>
          <p className="mb-4">{product.description}</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Category: {product.categoryName}</li>
            <li>Stock: {product.stock} units</li>
            {/* Add more details as needed */}
          </ul>
        </TabsContent>
        <TabsContent value="nutrition" className="p-6 bg-white rounded-lg shadow-sm mt-2">
          <h2 className="text-xl font-semibold mb-4">Nutrition Information</h2>
          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b">
              <span>Calories</span>
              <span>{product.nutrition.calories}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Fat</span>
              <span>{product.nutrition.fat}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Carbohydrates</span>
              <span>{product.nutrition.carbs}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Protein</span>
              <span>{product.nutrition.protein}</span>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="p-6 bg-white rounded-lg shadow-sm mt-2">
          <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
          {product.reviews.length > 0 ? (
            <div className="space-y-6">
              {product.reviews.map((review: any) => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-medium ml-2">{review.author}</span>
                    <span className="text-sm text-gray-500 ml-auto">{review.date}</span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No reviews yet.</p>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <Card key={relatedProduct.id} className="overflow-hidden h-full">
              <div className="h-48 overflow-hidden">
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <Badge variant="outline" className="mb-2">
                  {relatedProduct.category}
                </Badge>
                <h3 className="font-semibold text-lg mb-2">{relatedProduct.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">${relatedProduct.price.toFixed(2)}</span>
                  <Button 
                    onClick={() => addToCart(relatedProduct)}
                    size="sm"
                    className="bg-grocery-primary hover:bg-grocery-primary/90"
                  >
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
