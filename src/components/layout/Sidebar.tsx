
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  MessageSquare, 
  Search, 
  Bot, 
  Settings, 
  LogOut,
  Menu,
  X
} from "lucide-react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div 
      className={`h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        {!collapsed && (
          <h1 className="text-xl font-bold">X Automation</h1>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>
      
      <nav className="flex-1 p-2 space-y-1">
        <SidebarItem 
          to="/app" 
          icon={<Users size={20} />} 
          label="Cuentas" 
          collapsed={collapsed} 
        />
        <SidebarItem 
          to="/app?tab=messages" 
          icon={<MessageSquare size={20} />} 
          label="Mensajes" 
          collapsed={collapsed} 
        />
        <SidebarItem 
          to="/app?tab=scraper" 
          icon={<Search size={20} />} 
          label="Scraper" 
          collapsed={collapsed} 
        />
        <SidebarItem 
          to="/app?tab=bots" 
          icon={<Bot size={20} />} 
          label="Chatbots" 
          collapsed={collapsed} 
        />
      </nav>
      
      <div className="p-2 border-t border-sidebar-border space-y-1">
        <SidebarItem 
          to="/settings" 
          icon={<Settings size={20} />} 
          label="Configuración" 
          collapsed={collapsed} 
        />
        <SidebarItem 
          to="/" 
          icon={<LogOut size={20} />} 
          label="Salir" 
          collapsed={collapsed} 
        />
      </div>
    </div>
  );
};

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}

const SidebarItem = ({ to, icon, label, collapsed }: SidebarItemProps) => {
  return (
    <Link to={to}>
      <Button
        variant="ghost"
        className={`w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
          collapsed ? "px-3" : "px-4"
        }`}
      >
        <span className="mr-2">{icon}</span>
        {!collapsed && <span>{label}</span>}
      </Button>
    </Link>
  );
};

export default Sidebar;
