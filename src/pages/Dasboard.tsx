import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Logo, FloatingFoodElements } from '../components/Logo';
import { 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Star,
  ArrowRight,
  Utensils,
  MapPin,
  ChefHat,
  Sparkles,
  Heart,
  Zap
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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-8 pt-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-2xl p-8 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        
        {/* Floating Logo Elements */}
        <div className="absolute top-6 left-6 opacity-40">
          <Logo size="lg" variant="white" animated={false} showText={true} />
        </div>
        
        {/* Floating Food Elements */}
        <FloatingFoodElements />
        
        <div className="relative z-10 flex items-center justify-between pt-20">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="relative">
                <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
              <h1 className="text-4xl font-bold">
                {getGreeting()}, {user?.name.split(' ')[0]}!
              </h1>
            </div>
            <p className="text-xl opacity-90 mb-6">Ready to discover delicious meals?</p>
            <div className="flex space-x-4">
              <button className="bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Explore Menu 🍽️
              </button>
              <button className="bg-white bg-opacity-20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-opacity-30 transition-all duration-300 backdrop-blur-sm transform hover:scale-105">
                Plan Meals 📅
              </button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="text-center bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-4xl mb-2">📅</div>
              <p className="text-lg opacity-80">Today</p>
              <p className="text-2xl font-bold">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 opacity-15">
          <ChefHat className="w-32 h-32" />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Orders</p>
              <p className="text-3xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{todayOrders.length}</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <Utensils className="w-7 h-7 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">+12%</span>
            <span className="text-gray-500 ml-1">vs yesterday</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Weekly Budget</p>
              <p className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">${user?.budget}</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <DollarSign className="w-7 h-7 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Spent: ${weeklySpent.toFixed(2)}</span>
              <span className="text-gray-500 font-semibold">{((weeklySpent / (user?.budget || 1)) * 100).toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300" 
                style={{ width: `${Math.min((weeklySpent / (user?.budget || 1)) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Meal Streak</p>
              <p className="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">5 days</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <Calendar className="w-7 h-7 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Star className="w-4 h-4 text-yellow-500 mr-1 animate-pulse" />
            <span className="text-gray-600">Healthy eating streak</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Next Meal</p>
              <p className="text-3xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">Lunch</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Clock className="w-7 h-7 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <MapPin className="w-4 h-4 text-gray-400 mr-1" />
            <span className="text-gray-600">Central Canteen</span>
          </div>
        </div>
      </div>

      {/* Recent Orders & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
              <span className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-1 rounded-full">
                {orders.length}
              </span>
            </div>
            <button className="text-orange-600 hover:text-orange-700 flex items-center text-sm font-medium transition-colors">
              View all <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="space-y-4">
            {orders.slice(0, 3).map((order, index) => (
              <div key={order.id} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-orange-50 hover:to-orange-100 transition-all duration-300 cursor-pointer">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Utensils className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{order.mealName}</p>
                  <p className="text-sm text-gray-500">
                    {order.orderTime ? new Date(order.orderTime).toLocaleDateString() : 'Unknown date'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-gray-900">${order.price.toFixed(2)}</p>
                  <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                    ✓ completed
                  </span>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <div className="text-center py-8">
                <Utensils className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No recent orders</p>
                <p className="text-sm text-gray-400">Start ordering to see your history here!</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-semibold text-gray-900">Recommended for You</h2>
              <Heart className="w-5 h-5 text-pink-500" />
            </div>
            <button className="text-orange-600 hover:text-orange-700 flex items-center text-sm font-medium transition-colors">
              See more <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="space-y-4">
            {recommendedMeals.map((meal, index) => (
              <div key={meal.id} className="group flex items-center space-x-4 p-4 hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 rounded-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-orange-200">
                <div className="relative">
                  <img 
                    src={meal.image} 
                    alt={meal.name}
                    className="w-16 h-16 object-cover rounded-xl shadow-md group-hover:shadow-lg transition-shadow"
                  />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">{meal.name}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1 font-medium">{meal.rating}</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-600">{meal.canteen}</span>
                  </div>
                  <div className="flex space-x-1 mt-2">
                    {meal.dietary && meal.dietary.slice(0, 2).map(diet => (
                      <span key={diet} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                        {diet}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition-colors">${meal.price}</p>
                  <button className="mt-2 bg-orange-100 text-orange-600 px-3 py-1 rounded-lg text-xs font-medium hover:bg-orange-200 transition-colors">
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Categories */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Popular Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="group p-4 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-orange-300">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl transition-shadow">
              <span className="text-2xl">🍝</span>
            </div>
            <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">Asian</h4>
            <p className="text-sm text-gray-500">12 items</p>
          </div>
          
          <div className="group p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-green-300">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl transition-shadow">
              <span className="text-2xl">🥗</span>
            </div>
            <h4 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">Salads</h4>
            <p className="text-sm text-gray-500">8 items</p>
          </div>
          
          <div className="group p-4 rounded-xl bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-red-300">
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl transition-shadow">
              <span className="text-2xl">🍔</span>
            </div>
            <h4 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">Fast Food</h4>
            <p className="text-sm text-gray-500">15 items</p>
          </div>
          
          <div className="group p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-purple-300">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl transition-shadow">
              <span className="text-2xl">🥞</span>
            </div>
            <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">Breakfast</h4>
            <p className="text-sm text-gray-500">6 items</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 rounded-2xl p-8 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-6 h-6 text-yellow-300" />
                <h3 className="text-2xl font-bold">Quick Actions</h3>
              </div>
              <p className="text-lg opacity-90 mb-6">Get your day started right with smart meal planning</p>
              <div className="flex flex-wrap gap-3">
                <button className="bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl">
                  🍽️ Plan Today's Meals
                </button>
                <button className="bg-white bg-opacity-20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-opacity-30 transition-colors backdrop-blur-sm">
                  📱 Order Now
                </button>
                <button className="bg-white bg-opacity-20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-opacity-30 transition-colors backdrop-blur-sm">
                  💰 Track Budget
                </button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="text-center">
                <div className="text-6xl mb-2">🎯</div>
                <p className="text-lg font-semibold">Your Goals</p>
                <p className="opacity-80">Stay on track</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -top-10 -right-10 opacity-20">
          <Sparkles className="w-40 h-40" />
        </div>
      </div>
    </div>
  );
}