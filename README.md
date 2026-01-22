# Diet Planner - AI-Powered Meal Planning Website

A full-stack web application that generates personalized 7-day meal plans based on fitness goals and dietary preferences using the Edamam Meal Planner API, with PostgreSQL database integration.

## Features

- 🎯 **Goal-Based Planning**: Create meal plans for weight loss, maintenance, or gain
- 🥦 **Dietary Preferences**: Support for vegetarian, non-vegetarian, and mixed diets
- 📊 **AI-Powered Recommendations**: Powered by Edamam API for accurate meal suggestions
- 💾 **Save & Track**: Store and manage multiple meal plans
- 👤 **User Authentication**: Secure registration and login with JWT tokens
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

### Frontend
- HTML5
- CSS3 (Flexbox & Grid)
- Vanilla JavaScript
- Responsive Design

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- bcryptjs for password hashing
- Axios for API calls

### External APIs
- Edamam Meal Planner API

## Project Structure

```
diet-planner/
├── public/
│   ├── index.html           # Landing page
│   ├── dashboard.html       # User dashboard
│   ├── styles/
│   │   ├── styles.css       # Main styles
│   │   └── dashboard.css    # Dashboard styles
│   └── js/
│       ├── main.js          # Landing page logic
│       └── dashboard.js     # Dashboard logic
├── server/
│   ├── app.js              # Express app entry point
│   ├── db/
│   │   ├── pool.js         # Database connection pool
│   │   └── init.js         # Database initialization script
│   ├── middleware/
│   │   └── auth.js         # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.js         # Authentication routes
│   │   └── mealPlans.js    # Meal plan routes
│   └── services/
│       ├── userService.js      # User operations
│       ├── mealPlanService.js  # Meal plan operations
│       └── edamamService.js    # Edamam API integration
├── .env                    # Environment variables
├── package.json            # Dependencies
└── README.md              # This file
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Steps

1. **Clone/Download the project**
   ```bash
   cd diet-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup PostgreSQL Database**
   - Create a new PostgreSQL database:
     ```sql
     CREATE DATABASE diet_planner;
     ```

4. **Configure Environment Variables**
   - Edit `.env` file with your configuration:
     ```
     PORT=3000
     DB_HOST=localhost
     DB_PORT=5432
     DB_NAME=diet_planner
     DB_USER=postgres
     DB_PASSWORD=your_password
     
     EDAMAM_APP_ID=your_app_id
     EDAMAM_API_KEY=your_api_key
     
     JWT_SECRET=your_jwt_secret_key_here
     NODE_ENV=development
     ```

5. **Get Edamam API Credentials**
   - Visit [Edamam Developer](https://developer.edamam.com/)
   - Sign up and create a new application
   - Get your App ID and API Key
   - Update `.env` with your credentials

6. **Initialize Database**
   ```bash
   npm run db:init
   ```

7. **Start the Server**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

8. **Access the Application**
   - Open your browser and go to: `http://localhost:3000`

## Usage

### Landing Page
- View features and benefits
- Sign up for a new account
- Login to existing account

### Dashboard
1. **Generate Plan**
   - Enter plan name
   - Select fitness goal (lose/maintain/gain weight)
   - Choose dietary preference (veg/non-veg/both)
   - Click "Generate Plan" to get AI-powered meal suggestions
   - Save the plan to your account

2. **View Saved Plans**
   - See all your previously saved meal plans
   - Click on a plan to view details
   - Delete plans you no longer need

3. **Update Profile**
   - Add personal information (age, weight, height)
   - Update fitness goals and dietary preferences
   - These help personalize future meal plans

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  goal VARCHAR(50),
  dietary_preference VARCHAR(50),
  age INT,
  weight DECIMAL(5, 2),
  height DECIMAL(5, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Meal Plans Table
```sql
CREATE TABLE meal_plans (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  plan_name VARCHAR(255),
  goal VARCHAR(50),
  dietary_preference VARCHAR(50),
  week_start_date DATE,
  plan_data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Meal Plans
- `POST /api/meal-plans/generate` - Generate new meal plan
- `GET /api/meal-plans` - Get all user's meal plans
- `GET /api/meal-plans/:id` - Get specific meal plan
- `PUT /api/meal-plans/:id` - Update meal plan
- `DELETE /api/meal-plans/:id` - Delete meal plan

## Features Implemented

✅ User Registration & Authentication
✅ JWT-based Session Management
✅ PostgreSQL Database Integration
✅ 7-Day Meal Plan Generation
✅ Goal-based Calorie Calculation
✅ Dietary Preference Filtering
✅ Meal Plan Storage & Retrieval
✅ User Profile Management
✅ Responsive Landing Page
✅ Responsive Dashboard
✅ Meal Detail View
✅ Plan Saving & Deletion
✅ Error Handling & Validation

## Future Enhancements

- [ ] Nutritional information display
- [ ] Recipe ratings and reviews
- [ ] Grocery list generation
- [ ] Meal plan sharing with friends
- [ ] Mobile app version
- [ ] Email notifications
- [ ] Advanced filtering options
- [ ] Integration with fitness trackers

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check .env file for correct credentials
- Verify database name exists

### Edamam API Issues
- Confirm API credentials are correct
- Check rate limits on Edamam account
- Ensure internet connection is active

### Port Already in Use
- Change PORT in .env file
- Or kill process using port 3000

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please create an issue or contact the development team.

---

**Happy Meal Planning! 🥗🍎**
