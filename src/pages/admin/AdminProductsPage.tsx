
import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Search, Plus, Edit, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';

// Sample product data
const sampleProducts = [
  { id: 1, name: 'Organic Milk', category: 'Dairy', price: 3.99, stock: 45, description: 'Fresh organic milk' },
  { id: 2, name: 'Whole Wheat Bread', category: 'Bakery', price: 2.49, stock: 30, description: 'Freshly baked whole wheat bread' },
  { id: 3, name: 'Organic Eggs', category: 'Dairy', price: 4.99, stock: 24, description: 'Farm fresh organic eggs' },
  { id: 4, name: 'Apples', category: 'Fruits', price: 1.99, stock: 150, description: 'Fresh local apples' },
  { id: 5, name: 'Chicken Breast', category: 'Meat', price: 8.99, stock: 20, description: 'Boneless chicken breast' },
  { id: 6, name: 'Potato Chips', category: 'Snacks', price: 2.49, stock: 60, description: 'Crunchy potato chips' },
  { id: 7, name: 'Orange Juice', category: 'Beverages', price: 3.49, stock: 35, description: '100% pure orange juice' },
  { id: 8, name: 'Tomatoes', category: 'Vegetables', price: 2.99, stock: 80, description: 'Fresh ripe tomatoes' },
  { id: 9, name: 'Ground Coffee', category: 'Beverages', price: 9.99, stock: 25, description: 'Premium ground coffee' },
  { id: 10, name: 'Yogurt', category: 'Dairy', price: 1.49, stock: 50, description: 'Plain yogurt' },
];

// Available categories
const categories = ['Dairy', 'Bakery', 'Fruits', 'Vegetables', 'Meat', 'Snacks', 'Beverages'];

const AdminProductsPage = () => {
  const [products, setProducts] = useState(sampleProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: ''
  });
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };
  
  const handleAddProduct = () => {
    // Validation
    if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.stock) {
      toast.error('Please fill all required fields');
      return;
    }
    
    // Create new product
    const price = parseFloat(newProduct.price);
    const stock = parseInt(newProduct.stock);
    
    if (isNaN(price) || isNaN(stock)) {
      toast.error('Price and stock must be valid numbers');
      return;
    }
    
    const product = {
      id: products.length + 1,
      name: newProduct.name,
      category: newProduct.category,
      price: price,
      stock: stock,
      description: newProduct.description
    };
    
    setProducts([...products, product]);
    toast.success('Product added successfully');
    
    // Reset form and close dialog
    setNewProduct({
      name: '',
      category: '',
      price: '',
      stock: '',
      description: ''
    });
    setIsAddDialogOpen(false);
  };
  
  const handleDeleteProduct = () => {
    if (productToDelete !== null) {
      setProducts(products.filter(product => product.id !== productToDelete));
      toast.success('Product deleted successfully');
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };
  
  const confirmDelete = (id: number) => {
    setProductToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  // Filter products based on search query and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-grocery-primary hover:bg-grocery-primary/90">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter product name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={newProduct.category}
                  onValueChange={(value) => setNewProduct({...newProduct, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    placeholder="0.00"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock *</Label>
                  <Input
                    id="stock"
                    placeholder="0"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter product description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                />
              </div>
              
              <div className="pt-4 flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-grocery-primary hover:bg-grocery-primary/90" onClick={handleAddProduct}>
                  Add Product
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-8"
            />
          </div>
          <div className="w-full sm:w-56">
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      {/* Products Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Products List</CardTitle>
          <CardDescription>
            Showing {filteredProducts.length} of {products.length} products
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">Loading products...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No products found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.id}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{product.category}</Badge>
                        </TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>
                          {product.stock < 10 ? (
                            <span className="text-red-500">{product.stock}</span>
                          ) : (
                            product.stock
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => confirmDelete(product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
          
          {/* Delete Confirmation Dialog */}
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p>Are you sure you want to delete this product? This action cannot be undone.</p>
                <div className="flex justify-end space-x-2 mt-6">
                  <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleDeleteProduct}>
                    Delete
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProductsPage;
