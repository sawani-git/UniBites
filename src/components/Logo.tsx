import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'white' | 'minimal';
  animated?: boolean;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  variant = 'default', 
  animated = false,
  showText = true 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl', 
    xl: 'text-4xl'
  };

  const iconSizeClasses = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-3xl',
    xl: 'text-5xl'
  };

  const getLogoContainerClasses = () => {
    const baseClasses = `${sizeClasses[size]} rounded-2xl flex items-center justify-center shadow-xl`;
    const animationClasses = animated ? 'transform hover:scale-110 transition-all duration-300' : '';
    
    switch (variant) {
      case 'white':
        return `${baseClasses} bg-white border-2 border-gray-200 ${animationClasses}`;
      case 'minimal':
        return `${baseClasses} bg-gray-100 ${animationClasses}`;
      default:
        return `${baseClasses} bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 ${animationClasses}`;
    }
  };

  const getTextClasses = () => {
    const baseClasses = `${textSizeClasses[size]} font-bold`;
    
    switch (variant) {
      case 'white':
        return `${baseClasses} bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-transparent`;
      case 'minimal':
        return `${baseClasses} text-gray-800`;
      default:
        return `${baseClasses} bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-transparent`;
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case 'white':
        return 'text-orange-600';
      case 'minimal':
        return 'text-gray-600';
      default:
        return 'text-white';
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        {/* Main logo container */}
        <div className={getLogoContainerClasses()}>
          <div className="relative">
            {/* Main icon */}
            <span className={`${iconSizeClasses[size]} ${getIconColor()}`}>🍽️</span>
            {/* Accent dot */}
            {size !== 'sm' && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white"></div>
            )}
          </div>
        </div>
        
        {/* Floating decorative elements */}
        {animated && size !== 'sm' && (
          <>
            <div className="absolute -top-1 -left-1 w-4 h-4 bg-gradient-to-br from-green-400 to-green-500 rounded-full opacity-80 animate-pulse"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full opacity-70"></div>
          </>
        )}
      </div>
      
      {/* Text */}
      {showText && (
        <div>
          <h1 className={getTextClasses()}>
            UniBites
          </h1>
          {size !== 'sm' && (
            <div className="flex items-center space-x-1">
              <span className="text-xs text-gray-500 font-medium">Smart Campus Dining</span>
              <span className="text-xs">✨</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Animated loading logo
export const LoadingLogo: React.FC<{ onSkip?: () => void }> = ({ onSkip }) => {
  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 cursor-pointer"
      onClick={onSkip}
    >
      <div className="relative">
        {/* Main logo with pulse animation */}
        <div className="w-32 h-32 bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse hover:scale-110 transition-transform">
          <span className="text-6xl text-white">🍽️</span>
        </div>
        
        {/* Orbiting elements */}
        <div className="absolute inset-0 animate-spin" style={{ animation: 'spin 4s linear infinite' }}>
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-yellow-400 rounded-full"></div>
          <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-4 h-4 bg-green-400 rounded-full"></div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-blue-400 rounded-full"></div>
          <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-3 h-3 bg-purple-400 rounded-full"></div>
        </div>
      </div>
      
      {/* Text */}
      <div className="mt-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-transparent mb-2">
          UniBites
        </h1>
        <p className="text-gray-600 font-medium">Smart Campus Dining</p>
        <div className="mt-4 flex space-x-1 justify-center">
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        
        {/* Skip text */}
        <p className="text-gray-400 text-sm mt-6 opacity-80 hover:opacity-100 transition-opacity">
          Click anywhere to continue →
        </p>
      </div>
    </div>
  );
};

// Floating food elements for backgrounds
export const FloatingFoodElements: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-10 left-10 text-4xl opacity-20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>🍕</div>
      <div className="absolute top-20 right-20 text-3xl opacity-15 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>🍔</div>
      <div className="absolute bottom-20 left-20 text-5xl opacity-10 animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}>🥗</div>
      <div className="absolute bottom-10 right-10 text-3xl opacity-20 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}>🍜</div>
      <div className="absolute top-1/2 left-5 text-2xl opacity-15 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '4.5s' }}>🥙</div>
      <div className="absolute top-1/3 right-5 text-4xl opacity-10 animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '6s' }}>🍰</div>
    </div>
  );
};

export default Logo;
