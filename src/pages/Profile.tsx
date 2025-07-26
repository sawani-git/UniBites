import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { 
  User, 
  Mail, 
  MapPin, 
  Settings, 
  Bell, 
  Shield, 
  CreditCard,
  Star,
  Award,
  Calendar,
  TrendingUp,
  Edit3,
  Save,
  X
} from 'lucide-react';

export default function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const { orders } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    university: user?.university || '',
    budget: user?.budget || 50,
    dietaryPreferences: user?.dietaryPreferences || []
  });

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    budgetAlerts: true,
    mealReminders: true
  });

  const dietaryOptions = [
    'vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free', 'low-carb', 'high-protein'
  ];

  const handleSaveProfile = () => {
    updateProfile(editForm);
    setIsEditing(false);
  };

  const handleDietaryChange = (dietary: string) => {
    setEditForm(prev => ({
      ...prev,
      dietaryPreferences: prev.dietaryPreferences.includes(dietary)
        ? prev.dietaryPreferences.filter(d => d !== dietary)
        : [...prev.dietaryPreferences, dietary]
    }));
  };

  const getProfileStats = () => {
    const totalOrders = orders.length;
    const totalSpent = orders.reduce((sum, order) => sum + order.price, 0);
    const favoriteCanteen = orders.reduce((acc, order) => {
      // This would need meal data to determine canteen
      return acc;
    }, 'Central Canteen');
    
    return { totalOrders, totalSpent, favoriteCanteen };
  };

  const { totalOrders, totalSpent, favoriteCanteen } = getProfileStats();

  return (
    <div className="space-y-6 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account and preferences</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center space-x-2"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
              {isEditing && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="p-2 text-green-600 hover:text-green-700"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className="text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-orange-200 focus:border-orange-500 outline-none"
                    />
                  ) : (
                    <h3 className="text-2xl font-bold text-gray-900">{user?.name}</h3>
                  )}
                  <p className="text-gray-600">University Student</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{user?.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    University
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.university}
                      onChange={(e) => setEditForm(prev => ({ ...prev, university: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{user?.university}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Weekly Budget
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editForm.budget}
                      onChange={(e) => setEditForm(prev => ({ ...prev, budget: Number(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">${user?.budget}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Dietary Preferences */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dietary Preferences</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {dietaryOptions.map(option => (
                <label key={option} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editForm.dietaryPreferences.includes(option)}
                    onChange={() => handleDietaryChange(option)}
                    disabled={!isEditing}
                    className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700 capitalize">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h3>
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setNotifications(prev => ({ ...prev, [key]: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats and Activity */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900">Total Orders</span>
                </div>
                <span className="text-lg font-bold text-blue-600">{totalOrders}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-900">Total Spent</span>
                </div>
                <span className="text-lg font-bold text-green-600">${totalSpent.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium text-gray-900">Favorite Canteen</span>
                </div>
                <span className="text-sm font-bold text-orange-600">{favoriteCanteen}</span>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <Award className="w-6 h-6 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">First Order</p>
                  <p className="text-xs text-gray-600">Welcome to UniBites!</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <Star className="w-6 h-6 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Budget Master</p>
                  <p className="text-xs text-gray-600">Stayed within budget for a week</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Health Conscious</p>
                  <p className="text-xs text-gray-600">5 healthy meals in a row</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-700">Account Settings</span>
              </button>

              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <Shield className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-700">Privacy & Security</span>
              </button>

              <button 
                onClick={logout}
                className="w-full flex items-center space-x-3 p-3 text-left hover:bg-red-50 rounded-lg transition-colors text-red-600"
              >
                <span className="text-sm">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}