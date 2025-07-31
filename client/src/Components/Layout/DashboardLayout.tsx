import { ThemeToggle } from "../ThemeToggle"
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  MessageSquare, 
  Bell, 
  Settings, 
  Menu,
  Search,
  Sun,
  Moon
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
  { icon: <FolderKanban size={20} />, label: 'Projects', path: '/projects' },
  { icon: <MessageSquare size={20} />, label: 'Messages', path: '/messages' },
  { icon: <Bell size={20} />, label: 'Notifications', path: '/notifications' },
  { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`}>
        <div className="flex flex-col h-full px-3 py-4 overflow-y-auto">
          <div className="mb-10 px-2">
            <h1 className="text-xl font-bold text-indigo-600">StudioSync</h1>
          </div>
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center p-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-0'} transition-margin duration-200`}>
        {/* Top Navbar */}
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="ml-4 relative">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
}