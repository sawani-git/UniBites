import React from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Store, 
  Wallet, 
  User,
  TrendingUp
} from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Navigation({ currentPage, setCurrentPage }: NavigationProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'meal-planner', label: 'Meal Planner', icon: Calendar },
    { id: 'canteen-menu', label: 'Canteen Menu', icon: Store },
    { id: 'budget-tracker', label: 'Budget Tracker', icon: Wallet },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const handleNavigation = (item: typeof navItems[0]) => {
    setCurrentPage(item.id);
  };

  return (
    <nav className="fixed left-0 top-16 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-40">
      <div className="p-6">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-orange-50 text-orange-600 border-l-4 border-orange-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-orange-600' : 'text-gray-400'}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-white">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="font-medium text-sm">Weekly Savings</span>
          </div>
          <p className="text-2xl font-bold">$23.50</p>
          <p className="text-sm opacity-90">vs last week</p>
        </div>
      </div>
    </nav>
  );
}