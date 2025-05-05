import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, Package } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const { cartItems, totalItems } = useCart();

  return (
    <nav className="bg-white shadow-grocery sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-grocery-primary">GroceryStore</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/products" className="nav-link">Products</Link>
            <Link to="/categories" className="nav-link">Categories</Link>
            <Link to="/about" className="nav-link">About</Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {cartItems.length > 0 && (
              <Link 
                to="/checkout" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Place Order
              </Link>
            )}
            <Link to="/orders" className="p-2 text-grocery-dark hover:text-grocery-primary transition-colors">
              <Package size={24} />
            </Link>
            <Link to="/cart" className="relative p-2 text-grocery-dark hover:text-grocery-primary transition-colors">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-grocery-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link to="/account" className="p-2 text-grocery-dark hover:text-grocery-primary transition-colors">
              <User size={24} />
            </Link>
            <Link to="/add-product" className="p-2 text-grocery-dark hover:text-grocery-primary transition-colors">
              Add Product
            </Link>
            <button className="md:hidden p-2 text-grocery-dark hover:text-grocery-primary transition-colors">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col space-y-2">
            <Link to="/" className="nav-link py-2">Home</Link>
            <Link to="/products" className="nav-link py-2">Products</Link>
            <Link to="/categories" className="nav-link py-2">Categories</Link>
            <Link to="/about" className="nav-link py-2">About</Link>
            <Link to="/orders" className="nav-link py-2">Order History</Link>
            {cartItems.length > 0 && (
              <Link 
                to="/checkout" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
              >
                Place Order
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 