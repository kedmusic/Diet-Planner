# Quick Start Guide - Diet Planner

## ⚡ Get Started in 5 Minutes

### 1. Install Node Dependencies
```bash
npm install
```

### 2. Setup PostgreSQL Database
Make sure PostgreSQL is installed and running. Then create the database:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE diet_planner;

# Exit PostgreSQL
\q
```

### 3. Configure Environment Variables

Edit the `.env` file with your settings:

```env
# Server Port
PORT=3000

# Database Connection
DB_HOST=localhost
DB_PORT=5432
DB_NAME=diet_planner
DB_USER=postgres
DB_PASSWORD=your_postgres_password

# Edamam API Credentials (Get from https://developer.edamam.com/)
EDAMAM_APP_ID=your_app_id_here
EDAMAM_API_KEY=your_api_key_here

# JWT Secret for sessions
JWT_SECRET=your_random_secret_key_here

# Environment
NODE_ENV=development
```

### 4. Get Edamam API Credentials

1. Go to https://developer.edamam.com/
2. Click "Get Started" and sign up
3. Create a new application for "Recipe Search API"
4. Copy your `Application ID` and `Application Keys`
5. Paste them in the `.env` file

### 5. Initialize Database

Run the initialization script to create all tables:

```bash
npm run db:init
```

You should see: ✓ Database initialized successfully!

### 6. Start the Server

```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will start at: http://localhost:3000

## 📱 Using the Application

### Landing Page (http://localhost:3000)
1. Browse features
2. Click "Get Started" or scroll to signup form
3. Enter your details:
   - Username
   - Email
   - Password
   - Fitness Goal (lose/maintain/gain)
   - Dietary Preference (veg/non-veg/both)
4. Click "Sign Up"

### Login
1. Click "Login here" link on signup form
2. Enter email and password
3. Click "Login"

### Dashboard (http://localhost:3000/dashboard.html)

#### Generate Meal Plan
1. Click "Generate Plan" in sidebar
2. Enter plan name (e.g., "Week 1 Plan")
3. Select your fitness goal
4. Select dietary preference
5. Click "Generate Plan" (will take 30-60 seconds)
6. Review the 7-day meal plan
7. Click "Save This Plan" to store it

#### View Saved Plans
1. Click "My Plans" in sidebar
2. See all your saved meal plans
3. Click "View Plan" to see details
4. Click "Delete" to remove a plan

#### Update Profile
1. Click "Profile" in sidebar
2. Enter your information (optional):
   - Age
   - Weight (kg)
   - Height (cm)
   - Fitness Goal
   - Dietary Preference
3. Click "Update Profile"

## 🆘 Common Issues & Solutions

### Port 3000 Already in Use
- Change PORT in `.env` file to another port (e.g., 3001)
- Or stop the process using port 3000

### Database Connection Error
- Make sure PostgreSQL is running
- Check username/password in `.env`
- Verify database name matches

### Edamam API Issues
- API takes 30-60 seconds to generate plan (normal)
- Confirm API credentials are correct
- Check rate limit on Edamam account
- Ensure internet connection is active

### Meal Plan Shows No Results
- Check your Edamam API credentials
- Verify API key has sufficient quota
- Try a different dietary preference

## 📚 File Structure

- `public/` - Frontend files (HTML, CSS, JS)
  - `index.html` - Landing page
  - `dashboard.html` - Main application
  - `styles/` - CSS files
  - `js/` - JavaScript files

- `server/` - Backend files
  - `app.js` - Main server file
  - `routes/` - API endpoints
  - `services/` - Business logic
  - `middleware/` - Authentication
  - `db/` - Database setup

- `.env` - Configuration file (create from template)
- `package.json` - Dependencies

## 🔑 API Reference

### Register User
```bash
POST /api/auth/register
Body: {
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "goal": "lose",
  "dietaryPreference": "veg"
}
```

### Login User
```bash
POST /api/auth/login
Body: {
  "email": "john@example.com",
  "password": "password123"
}
Response: {
  "token": "jwt_token_here",
  "user": { ... }
}
```

### Generate Meal Plan
```bash
POST /api/meal-plans/generate
Headers: { "Authorization": "Bearer jwt_token" }
Body: {
  "planName": "My Plan",
  "goal": "lose",
  "dietaryPreference": "veg"
}
```

## 📞 Need Help?

- Check README.md for detailed documentation
- Review error messages in browser console (F12)
- Check server logs in terminal
- Verify all environment variables are set correctly

## 🎉 You're All Set!

Enjoy using Diet Planner! Create your first meal plan now! 🥗

---

**Tip**: Start with the landing page to understand the flow before diving into meal planning!
