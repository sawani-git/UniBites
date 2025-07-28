import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { 
  Utensils, 
  ShoppingCart, 
  Calendar, 
  PieChart, 
  User, 
  ArrowRight, 
  Flame, 
  Wallet, 
  Clock, 
  Star 
} from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { meals, orders, budgetTransactions } = useData();

  // Dummy data for demonstration
  const recentActivity = [
    { id: 1, type: 'meal', description: 'Purchased Chicken Stir-fry', amount: 7.50, date: '2023-10-26' },
    { id: 2, type: 'plan', description: 'Added Pasta to Meal Plan', date: '2023-10-25' },
    { id: 3, type: 'budget', description: 'Budget updated', amount: 150.00, date: '2023-10-24' },
  ];

  const quickLinks = [
    { name: 'View Canteen Menu', icon: Utensils, link: '/menu' },
    { name: 'Plan Your Meals', icon: Calendar, link: '/planner' },
    { name: 'Track Your Budget', icon: PieChart, link: '/budget' },
    { name: 'Update Profile', icon: User, link: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="flex justify-end mb-4">
        <button
          onClick={logout}
          className="px-4 py-2 rounded-xl text-sm font-medium bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-200"
        >
          Sign Out
        </button>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome, {user?.name || 'Guest'}!</h1>
      <p className="text-lg text-gray-600 mb-8">Your personalized UniBites dashboard.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Quick Stats */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center space-x-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <Flame className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Calories Today</p>
              <p className="text-2xl font-bold text-gray-900">1800 <span className="text-base font-normal">kcal</span></p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Wallet className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Budget Remaining</p>
              <p className="text-2xl font-bold text-gray-900">${user?.budget?.toFixed(2) || '0.00'}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Clock className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Meals Planned</p>
              <p className="text-2xl font-bold text-gray-900">{orders.length} <span className="text-base font-normal">this week</span></p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <ul className="space-y-3">
            {recentActivity.map(activity => (
              <li key={activity.id} className="flex items-center justify-between text-gray-700">
                <div className="flex items-center space-x-3">
                  {activity.type === 'meal' && <ShoppingCart className="w-5 h-5 text-orange-500" />}
                  {activity.type === 'plan' && <Calendar className="w-5 h-5 text-blue-500" />}
                  {activity.type === 'budget' && <PieChart className="w-5 h-5 text-green-500" />}
                  <span>{activity.description}</span>
                </div>
                <span className="text-sm text-gray-500">{activity.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {quickLinks.map(link => {
            const Icon = link.icon;
            return (
              <a 
                key={link.name} 
                href={link.link} 
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-200 hover:border-orange-400 hover:shadow-md transition-all duration-200 group"
              >
                <Icon className="w-8 h-8 text-gray-600 group-hover:text-orange-500 mb-2" />
                <span className="text-sm font-medium text-gray-700 text-center group-hover:text-orange-600">{link.name}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Personalized Recommendations (Placeholder) */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Personalized Recommendations</h2>
        <div className="flex items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-xl text-gray-500">
          <Star className="w-6 h-6 mr-2" />
          <span>Recommendations coming soon!</span>
        </div>
      </div>
    </div>
  );
}
