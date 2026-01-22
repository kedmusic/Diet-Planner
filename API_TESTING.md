# API Testing Guide

## Testing with cURL or Postman

### 1. Register a New User

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "goal": "lose",
    "dietaryPreference": "veg"
  }'
```

**Expected Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

---

### 2. Login User

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com",
    "goal": "lose",
    "dietary_preference": "veg"
  }
}
```

**Save the token for next requests!**

---

### 3. Get User Profile

Replace `YOUR_TOKEN` with the token from login response.

```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Expected Response:**
```json
{
  "id": 1,
  "username": "testuser",
  "email": "test@example.com",
  "goal": "lose",
  "dietary_preference": "veg",
  "age": null,
  "weight": null,
  "height": null
}
```

---

### 4. Update User Profile

```bash
curl -X PUT http://localhost:3000/api/auth/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "age": 28,
    "weight": 85.5,
    "height": 180,
    "goal": "lose",
    "dietaryPreference": "veg"
  }'
```

**Expected Response:**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com",
    "goal": "lose",
    "dietary_preference": "veg"
  }
}
```

---

### 5. Generate Meal Plan

⚠️ **Note:** This will take 30-60 seconds due to API calls.

```bash
curl -X POST http://localhost:3000/api/meal-plans/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "planName": "My Weight Loss Plan",
    "goal": "lose",
    "dietaryPreference": "veg"
  }'
```

**Expected Response:**
```json
{
  "message": "Meal plan generated and saved successfully",
  "mealPlan": {
    "id": 1,
    "planName": "My Weight Loss Plan",
    "goal": "lose",
    "dietaryPreference": "veg",
    "data": {
      "Monday": {
        "breakfast": { "label": "...", "calories": 350, ... },
        "lunch": { "label": "...", "calories": 450, ... },
        "dinner": { "label": "...", "calories": 400, ... },
        "snack": { "label": "...", "calories": 150, ... }
      },
      ...
    }
  }
}
```

---

### 6. Get All Meal Plans

```bash
curl -X GET http://localhost:3000/api/meal-plans \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Expected Response:**
```json
[
  {
    "id": 1,
    "plan_name": "My Weight Loss Plan",
    "goal": "lose",
    "dietary_preference": "veg",
    "week_start_date": "2024-01-15",
    "created_at": "2024-01-22T10:30:00.000Z"
  }
]
```

---

### 7. Get Specific Meal Plan

```bash
curl -X GET http://localhost:3000/api/meal-plans/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Expected Response:**
```json
{
  "id": 1,
  "user_id": 1,
  "plan_name": "My Weight Loss Plan",
  "goal": "lose",
  "dietary_preference": "veg",
  "week_start_date": "2024-01-15",
  "plan_data": {
    "Monday": { ... },
    "Tuesday": { ... },
    ...
  },
  "created_at": "2024-01-22T10:30:00.000Z",
  "updated_at": "2024-01-22T10:30:00.000Z"
}
```

---

### 8. Delete Meal Plan

```bash
curl -X DELETE http://localhost:3000/api/meal-plans/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Expected Response:**
```json
{
  "message": "Meal plan deleted successfully"
}
```

---

## Testing with Postman

### 1. Create a new Postman collection called "Diet Planner"

### 2. Create requests for each endpoint:

- **Register**: POST `http://localhost:3000/api/auth/register`
- **Login**: POST `http://localhost:3000/api/auth/login`
- **Profile**: GET `http://localhost:3000/api/auth/profile`
- **Update Profile**: PUT `http://localhost:3000/api/auth/profile`
- **Generate Plan**: POST `http://localhost:3000/api/meal-plans/generate`
- **Get Plans**: GET `http://localhost:3000/api/meal-plans`
- **Get Plan**: GET `http://localhost:3000/api/meal-plans/{{planId}}`
- **Delete Plan**: DELETE `http://localhost:3000/api/meal-plans/{{planId}}`

### 3. Setup Authorization

For authenticated endpoints:
1. Go to the request's "Authorization" tab
2. Select "Bearer Token"
3. Paste your JWT token from login response

### 4. Use Environment Variables

Create an environment with:
```json
{
  "baseUrl": "http://localhost:3000",
  "token": "your_jwt_token_here",
  "userId": 1,
  "planId": 1
}
```

Then use `{{baseUrl}}` and `{{token}}` in your requests.

---

## Error Responses

### 401 - Unauthorized
```json
{
  "error": "No token provided"
}
```
or
```json
{
  "error": "Invalid or expired token"
}
```

### 400 - Bad Request
```json
{
  "error": "Missing required fields"
}
```

### 404 - Not Found
```json
{
  "error": "Meal plan not found"
}
```

### 500 - Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Testing Workflow

### Complete Test Flow:

1. **Register** → Get user ID
2. **Login** → Get JWT token
3. **Update Profile** → Add user details
4. **Generate Plan** → Get meal plan ID (wait 60 seconds)
5. **Get Plans** → Verify plan is saved
6. **Get Specific Plan** → View full plan details
7. **Delete Plan** → Remove plan
8. **Get Plans** → Verify deletion

---

## Database Queries for Testing

Check if user was created:
```sql
SELECT * FROM users WHERE email = 'test@example.com';
```

Check meal plans:
```sql
SELECT * FROM meal_plans WHERE user_id = 1;
```

Check all tables:
```sql
SELECT * FROM users;
SELECT * FROM meal_plans;
SELECT * FROM daily_meals;
```

---

## Performance Notes

- **User Registration**: ~100ms
- **User Login**: ~150ms
- **Profile Update**: ~100ms
- **Get Meal Plans**: ~50ms
- **Generate Meal Plan**: 30-60 seconds (API calls to Edamam)
- **Delete Meal Plan**: ~100ms

---

**Happy Testing! 🧪**
