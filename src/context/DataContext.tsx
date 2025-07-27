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
      description: 'Delicious chicken rice with aromatic herbs',
      canteen: 'Central Canteen',
      image: 'https://via.placeholder.com/300x200?text=Chicken+Rice',
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
      description: 'Fresh vegetable curry with coconut milk',
      canteen: 'Garden Cafe',
      image: 'https://via.placeholder.com/300x200?text=Veggie+Curry',
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
      description: 'Crispy fish with golden fries',
      canteen: 'Quick Bites',
      image: 'https://via.placeholder.com/300x200?text=Fish+Chips',
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
      description: 'Fresh romaine lettuce with caesar dressing',
      canteen: 'Fresh Corner',
      image: 'https://via.placeholder.com/300x200?text=Caesar+Salad',
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
      description: 'Juicy beef patty with cheese and fries',
      canteen: 'Quick Bites',
      image: 'https://via.placeholder.com/300x200?text=Beef+Burger',
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
      description: 'Traditional Thai stir-fried noodles',
      canteen: 'International Kitchen',
      image: 'https://via.placeholder.com/300x200?text=Pad+Thai',
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
      description: 'Fluffy pancakes with maple syrup',
      canteen: 'Central Canteen',
      image: 'https://via.placeholder.com/300x200?text=Pancakes',
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
      description: 'Nutritious quinoa with vegetables',
      canteen: 'Garden Cafe',
      image: 'https://via.placeholder.com/300x200?text=Quinoa+Bowl',
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
      description: 'Fresh salmon and avocado sushi',
      canteen: 'International Kitchen',
      image: 'https://via.placeholder.com/300x200?text=Sushi+Roll',
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
      description: 'Traditional Greek salad with feta cheese',
      canteen: 'Fresh Corner',
      image: 'https://via.placeholder.com/300x200?text=Greek+Salad',
      available: true,
      rating: 4.2,
      reviews: 90,
      dietary: ['vegetarian', 'gluten-free'],
      nutrition: { calories: 220, protein: 10, carbs: 15, fat: 16 }
    }
  ]);
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<CartItem[]>([]);
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
