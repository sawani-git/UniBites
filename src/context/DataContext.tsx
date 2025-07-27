import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MealItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  canteen?: string;
  image?: string;
  available?: boolean;
  rating?: number;
  reviews?: number;
  dietary?: string[];
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface CartItem extends MealItem {
  quantity: number;
  total: number;
  orderTime?: string;
  mealId?: string;
  mealName?: string;
  status?: 'completed' | 'ready' | 'preparing';
}

export interface BudgetTransaction {
  type: 'income' | 'expense';
  message: string;
  action: string;
  amount?: number;
  date?: string;
}

interface DataContextType {
  meals: MealItem[];
  cart: CartItem[];
  orders: CartItem[];
  budgetTransactions: BudgetTransaction[];
  addToCart: (meal: MealItem) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  addOrder: (meal: MealItem, quantity: number) => void;
  addBudgetTransaction: (transaction: BudgetTransaction) => void;
  removeBudgetTransaction: (index: number) => void;
  getMealById: (id: string) => MealItem | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [meals] = useState<MealItem[]>([
    { 
      id: '1', 
      name: 'Chicken Rice', 
      price: 8.50, 
      category: 'Main Course',
      description: 'Delicious chicken rice with aromatic herbs and tender meat',
      canteen: 'Central Canteen',
      image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop&crop=center',
      available: true,
      rating: 4.5,
      reviews: 120,
      dietary: ['high-protein'],
      nutrition: { calories: 550, protein: 35, carbs: 45, fat: 18 }
    },
    { 
      id: '2', 
      name: 'Vegetable Curry', 
      price: 6.00, 
      category: 'Vegetarian',
      description: 'Fresh vegetable curry with coconut milk and spices',
      canteen: 'Garden Cafe',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop&crop=center',
      available: true,
      rating: 4.2,
      reviews: 85,
      dietary: ['vegetarian', 'vegan'],
      nutrition: { calories: 320, protein: 12, carbs: 45, fat: 8 }
    },
    { 
      id: '3', 
      name: 'Fish & Chips', 
      price: 12.00, 
      category: 'Main Course',
      description: 'Crispy battered fish with golden fries and tartar sauce',
      canteen: 'Quick Bites',
      image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?w=400&h=300&fit=crop&crop=center',
      available: true,
      rating: 4.0,
      reviews: 95,
      dietary: [],
      nutrition: { calories: 720, protein: 40, carbs: 55, fat: 35 }
    },
    { 
      id: '4', 
      name: 'Caesar Salad', 
      price: 7.50, 
      category: 'Salads',
      description: 'Fresh romaine lettuce with caesar dressing and croutons',
      canteen: 'Fresh Corner',
      image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400&h=300&fit=crop&crop=center',
      available: true,
      rating: 4.3,
      reviews: 65,
      dietary: ['vegetarian'],
      nutrition: { calories: 280, protein: 15, carbs: 12, fat: 22 }
    },
    { 
      id: '5', 
      name: 'Beef Burger', 
      price: 11.00, 
      category: 'Fast Food',
      description: 'Juicy beef patty with cheese, lettuce, and crispy fries',
      canteen: 'Quick Bites',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&crop=center',
      available: true,
      rating: 4.6,
      reviews: 200,
      dietary: ['high-protein'],
      nutrition: { calories: 650, protein: 30, carbs: 50, fat: 35 }
    },
    { 
      id: '6', 
      name: 'Pad Thai', 
      price: 9.50, 
      category: 'Asian',
      description: 'Traditional Thai stir-fried noodles with shrimp and peanuts',
      canteen: 'International Kitchen',
      image: 'https://images.unsplash.com/photo-1559314809-0f31657def5e?w=400&h=300&fit=crop&crop=center',
      available: true,
      rating: 4.4,
      reviews: 150,
      dietary: ['gluten-free'],
      nutrition: { calories: 420, protein: 18, carbs: 58, fat: 15 }
    },
    { 
      id: '7', 
      name: 'Pancakes', 
      price: 5.50, 
      category: 'Breakfast',
      description: 'Fluffy pancakes with maple syrup and fresh berries',
      canteen: 'Central Canteen',
      image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&h=300&fit=crop&crop=center',
      available: true,
      rating: 4.1,
      reviews: 80,
      dietary: ['vegetarian'],
      nutrition: { calories: 380, protein: 8, carbs: 65, fat: 12 }
    },
    { 
      id: '8', 
      name: 'Quinoa Bowl', 
      price: 8.00, 
      category: 'Vegetarian',
      description: 'Nutritious quinoa with roasted vegetables and tahini dressing',
      canteen: 'Garden Cafe',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&crop=center',
      available: true,
      rating: 4.7,
      reviews: 110,
      dietary: ['vegetarian', 'vegan', 'gluten-free'],
      nutrition: { calories: 350, protein: 14, carbs: 55, fat: 10 }
    },
    { 
      id: '9', 
      name: 'Sushi Roll', 
      price: 13.50, 
      category: 'Asian',
      description: 'Fresh salmon and avocado sushi with wasabi and ginger',
      canteen: 'International Kitchen',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop&crop=center',
      available: false,
      rating: 4.8,
      reviews: 180,
      dietary: ['high-protein'],
      nutrition: { calories: 320, protein: 25, carbs: 35, fat: 8 }
    },
    { 
      id: '10', 
      name: 'Greek Salad', 
      price: 6.50, 
      category: 'Salads',
      description: 'Traditional Greek salad with feta cheese and olives',
      canteen: 'Fresh Corner',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop&crop=center',
      available: true,
      rating: 4.2,
      reviews: 90,
      dietary: ['vegetarian', 'gluten-free'],
      nutrition: { calories: 220, protein: 10, carbs: 15, fat: 16 }
    },
    { 
      id: '11', 
      name: 'Chicken Wrap', 
      price: 7.00, 
      category: 'Fast Food',
      description: 'Grilled chicken wrap with fresh vegetables and sauce',
      canteen: 'Quick Bites',
      image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop&crop=center',
      available: true,
      rating: 4.3,
      reviews: 75,
      dietary: ['high-protein'],
      nutrition: { calories: 420, protein: 28, carbs: 35, fat: 15 }
    },
    { 
      id: '12', 
      name: 'Pasta Primavera', 
      price: 9.00, 
      category: 'Vegetarian',
      description: 'Fresh pasta with seasonal vegetables and herbs',
      canteen: 'International Kitchen',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop&crop=center',
      available: true,
      rating: 4.4,
      reviews: 95,
      dietary: ['vegetarian'],
      nutrition: { calories: 480, protein: 16, carbs: 68, fat: 14 }
    }
  ]);
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<CartItem[]>([
    {
      id: 'order-1',
      mealId: '1',
      name: 'Chicken Rice',
      price: 8.50,
      category: 'Main Course',
      quantity: 1,
      total: 8.50,
      mealName: 'Chicken Rice',
      orderTime: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      status: 'completed'
    },
    {
      id: 'order-2',
      mealId: '5',
      name: 'Beef Burger',
      price: 11.00,
      category: 'Fast Food',
      quantity: 1,
      total: 11.00,
      mealName: 'Beef Burger',
      orderTime: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      status: 'completed'
    },
    {
      id: 'order-3',
      mealId: '8',
      name: 'Quinoa Bowl',
      price: 8.00,
      category: 'Vegetarian',
      quantity: 1,
      total: 8.00,
      mealName: 'Quinoa Bowl',
      orderTime: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      status: 'completed'
    }
  ]);
  const [budgetTransactions, setBudgetTransactions] = useState<BudgetTransaction[]>([]);

  const addToCart = (meal: MealItem) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === meal.id);
      if (existing) {
        return prev.map(item =>
          item.id === meal.id
            ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
            : item
        );
      }
      return [...prev, { ...meal, quantity: 1, total: meal.price }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity, total: quantity * item.price }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addOrder = (meal: MealItem, quantity: number) => {
    setOrders(prev => [...prev, { 
      ...meal, 
      quantity, 
      total: meal.price * quantity, 
      orderTime: new Date().toISOString(),
      mealName: meal.name,
      status: 'completed'
    }]);
  };

  const addBudgetTransaction = (transaction: BudgetTransaction) => {
    setBudgetTransactions(prev => [...prev, transaction]);
  };

  const removeBudgetTransaction = (index: number) => {
    setBudgetTransactions(prev => prev.filter((_, i) => i !== index));
  };

  const getMealById = (id: string) => {
    return meals.find(meal => meal.id === id);
  };

  return (
    <DataContext.Provider value={{
      meals,
      cart,
      orders,
      budgetTransactions,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      addOrder,
      addBudgetTransaction,
      removeBudgetTransaction,
      getMealById
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
