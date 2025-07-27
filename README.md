# UniBites: Smart Meal Planner & Ordering System for University Students

A comprehensive web application designed to help university students plan meals, track budgets, and order food from campus canteens.

## Features

### 🏠 Smart Dashboard
- Overview of today's orders and meal plans
- Weekly budget tracking with visual progress bars
- Personalized meal recommendations based on dietary preferences
- Quick access to all major features

### 🍽️ Canteen Menu & Ordering
- Browse meals from multiple campus canteens
- Filter by category, dietary preferences, and location
- Detailed nutrition information for each meal
- Shopping cart functionality with quantity management
- Real-time availability status

### 📅 Meal Planner
- Weekly meal planning with calendar view
- Drag-and-drop meal scheduling
- Nutrition summary and cost calculation
- Integration with dietary preferences and budget constraints

### 💰 Budget Tracker
- Track spending across different time periods (week/month)
- Spending analysis by category and canteen
- Budget recommendations and alerts
- Transaction history with detailed breakdowns

### 👤 User Profile
- Manage dietary preferences (vegetarian, vegan, gluten-free)
- Set and update budget limits
- View order history and favorites

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Build Tool**: Vite
- **State Management**: React Context API

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sawani-git/UniBites.git
cd UniBites
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Application Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React Context providers
│   ├── AuthContext.tsx # User authentication and profile
│   └── DataContext.tsx # Meals, orders, and cart management
├── pages/              # Main application pages
│   ├── Dashboard.tsx   # Main dashboard
│   ├── CanteenMenue.tsx # Menu browsing and ordering
│   ├── MealPlanner.tsx # Weekly meal planning
│   ├── BudgetTracker.tsx # Budget management
│   └── Profile.tsx     # User profile settings
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## Key Features in Detail

### Smart Meal Recommendations
- Suggests meals based on dietary preferences
- Considers budget constraints
- Factors in previous order history

### Nutrition Tracking
- Displays calories, protein, carbs, and fat for each meal
- Weekly nutrition summaries
- Helps maintain healthy eating habits

### Budget Management
- Visual budget progress indicators
- Spending pattern analysis
- Alerts when approaching budget limits
- Recommendations for cost-effective choices

### Multi-Canteen Support
- Central Canteen
- Garden Cafe
- Quick Bites
- International Kitchen
- Fresh Corner

## Sample Data

The application comes pre-loaded with sample data including:
- 10 diverse meal options across different categories
- Multiple canteen locations
- Various dietary options (vegetarian, vegan, gluten-free, high-protein)
- Realistic pricing and nutrition information

## Future Enhancements

- **Real-time Integration**: Connect with actual canteen systems
- **Mobile App**: React Native version for mobile devices
- **AI Recommendations**: Machine learning-based meal suggestions
- **Social Features**: Meal sharing and reviews
- **Payment Integration**: Direct payment processing
- **QR Code Ordering**: Quick ordering via QR codes
- **Nutritionist Dashboard**: For campus health professionals

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Project Link: [https://github.com/sawani-git/UniBites](https://github.com/sawani-git/UniBites)
