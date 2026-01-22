# Database Setup Guide - Diet Planner

This guide helps you set up the database for both **local development** and **online hosting** (Supabase).

## Database Tables

### 1. **users** - User Accounts
Stores user registration and profile information.

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  goal VARCHAR(50) NOT NULL,                  -- 'lose', 'maintain', 'gain'
  dietary_preference VARCHAR(50) NOT NULL,    -- 'veg', 'non-veg', 'both'
  age INT,
  weight DECIMAL(5, 2),                       -- in kg
  height DECIMAL(5, 2),                       -- in cm
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. **meal_plans** - Saved Meal Plans
Stores generated 7-day meal plans for each user.

```sql
CREATE TABLE meal_plans (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  plan_name VARCHAR(255),
  goal VARCHAR(50) NOT NULL,
  dietary_preference VARCHAR(50) NOT NULL,
  week_start_date DATE NOT NULL,
  plan_data JSONB NOT NULL,                   -- Contains 7-day meal plan structure
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 3. **daily_meals** - Individual Daily Meals
Stores meals for each day of a meal plan.

```sql
CREATE TABLE daily_meals (
  id SERIAL PRIMARY KEY,
  meal_plan_id INT NOT NULL,
  day_number INT NOT NULL,
  breakfast JSONB,
  lunch JSONB,
  dinner JSONB,
  snacks JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (meal_plan_id) REFERENCES meal_plans(id) ON DELETE CASCADE
);
```

### 4. **recipes** - Mock Recipe Database ⭐ NEW
Stores all vegetarian and non-vegetarian recipes for easy management and querying.

```sql
CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  label VARCHAR(255) NOT NULL,
  image_url TEXT,
  calories INT,
  source VARCHAR(255),
  recipe_url TEXT,
  yield INT DEFAULT 1,
  meal_type VARCHAR(50) NOT NULL,             -- 'breakfast', 'lunch', 'dinner', 'snack'
  dietary_type VARCHAR(50) NOT NULL,          -- 'veg' or 'non-veg'
  diet_labels TEXT[],
  health_labels TEXT[],
  ingredients JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_meal_type (meal_type),
  INDEX idx_dietary_type (dietary_type)
);
```

## Setup Instructions

### Local Development (PostgreSQL)

1. **Install PostgreSQL** (if not already installed)
   - Download from: https://www.postgresql.org/download/

2. **Create local database:**
   ```bash
   psql -U postgres
   CREATE DATABASE diet_planner;
   \q
   ```

3. **Configure .env file:**
   ```
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=diet_planner
   DB_USER=postgres
   DB_PASSWORD=Proj_db@2026
   ```

4. **Initialize database:**
   ```bash
   cd diet-planner
   npm run db:init
   ```

   This will:
   - Create all tables
   - Seed mock recipe data from mockDataVegetarian.js and mockDataNonVegetarian.js
   - Show success message

### Online Hosting (Supabase)

#### Step 1: Create Supabase Account
- Go to: https://supabase.com
- Sign up and create a new project
- Wait for project to initialize

#### Step 2: Get Connection String
- Go to Project Settings → Database
- Copy the connection string in format:
  ```
  postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres
  ```

#### Step 3: Update .env File
```
# For Supabase (uncomment to use)
DATABASE_URL=postgresql://postgres:Proj_db@2026@db.shqtemjjfrvujukgjhvv.supabase.co:5432/postgres

# Local settings (keep for development)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=diet_planner
DB_USER=postgres
DB_PASSWORD=Proj_db@2026
```

#### Step 4: Update Connection Pool (server/db/pool.js)
Modify to use Supabase connection:

```javascript
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }  // Required for Supabase
});

module.exports = pool;
```

#### Step 5: Initialize Supabase Database
```bash
npm run db:init
```

## Switching Between Local and Remote Database

### Option A: Using Environment Variables (Recommended)

**server/db/pool.js:**
```javascript
const { Pool } = require('pg');
require('dotenv').config();

let poolConfig;

if (process.env.NODE_ENV === 'production') {
  // Use Supabase for production
  poolConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  };
} else {
  // Use local PostgreSQL for development
  poolConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  };
}

const pool = new Pool(poolConfig);
module.exports = pool;
```

**package.json scripts:**
```json
{
  "scripts": {
    "dev": "NODE_ENV=development node server/app.js",
    "start": "NODE_ENV=production node server/app.js",
    "db:init": "node server/db/init.js"
  }
}
```

### Option B: Using DATABASE_URL Priority

**server/db/pool.js:**
```javascript
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 
    `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

module.exports = pool;
```

## Mock Data Management

### Seed Data Automatically
When running `npm run db:init`:
- Reads mockDataVegetarian.js (28 recipes)
- Reads mockDataNonVegetarian.js (32 recipes)
- Automatically inserts into recipes table
- Only seeds if table is empty (prevents duplicates)

### Add More Recipes

**Method 1: Update Mock Data Files**
```javascript
// server/services/mockDataVegetarian.js
vegetarianRecipes.breakfast.push({
  label: 'New Recipe',
  image: 'https://...',
  calories: 300,
  // ... other fields
});
```

Then reinitialize database:
```bash
npm run db:init
```

**Method 2: Use Recipe Service**
```javascript
const { addRecipe } = require('../services/recipeService');

await addRecipe(
  'New Recipe',
  'https://image-url',
  300,
  'Source',
  'https://recipe-url',
  1,
  'breakfast',
  'veg',
  ['Vegetarian'],
  ['Low-Calorie'],
  [{food: 'ingredient', weight: 100}]
);
```

## Verification

### Check Local Database
```bash
psql -U postgres -d diet_planner

# View tables
\dt

# Check recipes count
SELECT COUNT(*) FROM recipes;
SELECT dietary_type, meal_type, COUNT(*) as count FROM recipes GROUP BY dietary_type, meal_type;
```

### Check Supabase Database
- Use Supabase Dashboard → SQL Editor
- Or use DBeaver/TablePlus for visual management

## Troubleshooting

### Database Connection Error
- Ensure PostgreSQL/Supabase is running
- Check .env file configuration
- Verify credentials are correct

### Tables Already Exist
- This is normal! The `CREATE TABLE IF NOT EXISTS` prevents errors
- Existing data is preserved

### Recipe Seeding Fails
- Check if mock data files exist
- Verify JSON structure in mockData files
- Check console output for specific errors

### Supabase Connection Issues
- Verify DATABASE_URL format
- Check Supabase project status
- Ensure firewall allows connections

## Production Deployment Checklist

- [ ] Create Supabase project
- [ ] Get DATABASE_URL connection string
- [ ] Update .env with DATABASE_URL
- [ ] Set NODE_ENV=production
- [ ] Run `npm run db:init` on Supabase
- [ ] Verify tables and data exist
- [ ] Test user registration
- [ ] Test meal plan generation and saving
- [ ] Test with different dietary preferences

---

**Note:** Keep both local and remote database configurations in your `.env` file. Switch between them by:
- Local: Keep NODE_ENV=development
- Remote: Set NODE_ENV=production
