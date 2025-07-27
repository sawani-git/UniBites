import React, { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { DataProvider } from './context/DataContext'
import Profile from './pages/Profile'
import CanteenMenu from './pages/CanteenMenue'
import MealPlanner from './pages/MealPlanner'
import BudgetTracker from './pages/BudgetTracker'
import Dashboard from './pages/Dasboard'
import { 
  User, 
  ShoppingCart, 
  Home, 
  UserIcon, 
  Calendar, 
  PieChart, 
  Target 
} from 'lucide-react'

function AppContent() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const { login } = useAuth()

  useEffect(() => {
    // Auto-login with sample user
    login({
      id: '1',
      name: 'John Doe',
      email: 'john.doe@university.edu',
      budget: 150,
      university: 'Sample University',
      dietaryPreferences: ['vegetarian']
    })
  }, [login])

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'menu':
        return <CanteenMenu />
      case 'planner':
        return <MealPlanner />
      case 'budget':
        return <BudgetTracker />
      case 'profile':
        return <Profile />
      default:
        return <Dashboard />
    }
  }

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'menu', label: 'Menu', icon: ShoppingCart },
    { id: 'planner', label: 'Meal Planner', icon: Calendar },
    { id: 'budget', label: 'Budget', icon: PieChart },
    { id: 'profile', label: 'Profile', icon: UserIcon },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-orange-600">UniBites</h1>
              <span className="ml-2 text-sm text-gray-500">Smart Campus Dining</span>
            </div>
            <div className="flex space-x-4">
              {navigationItems.map(item => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage === item.id
                        ? 'bg-orange-100 text-orange-700'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  )
}

export default App
