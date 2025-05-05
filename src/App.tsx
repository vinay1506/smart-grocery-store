import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmation from './pages/OrderConfirmation';
import AddProduct from './pages/AddProduct';
import OrderHistory from './pages/OrderHistory';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-grocery-light">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/orders" element={<OrderHistory />} />
            </Routes>
          </main>
          <footer className="bg-white py-8 mt-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-grocery-dark mb-4">About Us</h3>
                  <p className="text-gray-600">
                    Your one-stop shop for fresh groceries and household essentials.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-grocery-dark mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li><a href="/products" className="text-gray-600 hover:text-grocery-primary">Products</a></li>
                    <li><a href="/categories" className="text-gray-600 hover:text-grocery-primary">Categories</a></li>
                    <li><a href="/about" className="text-gray-600 hover:text-grocery-primary">About</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-grocery-dark mb-4">Contact Us</h3>
                  <ul className="space-y-2">
                    <li className="text-gray-600">Email: info@grocerystore.com</li>
                    <li className="text-gray-600">Phone: (123) 456-7890</li>
                    <li className="text-gray-600">Address: 123 Grocery St, City</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
                <p>&copy; 2024 GroceryStore. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
