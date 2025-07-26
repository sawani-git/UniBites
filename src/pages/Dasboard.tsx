import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Star,
  ArrowRight,
  Utensils,
  MapPin
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const { meals, orders } = useData();

  const todayOrders = orders.filter(order => 
    order.orderTime && new Date(order.orderTime).toDateString() === new Date().toDateString()
  );

  const weeklySpent = orders.reduce((total, order) => total + order.price, 0);
  const recommendedMeals = meals.filter(meal => 
    meal.dietary && user?.dietaryPreferences && meal.dietary.some(diet => user.dietaryPreferences!.includes(diet))
  ).slice(0, 3);

  return (
    <div className="space-y-6 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Good morning, {user?.name.split(' ')[0]}!
          </h1>
          <p className="text-gray-600 mt-1">Ready to plan your delicious day?</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Today</p>
          <p className="text-lg font-semibold text-gray-900">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'short', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Orders</p>
              <p className="text-2xl font-bold text-gray-900">{todayOrders.length}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Utensils className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">+12%</span>
            <span className="text-gray-500 ml-1">vs yesterday</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Weekly Budget</p>
              <p className="text-2xl font-bold text-gray-900">${user?.budget}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Spent: ${weeklySpent.toFixed(2)}</span>
              <span className="text-gray-500">{((weeklySpent / (user?.budget || 1)) * 100).toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${Math.min((weeklySpent / (user?.budget || 1)) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Meal Streak</p>
              <p className="text-2xl font-bold text-gray-900">5 days</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Star className="w-4 h-4 text-yellow-500 mr-1" />
            <span className="text-gray-600">Healthy eating streak</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Next Meal</p>
              <p className="text-2xl font-bold text-gray-900">Lunch</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <MapPin className="w-4 h-4 text-gray-400 mr-1" />
            <span className="text-gray-600">Central Canteen</span>
          </div>
        </div>
      </div>

      {/* Recent Orders & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
            <button className="text-orange-600 hover:text-orange-700 flex items-center text-sm font-medium">
              View all <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="space-y-4">
            {orders.slice(0, 3).map(order => (
              <div key={order.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Utensils className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{order.mealName}</p>
                  <p className="text-sm text-gray-500">
                    {order.orderTime ? new Date(order.orderTime).toLocaleDateString() : 'Unknown date'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${order.price.toFixed(2)}</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600">
                    completed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recommended for You</h2>
            <button className="text-orange-600 hover:text-orange-700 flex items-center text-sm font-medium">
              See more <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="space-y-4">
            {recommendedMeals.map(meal => (
              <div key={meal.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                <img 
                  src={meal.image} 
                  alt={meal.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{meal.name}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{meal.rating}</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-600">{meal.canteen}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${meal.price}</p>
                  <div className="flex space-x-1 mt-1">
                    {meal.dietary && meal.dietary.slice(0, 2).map(diet => (
                      <span key={diet} className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                        {diet}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">Quick Actions</h3>
            <p className="opacity-90">Get your day started right</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg font-medium transition-colors">
              Plan Today's Meals
            </button>
            <button className="bg-white text-orange-600 hover:bg-gray-100 px-4 py-2 rounded-lg font-medium transition-colors">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}