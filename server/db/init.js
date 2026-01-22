const pool = require('./pool');

async function initializeDatabase() {
  try {
    console.log('Initializing database...');

    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        goal VARCHAR(50) NOT NULL,
        dietary_preference VARCHAR(50) NOT NULL,
        age INT,
        weight DECIMAL(5, 2),
        height DECIMAL(5, 2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create meal plans table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS meal_plans (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        plan_name VARCHAR(255),
        goal VARCHAR(50) NOT NULL,
        dietary_preference VARCHAR(50) NOT NULL,
        week_start_date DATE NOT NULL,
        plan_data JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Create daily meals table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS daily_meals (
        id SERIAL PRIMARY KEY,
        meal_plan_id INT NOT NULL,
        day_number INT NOT NULL,
        breakfast JSONB,
        lunch JSONB,
        dinner JSONB,
        snacks JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (meal_plan_id) REFERENCES meal_plans(id) ON DELETE CASCADE
      )
    `);

    // Create recipes table for mock data (Vegetarian and Non-Vegetarian)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS recipes (
        id SERIAL PRIMARY KEY,
        label VARCHAR(255) NOT NULL,
        image_url TEXT,
        calories INT,
        source VARCHAR(255),
        recipe_url TEXT,
        yield INT DEFAULT 1,
        meal_type VARCHAR(50) NOT NULL,
        dietary_type VARCHAR(50) NOT NULL,
        diet_labels TEXT[],
        health_labels TEXT[],
        ingredients JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes for recipes table
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_recipes_meal_type ON recipes(meal_type)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_recipes_dietary_type ON recipes(dietary_type)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_recipes_meal_dietary ON recipes(meal_type, dietary_type)`);

    console.log('✓ All tables created successfully!');
    
    // Check if recipes table is empty and seed it
    const recipesCount = await pool.query('SELECT COUNT(*) FROM recipes');
    if (recipesCount.rows[0].count == 0) {
      console.log('Seeding recipes table with mock data...');
      await seedRecipes();
      console.log('✓ Mock data seeded successfully!');
    } else {
      console.log('✓ Recipes table already contains data.');
    }

    console.log('✓ Database initialization completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

async function seedRecipes() {
  const vegetarianRecipes = require('../services/mockDataVegetarian');
  const nonVegetarianRecipes = require('../services/mockDataNonVegetarian');

  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

  // Seed vegetarian recipes
  for (const mealType of mealTypes) {
    const recipes = vegetarianRecipes[mealType] || [];
    for (const recipe of recipes) {
      await pool.query(
        `INSERT INTO recipes (label, image_url, calories, source, recipe_url, yield, meal_type, dietary_type, diet_labels, health_labels, ingredients)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          recipe.label,
          recipe.image,
          recipe.calories,
          recipe.source,
          recipe.url,
          recipe.yield,
          mealType,
          'veg',
          recipe.dietLabels || [],
          recipe.healthLabels || [],
          JSON.stringify(recipe.ingredients)
        ]
      );
    }
  }

  // Seed non-vegetarian recipes
  for (const mealType of mealTypes) {
    const recipes = nonVegetarianRecipes[mealType] || [];
    for (const recipe of recipes) {
      await pool.query(
        `INSERT INTO recipes (label, image_url, calories, source, recipe_url, yield, meal_type, dietary_type, diet_labels, health_labels, ingredients)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          recipe.label,
          recipe.image,
          recipe.calories,
          recipe.source,
          recipe.url,
          recipe.yield,
          mealType,
          'non-veg',
          recipe.dietLabels || [],
          recipe.healthLabels || [],
          JSON.stringify(recipe.ingredients)
        ]
      );
    }
  }
}

initializeDatabase();
