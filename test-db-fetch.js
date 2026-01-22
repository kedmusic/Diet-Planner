// Test script to verify database recipe fetching
const { getRecipesFromDatabase, getRecipesStats } = require('./server/services/recipeService');

async function testDatabaseFetch() {
  console.log('🧪 Testing Database Recipe Fetch...\n');

  try {
    // Test 1: Get recipes stats
    console.log('📊 Step 1: Checking Recipe Statistics');
    console.log('=====================================');
    const stats = await getRecipesStats();
    console.log('Recipe counts by dietary type and meal type:');
    stats.forEach(stat => {
      console.log(`  ${stat.dietary_type} - ${stat.meal_type}: ${stat.count} recipes`);
    });
    console.log('');

    // Test 2: Fetch vegetarian recipes
    console.log('🥗 Step 2: Fetching Vegetarian Recipes');
    console.log('======================================');
    const vegBreakfast = await getRecipesFromDatabase('veg', 'breakfast');
    console.log(`✅ Vegetarian Breakfast: ${vegBreakfast.length} recipes found`);
    if (vegBreakfast.length > 0) {
      console.log(`   Sample: ${vegBreakfast[0].label} (${vegBreakfast[0].calories} cal)`);
    }

    const vegLunch = await getRecipesFromDatabase('veg', 'lunch');
    console.log(`✅ Vegetarian Lunch: ${vegLunch.length} recipes found`);
    if (vegLunch.length > 0) {
      console.log(`   Sample: ${vegLunch[0].label} (${vegLunch[0].calories} cal)`);
    }

    const vegDinner = await getRecipesFromDatabase('veg', 'dinner');
    console.log(`✅ Vegetarian Dinner: ${vegDinner.length} recipes found`);
    if (vegDinner.length > 0) {
      console.log(`   Sample: ${vegDinner[0].label} (${vegDinner[0].calories} cal)`);
    }

    const vegSnack = await getRecipesFromDatabase('veg', 'snack');
    console.log(`✅ Vegetarian Snack: ${vegSnack.length} recipes found`);
    if (vegSnack.length > 0) {
      console.log(`   Sample: ${vegSnack[0].label} (${vegSnack[0].calories} cal)`);
    }
    console.log('');

    // Test 3: Fetch non-vegetarian recipes
    console.log('🍗 Step 3: Fetching Non-Vegetarian Recipes');
    console.log('==========================================');
    const nonVegBreakfast = await getRecipesFromDatabase('non-veg', 'breakfast');
    console.log(`✅ Non-Vegetarian Breakfast: ${nonVegBreakfast.length} recipes found`);
    if (nonVegBreakfast.length > 0) {
      console.log(`   Sample: ${nonVegBreakfast[0].label} (${nonVegBreakfast[0].calories} cal)`);
    }

    const nonVegLunch = await getRecipesFromDatabase('non-veg', 'lunch');
    console.log(`✅ Non-Vegetarian Lunch: ${nonVegLunch.length} recipes found`);
    if (nonVegLunch.length > 0) {
      console.log(`   Sample: ${nonVegLunch[0].label} (${nonVegLunch[0].calories} cal)`);
    }

    const nonVegDinner = await getRecipesFromDatabase('non-veg', 'dinner');
    console.log(`✅ Non-Vegetarian Dinner: ${nonVegDinner.length} recipes found`);
    if (nonVegDinner.length > 0) {
      console.log(`   Sample: ${nonVegDinner[0].label} (${nonVegDinner[0].calories} cal)`);
    }

    const nonVegSnack = await getRecipesFromDatabase('non-veg', 'snack');
    console.log(`✅ Non-Vegetarian Snack: ${nonVegSnack.length} recipes found`);
    if (nonVegSnack.length > 0) {
      console.log(`   Sample: ${nonVegSnack[0].label} (${nonVegSnack[0].calories} cal)`);
    }
    console.log('');

    // Test 4: Fetch both (mixed)
    console.log('🍽️  Step 4: Fetching Mixed Recipes (Both)');
    console.log('========================================');
    const bothBreakfast = await getRecipesFromDatabase('both', 'breakfast');
    console.log(`✅ Both Breakfast: ${bothBreakfast.length} recipes found`);
    if (bothBreakfast.length > 0) {
      console.log(`   Sample: ${bothBreakfast[0].label}`);
    }

    const bothLunch = await getRecipesFromDatabase('both', 'lunch');
    console.log(`✅ Both Lunch: ${bothLunch.length} recipes found`);
    if (bothLunch.length > 0) {
      console.log(`   Sample: ${bothLunch[0].label}`);
    }
    console.log('');

    // Test 5: Show detailed info
    console.log('📋 Step 5: Detailed Recipe Information');
    console.log('======================================');
    if (vegBreakfast.length > 0) {
      const recipe = vegBreakfast[0];
      console.log(`Recipe: ${recipe.label}`);
      console.log(`  Calories: ${recipe.calories}`);
      console.log(`  Source: ${recipe.source}`);
      console.log(`  Yield: ${recipe.yield}`);
      console.log(`  Diet Labels: ${recipe.dietLabels.join(', ')}`);
      console.log(`  Health Labels: ${recipe.healthLabels.join(', ')}`);
      console.log(`  Ingredients: ${recipe.ingredients.length} items`);
      if (recipe.ingredients.length > 0) {
        console.log(`    First ingredient: ${recipe.ingredients[0].food}`);
      }
    }
    console.log('');

    console.log('✅ Database fetch test completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`  ✓ Vegetarian recipes: ${vegBreakfast.length + vegLunch.length + vegDinner.length + vegSnack.length} total`);
    console.log(`  ✓ Non-Vegetarian recipes: ${nonVegBreakfast.length + nonVegLunch.length + nonVegDinner.length + nonVegSnack.length} total`);
    console.log(`  ✓ Mixed recipes: ${bothBreakfast.length + bothLunch.length} fetched`);

  } catch (error) {
    console.error('❌ Error during test:', error.message);
    console.error(error);
  }

  process.exit(0);
}

testDatabaseFetch();
