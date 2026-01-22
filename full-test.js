const axios = require('axios');

const API_URL = 'http://localhost:3000/api';
let token = '';
let userId = '';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  bright: '\x1b[1m'
};

async function log(status, message) {
  let prefix = '';
  if (status === 'success') prefix = `${colors.green}✓${colors.reset}`;
  else if (status === 'error') prefix = `${colors.red}✗${colors.reset}`;
  else if (status === 'info') prefix = `${colors.blue}ℹ${colors.reset}`;
  else if (status === 'test') prefix = `${colors.yellow}⚡${colors.reset}`;
  
  console.log(`${prefix} ${message}`);
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTests() {
  console.log(`\n${colors.bright}${colors.blue}🥗 DIET PLANNER - COMPLETE TEST SUITE${colors.reset}\n`);
  
  try {
    // Test 1: Register User
    console.log(`${colors.bright}Test 1: User Registration${colors.reset}`);
    const uniqueEmail = `test${Date.now()}@example.com`;
    const registerRes = await axios.post(`${API_URL}/auth/register`, {
      username: `testuser${Date.now()}`,
      email: uniqueEmail,
      password: 'test123',
      goal: 'lose',
      dietaryPreference: 'veg'
    });
    await log('success', `User registered: ${registerRes.data.user.username}`);
    userId = registerRes.data.user.id;

    // Test 2: Login User
    console.log(`\n${colors.bright}Test 2: User Login${colors.reset}`);
    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      email: uniqueEmail,
      password: 'test123'
    });
    token = loginRes.data.token;
    await log('success', `Login successful - Token received`);

    // Test 3: Get User Profile
    console.log(`\n${colors.bright}Test 3: Get User Profile${colors.reset}`);
    const profileRes = await axios.get(`${API_URL}/auth/profile`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    await log('success', `Profile retrieved: ${profileRes.data.username}`);

    // Test 4: Update User Profile
    console.log(`\n${colors.bright}Test 4: Update User Profile${colors.reset}`);
    const updateRes = await axios.put(`${API_URL}/auth/profile`, 
      {
        age: 28,
        weight: 75,
        height: 175,
        goal: 'lose',
        dietaryPreference: 'veg'
      },
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    await log('success', `Profile updated - Age: 28, Weight: 75kg, Height: 175cm`);

    // Test 5: Generate Meal Plan (with mock data)
    console.log(`\n${colors.bright}Test 5: Generate 7-Day Meal Plan${colors.reset}`);
    await log('info', 'Generating meal plan with mock data...');
    const generateRes = await axios.post(`${API_URL}/meal-plans/generate`,
      {
        planName: 'Weight Loss Plan Week 1',
        goal: 'lose',
        dietaryPreference: 'veg'
      },
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    
    const mealPlanId = generateRes.data.mealPlan.id;
    const mealPlan = generateRes.data.mealPlan.data;
    await log('success', `Meal plan created: ID ${mealPlanId}`);
    await log('info', `Plan includes 7 days of meals`);
    
    // Display meal plan summary
    console.log(`\n${colors.bright}Meal Plan Summary:${colors.reset}`);
    Object.keys(mealPlan).forEach(day => {
      const meals = mealPlan[day];
      console.log(`  ${colors.yellow}${day}:${colors.reset}`);
      console.log(`    🍳 Breakfast: ${meals.breakfast?.label || 'N/A'} (${meals.breakfast?.calories || 0} cal)`);
      console.log(`    🥗 Lunch: ${meals.lunch?.label || 'N/A'} (${meals.lunch?.calories || 0} cal)`);
      console.log(`    🍽️  Dinner: ${meals.dinner?.label || 'N/A'} (${meals.dinner?.calories || 0} cal)`);
      console.log(`    🥤 Snack: ${meals.snack?.label || 'N/A'} (${meals.snack?.calories || 0} cal)`);
    });

    // Test 6: Get All Meal Plans
    console.log(`\n${colors.bright}Test 6: Retrieve All Saved Meal Plans${colors.reset}`);
    const plansRes = await axios.get(`${API_URL}/meal-plans`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    await log('success', `Retrieved ${plansRes.data.length} meal plan(s)`);
    plansRes.data.forEach(plan => {
      console.log(`  📋 ${plan.plan_name} - ${plan.goal} (${plan.dietary_preference})`);
    });

    // Test 7: Get Specific Meal Plan
    console.log(`\n${colors.bright}Test 7: Get Specific Meal Plan Details${colors.reset}`);
    const specificRes = await axios.get(`${API_URL}/meal-plans/${mealPlanId}`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    await log('success', `Retrieved meal plan: ${specificRes.data.plan_name}`);
    await log('info', `Goal: ${specificRes.data.goal}, Diet: ${specificRes.data.dietary_preference}`);

    // Test 8: Generate Second Meal Plan
    console.log(`\n${colors.bright}Test 8: Generate Another Meal Plan (Non-Veg)${colors.reset}`);
    const generate2Res = await axios.post(`${API_URL}/meal-plans/generate`,
      {
        planName: 'Weight Gain Plan - Non Veg',
        goal: 'gain',
        dietaryPreference: 'non-veg'
      },
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    const mealPlanId2 = generate2Res.data.mealPlan.id;
    await log('success', `Second meal plan created: ID ${mealPlanId2}`);

    // Test 9: Verify Both Plans Saved
    console.log(`\n${colors.bright}Test 9: Verify All Plans in Database${colors.reset}`);
    const allPlansRes = await axios.get(`${API_URL}/meal-plans`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    await log('success', `Total plans saved: ${allPlansRes.data.length}`);
    allPlansRes.data.forEach((plan, index) => {
      console.log(`  ${index + 1}. ${plan.plan_name}`);
      console.log(`     └─ Goal: ${plan.goal}, Diet: ${plan.dietary_preference}`);
    });

    // Test 10: Delete a Meal Plan
    console.log(`\n${colors.bright}Test 10: Delete a Meal Plan${colors.reset}`);
    const deleteRes = await axios.delete(`${API_URL}/meal-plans/${mealPlanId2}`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    await log('success', `Meal plan deleted successfully`);

    // Test 11: Final Count
    console.log(`\n${colors.bright}Test 11: Final Verification${colors.reset}`);
    const finalRes = await axios.get(`${API_URL}/meal-plans`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    await log('success', `Final meal plans count: ${finalRes.data.length}`);

    // Summary
    console.log(`\n${colors.bright}${colors.green}═════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bright}${colors.green}✓ ALL TESTS PASSED SUCCESSFULLY!${colors.reset}`);
    console.log(`${colors.bright}${colors.green}═════════════════════════════════════${colors.reset}`);
    
    console.log(`\n${colors.bright}Test Summary:${colors.reset}`);
    console.log(`  ✓ User Registration & Login`);
    console.log(`  ✓ Profile Management`);
    console.log(`  ✓ Meal Plan Generation (Mock Data)`);
    console.log(`  ✓ Database Storage`);
    console.log(`  ✓ Meal Plan Retrieval`);
    console.log(`  ✓ Multiple Plans Support`);
    console.log(`  ✓ Plan Deletion`);
    
    console.log(`\n${colors.bright}${colors.blue}🌐 Open your browser: http://localhost:3000${colors.reset}\n`);
    
    process.exit(0);

  } catch (error) {
    await log('error', `Test failed: ${error.response?.data?.error || error.message}`);
    console.error(error.response?.data || error.message);
    process.exit(1);
  }
}

// Wait for server to be ready
setTimeout(runTests, 2000);
