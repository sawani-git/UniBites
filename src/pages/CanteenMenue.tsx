import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  MapPin, 
  ShoppingCart,
  Plus,
  Minus,
  Heart,
  Leaf,
  Zap
} from 'lucide-react';

export default function CanteenMenu() {
  const { meals, addOrder } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCanteen, setSelectedCanteen] = useState('all');
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [showToast, setShowToast] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: ''
  });

  const categories = ['all', 'Main Course', 'Vegetarian', 'Fast Food', 'Salads', 'Asian', 'Breakfast'];
  const canteens = ['all', 'Central Canteen', 'Garden Cafe', 'Quick Bites', 'International Kitchen', 'Fresh Corner'];

  const filteredMeals = meals.filter(meal => {
    const matchesSearch = meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (meal.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesCategory = selectedCategory === 'all' || meal.category === selectedCategory;
    const matchesCanteen = selectedCanteen === 'all' || meal.canteen === selectedCanteen;
    return matchesSearch && matchesCategory && matchesCanteen;
  });

  const addToCart = (mealId: string) => {
    setCart(prev => ({
      ...prev,
      [mealId]: (prev[mealId] || 0) + 1
    }));
  };

  const removeFromCart = (mealId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[mealId] > 1) {
        newCart[mealId]--;
      } else {
        delete newCart[mealId];
      }
      return newCart;
    });
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [mealId, quantity]) => {
      const meal = meals.find(m => m.id === mealId);
      return total + (meal?.price || 0) * (quantity as number);
    }, 0);
  };

  const getCartItemCount = () => {
    return Object.values(cart).reduce((total, quantity) => total + (quantity as number), 0);
  };

  const handlePlaceOrder = () => {
    Object.entries(cart).forEach(([mealId, quantity]) => {
      const meal = meals.find(m => m.id === mealId);
      if (meal) {
        addOrder(meal, quantity);
      }
    });
    setCart({});
    setShowCart(false);
    setShowCheckout(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const getDietaryIcon = (dietary: string) => {
    switch (dietary) {
      case 'vegetarian':
      case 'vegan':
        return <Leaf className="w-4 h-4 text-green-500" />;
      case 'gluten-free':
        return <Zap className="w-4 h-4 text-blue-500" />;
      case 'high-protein':
        return <span className="w-4 h-4 text-red-500 font-bold text-xs">P</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Canteen Menu</h1>
          <p className="text-gray-600 mt-1">Order your favorite meals and skip the queue</p>
        </div>
        <button
          onClick={() => setShowCart(true)}
          className="relative bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center space-x-2"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Cart</span>
          {getCartItemCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
              {getCartItemCount()}
            </span>
          )}
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for meals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">Canteen</label>
              <select
                value={selectedCanteen}
                onChange={(e) => setSelectedCanteen(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {canteens.map(canteen => (
                  <option key={canteen} value={canteen}>
                    {canteen === 'all' ? 'All Canteens' : canteen}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMeals.map(meal => (
          <div key={meal.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img 
                src={meal.image} 
                alt={meal.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 right-3">
                <button className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              {!meal.available && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Currently Unavailable
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-lg">{meal.name}</h3>
                <span className="text-xl font-bold text-orange-600">${meal.price}</span>
              </div>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{meal.description}</p>
              
              <div className="flex items-center space-x-4 mb-3">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{meal.rating}</span>
                  <span className="text-xs text-gray-400">({meal.reviews})</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{meal.canteen}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mb-4">
                {(meal.dietary || []).map(diet => (
                  <div key={diet} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full">
                    {getDietaryIcon(diet)}
                    <span className="text-xs text-gray-600">{diet}</span>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-4 gap-2 mb-4 text-center">
                <div>
                  <div className="text-sm font-medium text-gray-900">{meal.nutrition?.calories || 0}</div>
                  <div className="text-xs text-gray-500">Cal</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{meal.nutrition?.protein || 0}g</div>
                  <div className="text-xs text-gray-500">Protein</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{meal.nutrition?.carbs || 0}g</div>
                  <div className="text-xs text-gray-500">Carbs</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{meal.nutrition?.fat || 0}g</div>
                  <div className="text-xs text-gray-500">Fat</div>
                </div>
              </div>
              
              {meal.available ? (
                <div className="flex items-center justify-between">
                  {cart[meal.id] ? (
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => removeFromCart(meal.id)}
                        className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center hover:bg-orange-200 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-medium text-gray-900">{cart[meal.id]}</span>
                      <button
                        onClick={() => addToCart(meal.id)}
                        className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center hover:bg-orange-200 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(meal.id)}
                      className="flex-1 bg-orange-600 text-white py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  )}
                </div>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-300 text-gray-500 py-2 rounded-lg font-medium cursor-not-allowed"
                >
                  Unavailable
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Cart Modal */}
      {showToast && (
        <div className="fixed top-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          Order placed successfully!
        </div>
      )}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Your Cart</h3>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-96">
              {Object.keys(cart).length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(cart).map(([mealId, quantity]) => {
                    const meal = meals.find(m => m.id === mealId);
                    if (!meal) return null;
                    
                    return (
                      <div key={mealId} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                        <img 
                          src={meal.image} 
                          alt={meal.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{meal.name}</h4>
                          <p className="text-sm text-gray-600">${meal.price} each</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => removeFromCart(mealId)}
                            className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-medium text-gray-900">{quantity}</span>
                          <button
                            onClick={() => addToCart(mealId)}
                            className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            
            {Object.keys(cart).length > 0 && (
              <div className="p-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-orange-600">
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                >
                  Place Order
                </button>
              </div>
            )}
            {/* Checkout Modal */}
            {showCheckout && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full">
                  <h4 className="text-lg font-semibold mb-4">Confirm Your Order</h4>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700">Total:</span>
                      <span className="text-xl font-bold text-orange-600">${getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                      <select
                        value={paymentMethod}
                        onChange={e => setPaymentMethod(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500"
                      >
                        <option>Credit Card</option>
                        <option>PayPal</option>
                        <option>Campus Wallet</option>
                      </select>
                    </div>
                    {paymentMethod === 'Credit Card' && (
                      <div className="space-y-3 mt-4">
                        <input
                          type="text"
                          placeholder="Card Number"
                          value={cardDetails.number}
                          onChange={e => setCardDetails(cd => ({ ...cd, number: e.target.value }))}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500"
                          maxLength={19}
                        />
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={cardDetails.expiry}
                            onChange={e => setCardDetails(cd => ({ ...cd, expiry: e.target.value }))}
                            className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500"
                            maxLength={5}
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            value={cardDetails.cvv}
                            onChange={e => setCardDetails(cd => ({ ...cd, cvv: e.target.value }))}
                            className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500"
                            maxLength={4}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setShowCheckout(false)}
                      className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      className="px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700"
                    >
                      Confirm & Pay
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
