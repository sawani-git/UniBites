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
      image: 'https://via.placeholder.com/300x200',
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
      image: 'https://via.placeholder.com/300x200',
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
      image: 'https://via.placeholder.com/300x200',
      available: true,
      rating: 4.0,
      reviews: 95,
      dietary: [],
      nutrition: { calories: 720, protein: 40, carbs: 55, fat: 35 }
    },
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
