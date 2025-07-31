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
    // BREAKFAST
    {
      id: '1',
      name: 'Kiribath (Milk Rice)',
      price: 3.00,
      category: 'Breakfast',
      description: 'Traditional Sri Lankan milk rice served with lunu miris (spicy onion sambol).',
      canteen: 'Main Hall',
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Kiribath_with_Lunu_Miris.jpg',
      available: true,
      rating: 4.8,
      reviews: 210,
      dietary: ['vegetarian', 'gluten-free'],
      nutrition: { calories: 320, protein: 6, carbs: 60, fat: 8 }
    },
    {
      id: '2',
      name: 'Pol Roti & Katta Sambol',
      price: 2.50,
      category: 'Breakfast',
      description: 'Coconut flatbread served with spicy katta sambol.',
      canteen: 'Main Hall',
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Pol_roti_with_katta_sambol.jpg',
      available: true,
      rating: 4.6,
      reviews: 150,
      dietary: ['vegetarian'],
      nutrition: { calories: 250, protein: 5, carbs: 40, fat: 10 }
    },
    {
      id: '3',
      name: 'String Hoppers (Indi Appa)',
      price: 3.50,
      category: 'Breakfast',
      description: 'Steamed rice flour noodles served with dhal curry and coconut sambol.',
      canteen: 'Main Hall',
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/String_hoppers_with_curry.jpg',
      available: true,
      rating: 4.7,
      reviews: 180,
      dietary: ['vegan', 'gluten-free'],
      nutrition: { calories: 280, protein: 7, carbs: 55, fat: 4 }
    },
    // LUNCH
    {
      id: '4',
      name: 'Rice & Curry',
      price: 4.00,
      category: 'Lunch',
      description: 'Steamed rice with a selection of vegetable curries, chicken, and papadam.',
      canteen: 'Lunch Hall',
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Rice_and_curry_Sri_Lanka.jpg',
      available: true,
      rating: 4.9,
      reviews: 300,
      dietary: [],
      nutrition: { calories: 600, protein: 18, carbs: 90, fat: 15 }
    },
    {
      id: '5',
      name: 'Parippu (Dhal Curry)',
      price: 2.00,
      category: 'Lunch',
      description: 'Classic Sri Lankan dhal curry, perfect with rice or roti.',
      canteen: 'Lunch Hall',
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Parippu_%28Dhal_curry%29.jpg',
      available: true,
      rating: 4.5,
      reviews: 120,
      dietary: ['vegan', 'gluten-free'],
      nutrition: { calories: 120, protein: 6, carbs: 20, fat: 2 }
    },
    {
      id: '6',
      name: 'Fish Ambul Thiyal',
      price: 5.00,
      category: 'Lunch',
      description: 'Sour fish curry, a signature dish from southern Sri Lanka.',
      canteen: 'Lunch Hall',
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Fish_ambul_thiyal.jpg',
      available: true,
      rating: 4.7,
      reviews: 140,
      dietary: ['gluten-free'],
      nutrition: { calories: 220, protein: 22, carbs: 3, fat: 12 }
    },
    // DINNER
    {
      id: '7',
      name: 'Hoppers (Appa)',
      price: 2.50,
      category: 'Dinner',
      description: 'Bowl-shaped pancakes made from fermented rice flour, served with lunu miris.',
      canteen: 'Dinner Hall',
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Hoppers_%28appa%29.jpg',
      available: true,
      rating: 4.8,
      reviews: 170,
      dietary: ['vegan', 'gluten-free'],
      nutrition: { calories: 180, protein: 4, carbs: 36, fat: 2 }
    },
    {
      id: '8',
      name: 'Pittu',
      price: 3.00,
      category: 'Dinner',
      description: 'Steamed cylinders of rice flour and coconut, served with coconut milk and curry.',
      canteen: 'Dinner Hall',
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Pittu_with_curry.jpg',
      available: true,
      rating: 4.6,
      reviews: 110,
      dietary: ['vegan', 'gluten-free'],
      nutrition: { calories: 210, protein: 5, carbs: 40, fat: 6 }
    },
    {
      id: '9',
      name: 'Kottu Roti',
      price: 4.50,
      category: 'Dinner',
      description: 'Chopped flatbread stir-fried with vegetables, egg, and your choice of meat.',
      canteen: 'Dinner Hall',
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Kottu_roti_Sri_Lanka.jpg',
      available: true,
      rating: 4.9,
      reviews: 250,
      dietary: [],
      nutrition: { calories: 500, protein: 15, carbs: 70, fat: 18 }
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
