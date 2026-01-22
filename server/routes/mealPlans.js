const express = require('express');
const { generateMealPlan } = require('../services/edamamService');
const { saveMealPlan, getUserMealPlans, getMealPlan, deleteMealPlan, updateMealPlan } = require('../services/mealPlanService');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Generate and save a new meal plan
router.post('/generate', authenticateToken, async (req, res) => {
  try {
    const { planName, goal, dietaryPreference } = req.body;

    if (!planName || !goal || !dietaryPreference) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    console.log(`Generating meal plan for ${goal} goal with ${dietaryPreference} preference...`);
    const mealPlanData = await generateMealPlan(goal, dietaryPreference);

    const savedPlan = await saveMealPlan(req.user.id, planName, goal, dietaryPreference, mealPlanData);

    res.status(201).json({
      message: 'Meal plan generated and saved successfully',
      mealPlan: {
        id: savedPlan.id,
        planName,
        goal,
        dietaryPreference,
        data: mealPlanData
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Get all meal plans for the user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const mealPlans = await getUserMealPlans(req.user.id);
    res.json(mealPlans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific meal plan
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const mealPlan = await getMealPlan(req.params.id, req.user.id);
    if (!mealPlan) {
      return res.status(404).json({ error: 'Meal plan not found' });
    }
    
    // Parse plan_data if it's a string
    if (typeof mealPlan.plan_data === 'string') {
      try {
        mealPlan.plan_data = JSON.parse(mealPlan.plan_data);
      } catch (parseError) {
        console.error('Error parsing plan_data:', parseError);
        return res.status(500).json({ error: 'Invalid meal plan data format' });
      }
    }
    
    res.json(mealPlan);
  } catch (error) {
    console.error('Error fetching meal plan:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update a meal plan
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { mealPlanData } = req.body;
    const updated = await updateMealPlan(req.params.id, req.user.id, mealPlanData);
    if (!updated) {
      return res.status(404).json({ error: 'Meal plan not found' });
    }
    res.json({ message: 'Meal plan updated successfully', mealPlan: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a meal plan
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const deleted = await deleteMealPlan(req.params.id, req.user.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Meal plan not found' });
    }
    res.json({ message: 'Meal plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
