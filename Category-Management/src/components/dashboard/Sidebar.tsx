
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Settings, 
  BarChart4, 
  LogOut, 
  Menu 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  isActive: boolean;
}

const SidebarItem = ({ icon: Icon, label, path, isActive }: SidebarItemProps) => {
  return (
    <Link to={path} className="w-full">
      <div
        className={cn(
          "flex items-center gap-4 px-4 py-3 rounded-md transition-all",
          isActive 
            ? "bg-admin-purple text-white" 
            : "text-gray-300 hover:bg-sidebar-accent hover:text-white"
        )}
      >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  const sidebarItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      icon: ShoppingBag,
      label: 'Categories',
      path: '/dashboard/categories',
    },
    {
      icon: Users,
      label: 'Customers',
      path: '/dashboard/customers',
    },
    {
      icon: BarChart4,
      label: 'Reports',
      path: '/dashboard/reports',
    },
    {
      icon: Settings,
      label: 'Settings',
      path: '/dashboard/settings',
    },
  ];

  return (
    <div 
      className={cn(
        "bg-admin-dark-blue min-h-screen transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-admin-purple rounded-md flex items-center justify-center">
              <span className="font-bold text-white">CH</span>
            </div>
            <span className="font-semibold text-lg text-white">CategoryHive</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:bg-sidebar-accent"
        >
          <Menu size={20} />
        </Button>
      </div>
      
      <div className="py-6 px-3 space-y-1">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.path}
            icon={item.icon}
            label={collapsed ? '' : item.label}
            path={item.path}
            isActive={location.pathname === item.path}
          />
        ))}
      </div>
      
      <div className="absolute bottom-8 px-3 w-full">
        <Button
          variant="ghost"
          onClick={logout}
          className={cn(
            "w-full flex items-center gap-4 text-gray-300 hover:bg-sidebar-accent hover:text-white justify-start",
            collapsed && "justify-center"
          )}
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
