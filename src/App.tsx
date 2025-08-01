import React, { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { DataProvider } from './context/DataContext'
import Profile from './pages/Profile'
import CanteenMenu from './pages/CanteenMenue'
import MealPlanner from './pages/MealPlanner'
import BudgetTracker from './pages/BudgetTracker'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Welcome from './pages/Welcome'
import { Logo, LoadingLogo, FloatingFoodElements } from './components/Logo'
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
  const [currentPage, setCurrentPage] = useState('welcome') // 'welcome', 'login', or main pages
  const [isLoading, setIsLoading] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  // Show loading screen
  if (isLoading) {
    return <LoadingLogo onSkip={() => setIsLoading(false)} />
  }

  // Landing page flow
  if (!isAuthenticated) {
    if (currentPage === 'welcome') {
      return <Welcome onGetStarted={() => setCurrentPage('login')} />
    }
    if (currentPage === 'login') {
      return <Login onLogin={() => setCurrentPage('dashboard')} />
    }
  }

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

  // Only show navigation and main app if authenticated
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <Logo size="md" animated={true} showText={true} />
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsLoading(true)}
                className="text-xs text-gray-500 hover:text-orange-600 transition-colors px-2 py-1 rounded hover:bg-orange-50"
                title="Show logo animation"
              >
                ✨
              </button>
              {navigationItems.map(item => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      currentPage === item.id
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transform scale-105'
                        : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50 hover:scale-105'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </button>
                )
              })}
              {/* Sign Out Button */}
              <button
                onClick={() => {
                  logout();
                  setCurrentPage('welcome');
                }}
                className="ml-2 px-4 py-2 rounded-xl text-sm font-medium bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-200"
              >
                Sign Out
              </button>
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
