
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Users, Package, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

interface SidebarLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

const SidebarLink = ({ to, icon: Icon, label, active }: SidebarLinkProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors",
      active
        ? "bg-grocery-primary text-white"
        : "text-gray-600 hover:bg-gray-200"
    )}
  >
    <Icon size={20} />
    <span>{label}</span>
  </Link>
);

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const pathName = location.pathname;

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b">
        <Link to="/admin" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-grocery-primary">GroceryStore</span>
        </Link>
        <p className="text-xs text-gray-500 mt-1">Admin Dashboard</p>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        <SidebarLink
          to="/admin"
          icon={Home}
          label="Dashboard"
          active={pathName === '/admin'}
        />
        <SidebarLink
          to="/admin/products"
          icon={ShoppingBag}
          label="Products"
          active={pathName.includes('/admin/products')}
        />
        <SidebarLink
          to="/admin/orders"
          icon={Package}
          label="Orders"
          active={pathName.includes('/admin/orders')}
        />
        <SidebarLink
          to="/admin/customers"
          icon={Users}
          label="Customers"
          active={pathName.includes('/admin/customers')}
        />
        <SidebarLink
          to="/admin/settings"
          icon={Settings}
          label="Settings"
          active={pathName.includes('/admin/settings')}
        />
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg font-medium text-gray-600 hover:bg-gray-200 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
