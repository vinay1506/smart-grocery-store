
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'customer' | 'admin';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, isAdmin?: boolean) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string, phone: string, address: string) => Promise<boolean>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, isAdmin = false) => {
    try {
      setLoading(true);
      
      // In a real app, this would be an API call
      // For demo, we'll simulate the API call
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Admin login simulation
      if (isAdmin) {
        if (email === 'admin@grocery.com' && password === 'admin123') {
          const adminUser = {
            id: 1,
            name: 'John Doe',
            email: 'admin@grocery.com',
            role: 'admin' as const,
          };
          setUser(adminUser);
          localStorage.setItem('user', JSON.stringify(adminUser));
          toast.success('Admin login successful!');
          return true;
        } else {
          toast.error('Invalid admin credentials');
          return false;
        }
      } 
      // Customer login simulation
      else {
        if (email === 'alice@gmail.com' && password === 'pass123') {
          const customerUser = {
            id: 1,
            name: 'Alice Brown',
            email: 'alice@gmail.com',
            role: 'customer' as const,
          };
          setUser(customerUser);
          localStorage.setItem('user', JSON.stringify(customerUser));
          toast.success('Login successful!');
          return true;
        } else {
          toast.error('Invalid credentials');
          return false;
        }
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, phone: string, address: string) => {
    try {
      setLoading(true);
      
      // In a real app, this would be an API call
      // For demo, we'll simulate the API call
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, just pretend registration was successful
      toast.success('Registration successful! Please log in.');
      return true;
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
