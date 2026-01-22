const axios = require('axios');
const vegetarianRecipes = require('./mockDataVegetarian');
const nonVegetarianRecipes = require('./mockDataNonVegetarian');
const { getRecipesFromDatabase } = require('./recipeService');
require('dotenv').config();

const EDAMAM_APP_ID = process.env.EDAMAM_APP_ID;
const EDAMAM_API_KEY = process.env.EDAMAM_API_KEY;
// Using Recipe Search API v2 (works with Meal Planner Developer plan)
const EDAMAM_BASE_URL = 'https://api.edamam.com/api/recipes/v2';

// Map dietary preferences to Edamam diet types
const dietTypeMap = {
  veg: ['vegan', 'vegetarian'],
  'non-veg': [],
  both: []
};

// Map goals to calorie adjustments
const calorieMap = {
  'lose': { min: 1500, max: 1800 },
  'maintain': { min: 2000, max: 2400 },
  'gain': { min: 2500, max: 3000 }
};

async function searchMeals(goal, dietaryPreference, mealType = 'any') {
  try {
    // Step 1: Try to fetch from database first
    console.log(`🔍 Fetching ${mealType} recipes from database for ${dietaryPreference} preference...`);
    const dbRecipes = await getRecipesFromDatabase(dietaryPreference, mealType);
    
    if (dbRecipes && dbRecipes.length > 0) {
      console.log(`✅ Found ${dbRecipes.length} recipes from database`);
      return dbRecipes;
    }
    
    console.log('ℹ️  No recipes found in database, trying Edamam API...');
  } catch (dbError) {
    console.error('⚠️  Database fetch error:', dbError.message);
    console.log('Falling back to API...');
  }

  // Step 2: Try Edamam API
  try {
    const calorieRange = calorieMap[goal] || calorieMap['maintain'];
    const caloriePerMeal = {
      breakfast: { min: calorieRange.min * 0.25, max: calorieRange.max * 0.25 },
      lunch: { min: calorieRange.min * 0.35, max: calorieRange.max * 0.35 },
      dinner: { min: calorieRange.min * 0.30, max: calorieRange.max * 0.30 },
      snack: { min: 100, max: 200 }
    };

    const range = caloriePerMeal[mealType] || caloriePerMeal['lunch'];

    let query = '';
    if (mealType === 'breakfast') query = 'breakfast';
    else if (mealType === 'lunch') query = 'lunch';
    else if (mealType === 'dinner') query = 'dinner';
    else if (mealType === 'snack') query = 'snack';
    else query = 'recipe';

    let dietType = '';
    if (dietaryPreference === 'veg') {
      dietType = 'vegan';
    } else if (dietaryPreference === 'non-veg') {
      dietType = '';
    }

    const params = {
      type: 'public',
      q: query,
      app_id: EDAMAM_APP_ID,
      app_key: EDAMAM_API_KEY,
      from: 0,
      to: 10,
      ...(dietType && { diet: dietType })
    };

    const response = await axios.get(EDAMAM_BASE_URL, { params });
    
    if (response.data.hits && response.data.hits.length > 0) {
      console.log(`✅ Found ${response.data.hits.length} recipes from Edamam API`);
      return response.data.hits.map(hit => ({
        label: hit.recipe.label,
        image: hit.recipe.image,
        calories: Math.round(hit.recipe.calories),
        source: hit.recipe.source,
        url: hit.recipe.url,
        yield: hit.recipe.yield,
        dietLabels: hit.recipe.dietLabels || [],
        healthLabels: hit.recipe.healthLabels || [],
        ingredients: hit.recipe.ingredients || []
      }));
    }

    return [];
  } catch (apiError) {
    console.error('⚠️  Edamam API error:', apiError.response?.status, apiError.response?.statusText);
    console.log('📋 Falling back to mock data for dietary preference:', dietaryPreference);
    
    // Step 3: Fall back to mock data
    let mockData;
    if (dietaryPreference === 'veg') {
      mockData = vegetarianRecipes;
    } else if (dietaryPreference === 'non-veg') {
      mockData = nonVegetarianRecipes;
    } else {
      // 'both' - randomly select from either
      mockData = Math.random() > 0.5 ? vegetarianRecipes : nonVegetarianRecipes;
    }
    
    const mockMeals = mockData[mealType] || mockData.lunch;
    console.log(`✅ Using ${mockMeals.length} mock recipes as fallback`);
    return mockMeals.slice(0, 5);
  }
}

async function generateMealPlan(goal, dietaryPreference) {
  try {
    const mealPlan = {};
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    for (const day of days) {
      const breakfast = await searchMeals(goal, dietaryPreference, 'breakfast');
      const lunch = await searchMeals(goal, dietaryPreference, 'lunch');
      const dinner = await searchMeals(goal, dietaryPreference, 'dinner');
      const snack = await searchMeals(goal, dietaryPreference, 'snack');

      mealPlan[day] = {
        breakfast: breakfast[Math.floor(Math.random() * breakfast.length)] || null,
        lunch: lunch[Math.floor(Math.random() * lunch.length)] || null,
        dinner: dinner[Math.floor(Math.random() * dinner.length)] || null,
        snack: snack[Math.floor(Math.random() * snack.length)] || null
      };

      // Add delay to avoid API rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    return mealPlan;
  } catch (error) {
    console.error('Error generating meal plan:', error.message);
    throw error;
  }
}

module.exports = {
  searchMeals,
  generateMealPlan
};
