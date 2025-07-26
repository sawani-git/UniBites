import React, { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { DataProvider } from './context/DataContext'
import Profile from './pages/Profile'
import CanteenMenu from './pages/CanteenMenue'
import { User, ShoppingCart, Home, UserIcon } from 'lucide-react'

function AppContent() {
  const [currentPage, setCurrentPage] = useState('menu')
  const { login } = useAuth()

  useEffect(() => {
    // Auto-login with sample user
    login({
      id: '1',
      name: 'John Doe',
      email: 'john.doe@university.edu',
      budget: 50,
      university: 'Sample University',
      dietaryPreferences: ['vegetarian']
    })
  }, [login])

  const renderPage = () => {
    switch (currentPage) {
      case 'profile':
        return <Profile />
      case 'menu':
        return <CanteenMenu />
      default:
        return <CanteenMenu />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-orange-600">UniBites</h1>
            </div>
            <div className="flex space-x-8">
              <button
                onClick={() => setCurrentPage('menu')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'menu'
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Menu</span>
              </button>
              <button
                onClick={() => setCurrentPage('profile')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'profile'
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <UserIcon className="w-4 h-4" />
                <span>Profile</span>
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
