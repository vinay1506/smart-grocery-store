
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock data
const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=400&q=80',
    title: 'Fresh Fruits & Vegetables',
    description: 'Get farm fresh fruits and vegetables delivered to your doorstep',
    buttonText: 'Shop Now',
    buttonLink: '/products?category=2',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=400&q=80',
    title: 'Fresh Dairy Products',
    description: 'Enjoy fresh and healthy dairy products',
    buttonText: 'Explore',
    buttonLink: '/products?category=1',
  },
];

const categories = [
  { id: 1, name: 'Dairy', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGRhaXJ5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=60' },
  { id: 2, name: 'Vegetables', image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHZlZ2V0YWJsZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=300&h=200&q=60' },
  { id: 3, name: 'Beverages', image: 'https://images.unsplash.com/photo-1596803244618-8dbee441d70b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJldmVyYWdlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=60' },
];

const featuredProducts = [
  {
    id: 1,
    name: 'Milk',
    price: 2.50,
    image: 'https://images.unsplash.com/photo-1635174241296-82d5762cd93e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG1pbGt8ZW58MHx8MHx8&auto=format&fit=crop&w=300&h=300&q=80',
    category: 'Dairy',
  },
  {
    id: 2,
    name: 'Apple',
    price: 1.20,
    image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=300&h=300&q=80',
    category: 'Fruits',
  },
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
    name: 'Tomato',
    price: 1.00,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dG9tYXRvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80',
    category: 'Vegetables',
  },
  {
    id: 6,
    name: 'Coffee',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y29mZmVlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80',
    category: 'Beverages',
  },
];

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  category?: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  
  return (
    <Card className="overflow-hidden h-full">
      <div className="h-48 overflow-hidden">
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        {product.category && (
          <Badge variant="outline" className="mb-2">
            {product.category}
          </Badge>
        )}
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <Button 
            onClick={() => addToCart(product)}
            size="sm"
            className="bg-grocery-primary hover:bg-grocery-primary/90"
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const HomePage = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Carousel */}
      <Carousel className="mb-12">
        <CarouselContent>
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative rounded-lg overflow-hidden h-[400px]">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center bg-black/30">
                  <div className="container mx-auto px-8">
                    <div className="max-w-lg">
                      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {slide.title}
                      </h1>
                      <p className="text-white text-lg mb-8">
                        {slide.description}
                      </p>
                      <Link to={slide.buttonLink}>
                        <Button size="lg" className="bg-grocery-primary hover:bg-grocery-primary/90">
                          {slide.buttonText}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>

      {/* Features */}
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-grocery-light p-6 rounded-lg flex flex-col items-center text-center">
            <div className="bg-grocery-primary/20 p-4 rounded-full mb-4">
              <svg className="w-8 h-8 text-grocery-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Get your groceries delivered within 2 hours</p>
          </div>

          <div className="bg-grocery-light p-6 rounded-lg flex flex-col items-center text-center">
            <div className="bg-grocery-primary/20 p-4 rounded-full mb-4">
              <svg className="w-8 h-8 text-grocery-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Fresh Products</h3>
            <p className="text-gray-600">100% fresh and high-quality products</p>
          </div>

          <div className="bg-grocery-light p-6 rounded-lg flex flex-col items-center text-center">
            <div className="bg-grocery-primary/20 p-4 rounded-full mb-4">
              <svg className="w-8 h-8 text-grocery-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">Easy Returns</h3>
            <p className="text-gray-600">Not satisfied? Return products easily</p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Shop by Category</h2>
          <Link to="/products" className="text-grocery-primary hover:underline flex items-center">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              to={`/products?category=${category.id}`}
              key={category.id}
              className="relative rounded-lg overflow-hidden h-48 group"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link to="/products" className="text-grocery-primary hover:underline flex items-center">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product) => (
            <Link to={`/products/${product.id}`} key={product.id} className="block h-full">
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>

      {/* Special Offer Banner */}
      <div className="relative rounded-lg overflow-hidden h-64 mb-12">
        <img
          src="https://images.unsplash.com/photo-1580913428023-02c695666d61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=400&q=80"
          alt="Special Offer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center bg-black/40">
          <div className="container mx-auto px-8">
            <div className="max-w-lg">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                20% Off on Fresh Fruits
              </h2>
              <p className="text-white text-lg mb-6">
                Use code <span className="font-bold">FRESH20</span> at checkout
              </p>
              <Link to="/products?category=2">
                <Button size="lg" className="bg-grocery-secondary hover:bg-grocery-secondary/90">
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 mb-4">"The quality of products from this store is exceptional. The vegetables are always fresh, and the delivery is super quick!"</p>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
              <div>
                <h4 className="font-semibold">Sarah Johnson</h4>
                <p className="text-sm text-gray-500">Regular Customer</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 mb-4">"I love shopping here! The website is easy to navigate, and their customer service is excellent. Will definitely keep ordering!"</p>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
              <div>
                <h4 className="font-semibold">Michael Brown</h4>
                <p className="text-sm text-gray-500">Loyal Customer</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 mb-4">"The wide variety of products available and the competitive prices make this my go-to online grocery store. Highly recommended!"</p>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
              <div>
                <h4 className="font-semibold">Emily Wilson</h4>
                <p className="text-sm text-gray-500">New Customer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-grocery-primary/10 rounded-lg p-8 mb-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-6">Get the latest updates, discounts, and special offers straight to your inbox</p>
          <form className="flex flex-col md:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 rounded-lg border"
              required
            />
            <Button type="submit" className="bg-grocery-primary hover:bg-grocery-primary/90 md:w-auto">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
