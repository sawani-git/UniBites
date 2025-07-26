import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData, BudgetTransaction } from '../context/DataContext';

interface Recommendation {
  type: 'alert' | 'warning' | 'info';
  message: string;
  action: string;
}
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  PieChart,
  AlertCircle,
  Target,
  Receipt,
  Wallet
} from 'lucide-react';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isAfter, isBefore, isEqual } from 'date-fns';

export default function BudgetTracker() {
  const { user, updateProfile } = useAuth();
  const { orders, meals } = useData();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month'>('week');
  const [newBudget, setNewBudget] = useState(user?.budget || 50);
  const [showBudgetModal, setShowBudgetModal] = useState(false);

  const getCurrentPeriodOrders = () => {
    const now = new Date();
    const periodStart = selectedPeriod === 'week' ? startOfWeek(now) : startOfMonth(now);
    const periodEnd = selectedPeriod === 'week' ? endOfWeek(now) : endOfMonth(now);
    
    return orders.filter(order => {
      if (!order.orderTime) return false;
      const orderDate = new Date(order.orderTime!);
      return (isAfter(orderDate, periodStart) || isEqual(orderDate, periodStart)) &&
             (isBefore(orderDate, periodEnd) || isEqual(orderDate, periodEnd));
    });
  };

  const periodOrders = getCurrentPeriodOrders();
  const totalSpent = periodOrders.reduce((sum, order) => sum + order.price, 0);
  const budgetLimit = user?.budget || 50;
  const remainingBudget = budgetLimit - totalSpent;
  const budgetPercentage = (totalSpent / budgetLimit) * 100;

  const getSpendingByCategory = () => {
    const categorySpending: { [key: string]: number } = {};
    
    periodOrders.forEach(order => {
      const meal = meals.find(m => m.id === order.mealId);
      if (meal) {
        const category = meal.category;
        categorySpending[category] = (categorySpending[category] || 0) + order.price;
      }
    });
    
    return Object.entries(categorySpending)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);
  };

  const getSpendingByCanteen = () => {
    const canteenSpending: { [key: string]: number } = {};
    
    periodOrders.forEach(order => {
      const meal = meals.find(m => m.id === (order.mealId || order.id));
      if (meal && meal.canteen) {
        const canteen = meal.canteen;
        canteenSpending[canteen] = (canteenSpending[canteen] || 0) + order.price;
      }
    });
    
    return Object.entries(canteenSpending)
      .map(([canteen, amount]) => ({ canteen, amount }))
      .sort((a, b) => b.amount - a.amount);
  };

  const getDailySpending = () => {
    const dailySpending: { [key: string]: number } = {};
    
    periodOrders.forEach(order => {
      if (order.orderTime) {
        const day = format(new Date(order.orderTime!), 'MMM dd');
        dailySpending[day] = (dailySpending[day] || 0) + order.price;
      }
    });
    
    return dailySpending;
  };

  const getRecommendations = (): Recommendation[] => {
    const recommendations: Recommendation[] = [];
    
    if (budgetPercentage > 80) {
      recommendations.push({
        type: 'warning',
        message: 'You\'ve used 80% of your budget. Consider choosing more affordable options.',
        action: 'View budget-friendly meals'
      });
    }
    
    if (budgetPercentage > 100) {
      recommendations.push({
        type: 'alert',
        message: 'You\'ve exceeded your budget! Time to be more mindful of spending.',
        action: 'Set a stricter budget'
      });
    }
    
    const categorySpending = getSpendingByCategory();
    if (categorySpending.length > 0 && categorySpending[0].amount > budgetLimit * 0.5) {
      recommendations.push({
        type: 'info',
        message: `You're spending a lot on ${categorySpending[0].category}. Try diversifying your meals.`,
        action: 'Explore other categories'
      });
    }
    
    return recommendations;
  };

  const updateBudget = () => {
    updateProfile({ budget: newBudget });
    setShowBudgetModal(false);
  };

  const categorySpending = getSpendingByCategory();
  const canteenSpending = getSpendingByCanteen();
  const dailySpending = getDailySpending();
  const recommendations = getRecommendations();

  return (
    <div className="space-y-6 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Budget Tracker</h1>
          <p className="text-gray-600 mt-1">Monitor your spending and stay within budget</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setSelectedPeriod('week')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedPeriod === 'week' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setSelectedPeriod('month')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedPeriod === 'month' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              This Month
            </button>
          </div>
          <button
            onClick={() => setShowBudgetModal(true)}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors"
          >
            Set Budget
          </button>
        </div>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">${totalSpent.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Receipt className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            {budgetPercentage > 100 ? (
              <>
                <TrendingUp className="w-4 h-4 text-red-500 mr-1" />
                <span className="text-red-600 font-medium">Over budget</span>
              </>
            ) : (
              <>
                <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600 font-medium">Within budget</span>
              </>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Budget Limit</p>
              <p className="text-2xl font-bold text-gray-900">${budgetLimit}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Used: {budgetPercentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div 
                className={`h-2 rounded-full ${
                  budgetPercentage > 100 ? 'bg-red-600' : 
                  budgetPercentage > 80 ? 'bg-yellow-600' : 'bg-green-600'
                }`}
                style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Remaining</p>
              <p className={`text-2xl font-bold ${remainingBudget >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
                ${Math.abs(remainingBudget).toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <DollarSign className="w-4 h-4 text-gray-400 mr-1" />
            <span className="text-gray-600">
              {remainingBudget >= 0 ? 'Available to spend' : 'Over budget'}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Orders</p>
              <p className="text-2xl font-bold text-gray-900">{periodOrders.length}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">
              Avg: ${periodOrders.length > 0 ? (totalSpent / periodOrders.length).toFixed(2) : '0.00'} per order
            </span>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${
                rec.type === 'alert' ? 'bg-red-50 border-red-400' :
                rec.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                'bg-blue-50 border-blue-400'
              }`}>
                <div className="flex items-start space-x-3">
                  <AlertCircle className={`w-5 h-5 mt-0.5 ${
                    rec.type === 'alert' ? 'text-red-500' :
                    rec.type === 'warning' ? 'text-yellow-500' :
                    'text-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{rec.message}</p>
                    <button className={`text-sm font-medium mt-1 ${
                      rec.type === 'alert' ? 'text-red-600 hover:text-red-700' :
                      rec.type === 'warning' ? 'text-yellow-600 hover:text-yellow-700' :
                      'text-blue-600 hover:text-blue-700'
                    }`}>
                      {rec.action} →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Spending Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Spending by Category</h3>
          <div className="space-y-4">
            {categorySpending.map((item, index) => (
              <div key={item.category}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{item.category}</span>
                  <span className="text-sm text-gray-600">${item.amount.toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-600 h-2 rounded-full"
                    style={{ width: `${(item.amount / totalSpent) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Spending by Canteen</h3>
          <div className="space-y-4">
            {canteenSpending.map((item, index) => (
              <div key={item.canteen}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{item.canteen}</span>
                  <span className="text-sm text-gray-600">${item.amount.toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(item.amount / totalSpent) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Transactions</h3>
        <div className="space-y-4">
          {periodOrders.slice(0, 10).map(order => {
            const meal = meals.find(m => m.id === order.mealId);
            return (
              <div key={order.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Receipt className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{order.mealName || order.name}</p>
                  <p className="text-sm text-gray-500">
                    {order.orderTime ? format(new Date(order.orderTime), 'MMM dd, yyyy • h:mm a') : 'No date'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${order.price.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">Qty: {order.quantity}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Budget Modal */}
      {showBudgetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Set Your Budget</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {selectedPeriod === 'week' ? 'Weekly' : 'Monthly'} Budget
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="number"
                    value={newBudget}
                    onChange={(e) => setNewBudget(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter budget amount"
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowBudgetModal(false)}
                  className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={updateBudget}
                  className="flex-1 bg-orange-600 text-white py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                >
                  Save Budget
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}