import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[600px] rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618160702438-9b02ab6515c9')] bg-cover bg-center" />
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Fresh Groceries Delivered to Your Doorstep
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Shop from a wide selection of fresh fruits, vegetables, dairy products, and more.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center px-6 py-3 bg-grocery-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Shop Now
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section>
        <h2 className="text-3xl font-bold text-grocery-dark mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Fruits', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf' },
            { name: 'Vegetables', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655' },
            { name: 'Dairy', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150' },
            { name: 'Bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff' },
          ].map((category) => (
            <Link
              key={category.name}
              to={`/products?category=${category.name.toLowerCase()}`}
              className="group relative h-48 rounded-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl font-semibold text-white">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6 bg-white rounded-xl shadow-grocery">
          <div className="w-12 h-12 bg-grocery-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-grocery-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-grocery-dark mb-2">Fresh Products</h3>
          <p className="text-gray-600">We source only the freshest products from local farmers and trusted suppliers.</p>
        </div>
        <div className="text-center p-6 bg-white rounded-xl shadow-grocery">
          <div className="w-12 h-12 bg-grocery-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-grocery-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-grocery-dark mb-2">Fast Delivery</h3>
          <p className="text-gray-600">Get your groceries delivered to your doorstep within hours of ordering.</p>
        </div>
        <div className="text-center p-6 bg-white rounded-xl shadow-grocery">
          <div className="w-12 h-12 bg-grocery-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-grocery-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-grocery-dark mb-2">Easy Returns</h3>
          <p className="text-gray-600">Not satisfied with your purchase? We offer hassle-free returns within 7 days.</p>
        </div>
      </section>
    </div>
  );
};

export default Home; 