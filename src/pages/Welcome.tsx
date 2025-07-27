import React from 'react';
import { Logo, FloatingFoodElements } from '../components/Logo';
import { 
  ChefHat, 
  Sparkles, 
  ArrowRight,
  Calendar,
  PieChart,
  Utensils,
  Star,
  Users,
  MapPin
} from 'lucide-react';

interface WelcomeProps {
  onGetStarted: () => void;
}

export default function Welcome({ onGetStarted }: WelcomeProps) {
  const features = [
    {
      icon: Utensils,
      title: "Smart Menu",
      description: "Browse meals from multiple campus canteens with real-time availability",
      color: "from-orange-400 to-orange-600"
    },
    {
      icon: Calendar,
      title: "Meal Planning",
      description: "Plan your weekly meals with nutrition tracking and budget integration",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: PieChart,
      title: "Budget Tracking",
      description: "Monitor spending with visual analytics and smart recommendations",
      color: "from-green-400 to-green-600"
    },
    {
      icon: Star,
      title: "Smart Recommendations",
      description: "Get personalized meal suggestions based on your preferences",
      color: "from-purple-400 to-purple-600"
    }
  ];

  const stats = [
    { label: "Students Served", value: "10,000+", icon: Users },
    { label: "Campus Locations", value: "5", icon: MapPin },
    { label: "Meal Categories", value: "12+", icon: ChefHat },
    { label: "Average Rating", value: "4.8★", icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 relative overflow-hidden">
      <FloatingFoodElements />
      
      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo size="lg" animated={true} showText={true} />
          <button
            onClick={onGetStarted}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-transparent">
              UniBites
            </h1>
            <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
          </div>
          
          <p className="text-2xl text-gray-700 mb-4 font-medium">
            Smart Campus Dining Platform
          </p>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your university dining experience with intelligent meal planning, 
            budget tracking, and seamless ordering from campus canteens.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Start Planning Meals</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Smart Campus Dining
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From meal planning to budget tracking, UniBites provides all the tools 
              university students need for a better dining experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">
                Ready to Transform Your Campus Dining?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of students who are already using UniBites to plan better meals and save money.
              </p>
              <button
                onClick={onGetStarted}
                className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
