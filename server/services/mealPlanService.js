const pool = require('../db/pool');

// Save a new meal plan
async function saveMealPlan(userId, planName, goal, dietaryPreference, mealPlanData) {
  try {
    const weekStartDate = new Date();
    weekStartDate.setDate(weekStartDate.getDate() - weekStartDate.getDay());

    const result = await pool.query(
      'INSERT INTO meal_plans (user_id, plan_name, goal, dietary_preference, week_start_date, plan_data) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [userId, planName, goal, dietaryPreference, weekStartDate, JSON.stringify(mealPlanData)]
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

// Get all meal plans for a user
async function getUserMealPlans(userId) {
  try {
    const result = await pool.query(
      'SELECT id, plan_name, goal, dietary_preference, week_start_date, created_at FROM meal_plans WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
}

// Get a specific meal plan
async function getMealPlan(mealPlanId, userId) {
  try {
    const result = await pool.query(
      'SELECT * FROM meal_plans WHERE id = $1 AND user_id = $2',
      [mealPlanId, userId]
    );
    return result.rows[0] || null;
  } catch (error) {
    throw error;
  }
}

// Delete a meal plan
async function deleteMealPlan(mealPlanId, userId) {
  try {
    const result = await pool.query(
      'DELETE FROM meal_plans WHERE id = $1 AND user_id = $2 RETURNING id',
      [mealPlanId, userId]
    );
    return result.rows.length > 0;
  } catch (error) {
    throw error;
  }
}

// Update a meal plan
async function updateMealPlan(mealPlanId, userId, mealPlanData) {
  try {
    const result = await pool.query(
      'UPDATE meal_plans SET plan_data = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 AND user_id = $3 RETURNING id',
      [JSON.stringify(mealPlanData), mealPlanId, userId]
    );
    return result.rows[0] || null;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  saveMealPlan,
  getUserMealPlans,
  getMealPlan,
  deleteMealPlan,
  updateMealPlan
};
