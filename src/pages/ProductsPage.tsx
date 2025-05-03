
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data
const categories = [
  { id: 1, name: 'Dairy' },
  { id: 2, name: 'Vegetables' },
  { id: 3, name: 'Beverages' },
];

const products = [
  {
    id: 1,
    name: 'Milk',
    price: 2.50,
    categoryId: 1, 
    stock: 100,
    description: 'Fresh milk',
    image: 'https://images.unsplash.com/photo-1635174241296-82d5762cd93e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG1pbGt8ZW58MHx8MHx8&auto=format&fit=crop&w=300&h=300&q=80',
  },
  {
    id: 2,
    name: 'Apple',
    price: 1.20,
    categoryId: 2,
    stock: 200,
    description: 'Red apples',
    image: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=300&h=300&q=80',
  },
  {
    id: 3,
    name: 'Orange Juice',
    price: 3.99,
    categoryId: 3,
    stock: 50,
    description: 'Fresh orange juice',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8anVpY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=300&h=300&q=80',
  },
  {
    id: 4,
    name: 'Cheese',
    price: 4.50,
    categoryId: 1,
    stock: 75,
    description: 'Cheddar cheese',
    image: 'https://images.unsplash.com/photo-1589881133595-a3c085cb731d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2hlZXNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80',
  },
  {
    id: 5,
    name: 'Tomato',
    price: 1.00,
    categoryId: 2,
    stock: 150,
    description: 'Fresh tomatoes',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dG9tYXRvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80',
  },
  {
    id: 6,
    name: 'Coffee',
    price: 5.99,
    categoryId: 3,
    stock: 40,
    description: 'Ground coffee',
    image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y29mZmVlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80',
  },
  {
    id: 7,
    name: 'Yogurt',
    price: 2.75,
    categoryId: 1,
    stock: 80,
    description: 'Greek yogurt',
    image: 'https://images.unsplash.com/photo-1579954793243-3ba31251662d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8eW9ndXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80',
  },
  {
    id: 8,
    name: 'Carrot',
    price: 0.75,
    categoryId: 2,
    stock: 180,
    description: 'Fresh carrots',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2Fycm90fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&h=300&q=80',
  },
];

interface Product {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  stock: number;
  description: string;
  image: string;
}

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchQuery, setSearchQuery] = useState(searchParam || '');
  const [categoryFilter, setCategoryFilter] = useState(categoryParam || '');
  const [sortBy, setSortBy] = useState('');
  
  const { addToCart } = useCart();
  
  // Handle filtering and sorting
  useEffect(() => {
    let result = [...products];
    
    // Filter by category
    if (categoryFilter) {
      result = result.filter(product => product.categoryId === parseInt(categoryFilter));
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Sort products
    if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }
    
    setFilteredProducts(result);
  }, [categoryFilter, searchQuery, sortBy]);
  
  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (categoryFilter) {
      params.set('category', categoryFilter);
    }
    
    if (searchQuery) {
      params.set('search', searchQuery);
    }
    
    setSearchParams(params);
  }, [categoryFilter, searchQuery, setSearchParams]);
  
  // Initialize state from URL params
  useEffect(() => {
    if (categoryParam) {
      setCategoryFilter(categoryParam);
    }
    
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [categoryParam, searchParam]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The searchQuery state is already set, and the useEffect will handle filtering
  };
  
  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
  };
  
  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const getCategoryName = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
      </div>
      
      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-grow">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </form>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Category Filter */}
            <div className="w-full sm:w-40">
              <Select value={categoryFilter} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Sort By */}
            <div className="w-full sm:w-48">
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Default</SelectItem>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                  <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <h2 className="text-xl font-semibold mb-2">No products found</h2>
          <p className="text-gray-600 mb-4">Try changing your search or filter criteria</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery('');
              setCategoryFilter('');
              setSortBy('');
            }}
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden h-full">
              <div className="h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <Badge variant="outline" className="mb-2">
                  {getCategoryName(product.categoryId)}
                </Badge>
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
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
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
