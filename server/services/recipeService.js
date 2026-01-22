const pool = require('../db/pool');

// Get recipes from database by meal type and dietary preference
async function getRecipesFromDatabase(dietaryPreference, mealType) {
  try {
    let query = `
      SELECT id, label, image_url as image, calories, source, recipe_url as url, yield, diet_labels, health_labels, ingredients
      FROM recipes
      WHERE meal_type = $1
    `;
    
    const params = [mealType];

    if (dietaryPreference === 'veg') {
      query += ` AND dietary_type = 'veg'`;
    } else if (dietaryPreference === 'non-veg') {
      query += ` AND dietary_type = 'non-veg'`;
    }
    // For 'both', we don't add a filter - returns both types

    query += ` ORDER BY RANDOM() LIMIT 10`;

    const result = await pool.query(query, params);

    // Parse JSON fields
    return result.rows.map(row => ({
      label: row.label,
      image: row.image,
      calories: row.calories,
      source: row.source,
      url: row.url,
      yield: row.yield,
      dietLabels: row.diet_labels || [],
      healthLabels: row.health_labels || [],
      ingredients: typeof row.ingredients === 'string' ? JSON.parse(row.ingredients) : row.ingredients
    }));
  } catch (error) {
    console.error('Error fetching recipes from database:', error);
    return [];
  }
}

// Get all recipes count by dietary type
async function getRecipesStats() {
  try {
    const result = await pool.query(`
      SELECT dietary_type, meal_type, COUNT(*) as count
      FROM recipes
      GROUP BY dietary_type, meal_type
      ORDER BY dietary_type, meal_type
    `);
    return result.rows;
  } catch (error) {
    console.error('Error fetching recipes stats:', error);
    return [];
  }
}

// Add new recipe to database
async function addRecipe(label, image_url, calories, source, recipe_url, yield_value, meal_type, dietary_type, diet_labels, health_labels, ingredients) {
  try {
    const result = await pool.query(
      `INSERT INTO recipes (label, image_url, calories, source, recipe_url, yield, meal_type, dietary_type, diet_labels, health_labels, ingredients)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING id`,
      [label, image_url, calories, source, recipe_url, yield_value, meal_type, dietary_type, diet_labels, health_labels, JSON.stringify(ingredients)]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error adding recipe:', error);
    throw error;
  }
}

module.exports = {
  getRecipesFromDatabase,
  getRecipesStats,
  addRecipe
};
