import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Search, 
  Filter,
  ChefHat,
  Utensils,
  Star,
  DollarSign
} from 'lucide-react';
import { format, addDays, startOfWeek } from 'date-fns';

interface PlannedMeal {
  id: string;
  mealId: string;
  day: string;
  timeSlot: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  scheduledTime?: string;
}

export default function MealPlanner() {
  const { user } = useAuth();
  const { meals, getMealById } = useData();
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [plannedMeals, setPlannedMeals] = useState<PlannedMeal[]>([]);
  const [showMealSelector, setShowMealSelector] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{day: string; timeSlot: string} | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDietary, setFilterDietary] = useState('all');

  const weekStart = startOfWeek(selectedWeek, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const timeSlots = [
    { id: 'breakfast', label: 'Breakfast', time: '8:00 AM', icon: '🌅' },
    { id: 'lunch', label: 'Lunch', time: '12:00 PM', icon: '☀️' },
    { id: 'dinner', label: 'Dinner', time: '7:00 PM', icon: '🌙' },
    { id: 'snack', label: 'Snack', time: 'Anytime', icon: '🍎' }
  ];

  const filteredMeals = meals.filter(meal => {
    const matchesSearch = meal.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDietary = filterDietary === 'all' || 
      (filterDietary === 'vegetarian' && meal.dietary?.includes('vegetarian')) ||
      (filterDietary === 'vegan' && meal.dietary?.includes('vegan')) ||
      (filterDietary === 'gluten-free' && meal.dietary?.includes('gluten-free'));
    return matchesSearch && matchesDietary && meal.available;
  });

  const addMealToPlan = (mealId: string) => {
    if (selectedSlot) {
      const newPlannedMeal: PlannedMeal = {
        id: Date.now().toString(),
        mealId,
        day: selectedSlot.day,
        timeSlot: selectedSlot.timeSlot as any
      };
      setPlannedMeals(prev => [...prev, newPlannedMeal]);
      setShowMealSelector(false);
      setSelectedSlot(null);
    }
  };

  const getMealForSlot = (day: string, timeSlot: string) => {
    return plannedMeals.find(pm => pm.day === day && pm.timeSlot === timeSlot);
  };

  const getTotalNutrition = () => {
    const total = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    plannedMeals.forEach(pm => {
      const meal = getMealById(pm.mealId);
      if (meal && meal.nutrition) {
        total.calories += meal.nutrition!.calories;
        total.protein += meal.nutrition!.protein;
        total.carbs += meal.nutrition!.carbs;
        total.fat += meal.nutrition!.fat;
      }
    });
    return total;
  };

  const getTotalCost = () => {
    return plannedMeals.reduce((total, pm) => {
      const meal = getMealById(pm.mealId);
      return total + (meal?.price || 0);
    }, 0);
  };

  return (
    <div className="space-y-6 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meal Planner</h1>
          <p className="text-gray-600 mt-1">Plan your weekly meals and stay on budget</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSelectedWeek(addDays(selectedWeek, -7))}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Previous Week
          </button>
          <span className="font-medium text-gray-900">
            Week of {format(weekStart, 'MMM d, yyyy')}
          </span>
          <button
            onClick={() => setSelectedWeek(addDays(selectedWeek, 7))}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            Next Week →
          </button>
        </div>
      </div>

      {/* Weekly Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Utensils className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Planned Meals</p>
              <p className="text-2xl font-bold text-gray-900">{plannedMeals.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Weekly Cost</p>
              <p className="text-2xl font-bold text-gray-900">${getTotalCost().toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Calories/Day</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(getTotalNutrition().calories / 7)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Planner Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Weekly Meal Schedule</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Time</th>
                {weekDays.map(day => (
                  <th key={day.toISOString()} className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                    <div>
                      <div className="font-semibold text-gray-900">{format(day, 'EEE')}</div>
                      <div className="text-xs text-gray-500">{format(day, 'MMM d')}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {timeSlots.map(slot => (
                <tr key={slot.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{slot.icon}</span>
                      <div>
                        <div className="font-medium text-gray-900">{slot.label}</div>
                        <div className="text-sm text-gray-500">{slot.time}</div>
                      </div>
                    </div>
                  </td>
                  {weekDays.map(day => {
                    const dayKey = format(day, 'yyyy-MM-dd');
                    const plannedMeal = getMealForSlot(dayKey, slot.id);
                    const meal = plannedMeal ? getMealById(plannedMeal.mealId) : null;
                    
                    return (
                      <td key={dayKey} className="px-6 py-4 text-center">
                        {meal ? (
                          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 cursor-pointer hover:bg-orange-100 transition-colors">
                            <img 
                              src={meal.image} 
                              alt={meal.name}
                              className="w-full h-16 object-cover rounded mb-2"
                            />
                            <div className="text-sm font-medium text-gray-900">{meal.name}</div>
                            <div className="text-xs text-gray-500">${meal.price}</div>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedSlot({ day: dayKey, timeSlot: slot.id });
                              setShowMealSelector(true);
                            }}
                            className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-orange-400 hover:bg-orange-50 transition-colors group"
                          >
                            <Plus className="w-6 h-6 text-gray-400 group-hover:text-orange-500" />
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Meal Selector Modal */}
      {showMealSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Choose a Meal</h3>
                <button
                  onClick={() => setShowMealSelector(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="mt-4 flex space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search meals..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <select
                  value={filterDietary}
                  onChange={(e) => setFilterDietary(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="all">All Dietary</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="gluten-free">Gluten-Free</option>
                </select>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-96">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMeals.map(meal => (
                  <div
                    key={meal.id}
                    onClick={() => addMealToPlan(meal.id)}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer hover:border-orange-300"
                  >
                    <img 
                      src={meal.image} 
                      alt={meal.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h4 className="font-medium text-gray-900 mb-1">{meal.name}</h4>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{meal.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-orange-600">${meal.price}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{meal.rating}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {(meal.dietary || []).slice(0, 2).map(diet => (
                        <span key={diet} className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                          {diet}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Nutrition Summary */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Nutrition Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{getTotalNutrition().calories}</div>
            <div className="text-sm text-gray-600">Total Calories</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{getTotalNutrition().protein}g</div>
            <div className="text-sm text-gray-600">Protein</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{getTotalNutrition().carbs}g</div>
            <div className="text-sm text-gray-600">Carbs</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{getTotalNutrition().fat}g</div>
            <div className="text-sm text-gray-600">Fat</div>
          </div>
        </div>
      </div>
    </div>
  );
}