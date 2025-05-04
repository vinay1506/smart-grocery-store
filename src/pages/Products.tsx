import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Filter, Plus } from 'lucide-react';
import { getProducts, getCategories, Product, Category } from '../api/products';
import { useCart } from '../contexts/CartContext';

const Products = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const { addToCart } = useCart();

  const fetchData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        getProducts(selectedCategory === 'all' ? undefined : selectedCategory, searchTerm),
        getCategories()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCategory, searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({
      ...Object.fromEntries(searchParams),
      search: searchTerm,
      category: selectedCategory
    });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchParams({
      ...Object.fromEntries(searchParams),
      category,
      search: searchTerm
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-grocery-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-xl shadow-grocery">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-grocery-dark">Products</h2>
          <button
            onClick={() => navigate('/add-product')}
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="input"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.product_id} className="card">
            <div className="relative h-48">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-grocery-primary text-white text-xs font-semibold px-2 py-1 rounded">
                {product.categoryName}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-grocery-dark mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-grocery-primary">
                  ${product.price.toFixed(2)}
                </span>
                <button
                  onClick={() => addToCart({
                    id: product.product_id,
                    name: product.name,
                    price: product.price,
                    image: product.image_url
                  })}
                  className="btn btn-primary"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-grocery-dark mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Products; 