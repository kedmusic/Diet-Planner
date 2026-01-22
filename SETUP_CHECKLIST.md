# Setup Checklist & Configuration Guide

## ✅ Pre-Installation Checklist

- [ ] Node.js v14+ installed (`node --version`)
- [ ] npm v6+ installed (`npm --version`)
- [ ] PostgreSQL v12+ installed and running
- [ ] Internet connection for Edamam API
- [ ] Text editor/IDE ready (VS Code, Sublime, etc.)

---

## 📝 Step-by-Step Setup

### Step 1: Extract Project Files
```bash
cd diet-planner
```

Verify files are in place:
```bash
ls -la  # Should see package.json, .env, README.md, etc.
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- express (web framework)
- pg (PostgreSQL client)
- bcryptjs (password hashing)
- jsonwebtoken (JWT auth)
- axios (HTTP client)
- dotenv (environment config)
- cors (cross-origin requests)

### Step 3: Setup PostgreSQL Database

#### On Windows:
```powershell
# Open PostgreSQL command line
psql -U postgres

# Create database
CREATE DATABASE diet_planner;

# Create user
CREATE USER app_user WITH PASSWORD 'password123';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE diet_planner TO app_user;

# Exit
\q
```

#### On macOS/Linux:
```bash
sudo -u postgres psql

CREATE DATABASE diet_planner;
CREATE USER app_user WITH PASSWORD 'password123';
GRANT ALL PRIVILEGES ON DATABASE diet_planner TO app_user;
\q
```

### Step 4: Configure Environment Variables

Edit `.env` file:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=diet_planner
DB_USER=app_user
DB_PASSWORD=password123

# Edamam API Configuration
# Go to https://developer.edamam.com/ to get these
EDAMAM_APP_ID=your_app_id_here
EDAMAM_API_KEY=your_api_key_here

# JWT Configuration
JWT_SECRET=your_super_secret_key_change_this_in_production
```

### Step 5: Get Edamam API Credentials

1. Go to https://developer.edamam.com/
2. Click "Get Started" → Select "Sign Up"
3. Register with your email
4. Verify email and login
5. Click "Create New Application"
6. Select "Recipe Search API"
7. Fill out the form
8. Accept terms and create
9. Copy your:
   - `Application ID` 
   - `Application Key`
10. Paste into `.env`:
    ```env
    EDAMAM_APP_ID=abc123xyz
    EDAMAM_API_KEY=def456uvw
    ```

### Step 6: Initialize Database Tables

```bash
npm run db:init
```

Expected output:
```
✓ Database initialized successfully!
```

This creates three tables:
- `users` - Store user accounts
- `meal_plans` - Store meal plans
- `daily_meals` - Store daily meal details

### Step 7: Verify Database Setup

```bash
# Connect to database
psql -U app_user -d diet_planner

# List tables
\dt

# You should see:
# - users
# - meal_plans  
# - daily_meals

# Exit
\q
```

### Step 8: Start Development Server

```bash
npm start
```

Or with auto-reload:
```bash
npm run dev
```

Expected output:
```
✓ Server is running on http://localhost:3000
```

### Step 9: Test the Application

Open in browser:
```
http://localhost:3000
```

You should see the landing page with:
- Navigation bar
- Hero section
- Features section
- Signup form

---

## 🧪 Quick Test

### Test User Registration:
1. Scroll down to signup form
2. Enter test credentials:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `test123`
   - Goal: `lose`
   - Dietary: `veg`
3. Click "Sign Up"
4. Should see: "Account created successfully!"

### Test User Login:
1. Click "Login here"
2. Enter:
   - Email: `test@example.com`
   - Password: `test123`
3. Click "Login"
4. Should redirect to dashboard

### Test Meal Plan Generation:
1. On dashboard, click "Generate Plan"
2. Enter:
   - Plan Name: `Test Plan`
   - Goal: `lose`
   - Dietary: `veg`
3. Click "Generate Plan"
4. Wait 30-60 seconds for API to fetch meals
5. Should display 7-day meal plan
6. Click "Save This Plan"
7. Should see success message

---

## 🔧 Troubleshooting Setup

### Issue: `npm install` fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

### Issue: PostgreSQL connection error

**Solution:**
```bash
# Check PostgreSQL is running
psql --version

# On Windows, start PostgreSQL service
# On macOS: brew services start postgresql
# On Linux: sudo service postgresql start
```

### Issue: Database already exists

**Solution:**
```bash
# Drop and recreate
psql -U postgres
DROP DATABASE diet_planner;
CREATE DATABASE diet_planner;
# Then run: npm run db:init
```

### Issue: Edamam API returns no results

**Solution:**
1. Verify API credentials in `.env`
2. Check API quota on Edamam dashboard
3. Ensure internet connection
4. Try different dietary preference
5. Check server logs for errors

### Issue: Port 3000 already in use

**Solution:**
```bash
# Find process using port 3000
netstat -ano | findstr :3000  # Windows
lsof -i :3000                 # macOS/Linux

# Kill process (replace PID)
taskkill /PID 1234 /F  # Windows
kill -9 1234           # macOS/Linux

# Or change port in .env:
PORT=3001
```

---

## 📁 Project Structure Verification

Verify all files are in place:

```
diet-planner/
├── ✅ .env
├── ✅ .gitignore
├── ✅ package.json
├── ✅ README.md
├── ✅ QUICK_START.md
├── ✅ API_TESTING.md
├── ✅ DEPLOYMENT.md
├── public/
│   ├── ✅ index.html
│   ├── ✅ dashboard.html
│   ├── js/
│   │   ├── ✅ main.js
│   │   └── ✅ dashboard.js
│   └── styles/
│       ├── ✅ styles.css
│       └── ✅ dashboard.css
└── server/
    ├── ✅ app.js
    ├── db/
    │   ├── ✅ pool.js
    │   └── ✅ init.js
    ├── middleware/
    │   └── ✅ auth.js
    ├── routes/
    │   ├── ✅ auth.js
    │   └── ✅ mealPlans.js
    └── services/
        ├── ✅ userService.js
        ├── ✅ mealPlanService.js
        └── ✅ edamamService.js
```

---

## 🔑 Important Credentials

### Default Database
- Host: `localhost`
- Port: `5432`
- Database: `diet_planner`
- User: `app_user`
- Password: `password123`

### Default Server
- URL: `http://localhost:3000`
- Environment: `development`

### Test Account
- Username: `testuser`
- Email: `test@example.com`
- Password: `test123`

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Complete feature & technical documentation |
| `QUICK_START.md` | 5-minute setup guide |
| `API_TESTING.md` | API endpoints with cURL examples |
| `DEPLOYMENT.md` | Production deployment guides |
| `this file` | Setup checklist & troubleshooting |

---

## 🚀 Next Steps After Setup

1. **Explore Landing Page**
   - Read features
   - Understand app flow

2. **Create Test Account**
   - Sign up with test data
   - Verify email functionality

3. **Generate First Meal Plan**
   - Try different goals (lose/maintain/gain)
   - Try different dietary preferences

4. **Review Code**
   - Check frontend logic in `public/js/`
   - Review backend API in `server/routes/`
   - Examine database schema in `server/db/init.js`

5. **Customize**
   - Update colors in `public/styles/styles.css`
   - Change meal preferences in `server/services/edamamService.js`
   - Add new features as needed

6. **Deploy (Optional)**
   - See `DEPLOYMENT.md` for options
   - Deploy to Heroku, AWS, DigitalOcean, etc.

---

## 📞 Common Commands

### Development
```bash
npm start          # Start server (production)
npm run dev        # Start with auto-reload
npm run db:init    # Initialize database
```

### Database
```bash
psql -U app_user -d diet_planner    # Connect to DB
\dt                                 # List tables
\q                                  # Exit
```

### Testing
```bash
curl http://localhost:3000                              # Test server
curl http://localhost:3000/api/auth/register            # Test API
```

---

## ✨ Features Checklist

- ✅ User authentication (register/login)
- ✅ JWT token-based sessions
- ✅ PostgreSQL database integration
- ✅ 7-day meal plan generation
- ✅ Goal-based calorie calculation
- ✅ Dietary preference filtering
- ✅ Edamam API integration
- ✅ Save meal plans to database
- ✅ View saved meal plans
- ✅ Delete meal plans
- ✅ Update user profile
- ✅ Responsive design
- ✅ Error handling
- ✅ Form validation

---

## 🎉 You're Ready!

Everything is set up! Now you can:

1. Start the server: `npm start`
2. Open browser: `http://localhost:3000`
3. Create account and generate meal plans!

**Enjoy using Diet Planner! 🥗**

---

**Questions?** Check the documentation files or error messages in the console.
