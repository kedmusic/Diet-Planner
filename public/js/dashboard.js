const API_URL = 'http://localhost:3000/api';

let currentMealPlan = null;
let currentMealPlanId = null;

// Check if user is logged in
function checkAuth() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'index.html';
    return;
  }
  loadUserProfile();
}

async function loadUserProfile() {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      localStorage.removeItem('token');
      window.location.href = 'index.html';
      return;
    }

    const user = await response.json();
    populateProfileForm(user);
  } catch (error) {
    console.error('Error loading profile:', error);
  }
}

function populateProfileForm(user) {
  document.getElementById('profileAge').value = user.age || '';
  document.getElementById('profileWeight').value = user.weight || '';
  document.getElementById('profileHeight').value = user.height || '';
  document.getElementById('profileGoal').value = user.goal || '';
  document.getElementById('profileDietary').value = user.dietary_preference || '';
}

function handleLogout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}

function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll('.content-section').forEach(section => {
    section.classList.remove('active');
  });

  // Remove active class from all sidebar links
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.classList.remove('active');
  });

  // Show the selected section
  document.getElementById(sectionId).classList.add('active');

  // Add active class to the clicked link
  event.target.classList.add('active');

  // Load data based on section
  if (sectionId === 'myplans') {
    loadMealPlans();
  }
}

async function handleGeneratePlan(event) {
  event.preventDefault();

  const planName = document.getElementById('planName').value;
  const goal = document.getElementById('planGoal').value;
  const dietaryPreference = document.getElementById('planDietary').value;
  const token = localStorage.getItem('token');

  const generateBtn = document.getElementById('generateBtn');
  const loadingSpinner = document.getElementById('loadingSpinner');
  const mealPlanDisplay = document.getElementById('mealPlanDisplay');

  // Show loading spinner
  generateBtn.disabled = true;
  loadingSpinner.style.display = 'block';
  mealPlanDisplay.style.display = 'none';

  try {
    const response = await fetch(`${API_URL}/meal-plans/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ planName, goal, dietaryPreference })
    });

    const data = await response.json();

    if (!response.ok) {
      showAlert(data.error || 'Error generating meal plan', 'error');
      return;
    }

    currentMealPlan = data.mealPlan.data;
    currentMealPlanId = data.mealPlan.id;

    displayMealPlan(data.mealPlan.data);
    mealPlanDisplay.style.display = 'block';
    showAlert('Meal plan generated successfully!', 'success');
  } catch (error) {
    showAlert('Error generating meal plan. Please try again.', 'error');
    console.error(error);
  } finally {
    generateBtn.disabled = false;
    loadingSpinner.style.display = 'none';
  }
}

function displayMealPlan(mealPlan) {
  const mealPlanContent = document.getElementById('mealPlanContent');
  mealPlanContent.innerHTML = '';

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  days.forEach(day => {
    const dayMeals = mealPlan[day];
    if (dayMeals) {
      const dayDiv = document.createElement('div');
      dayDiv.className = 'meal-day';
      dayDiv.innerHTML = `
        <h3>${day}</h3>
        ${renderMealCategory('breakfast', dayMeals.breakfast)}
        ${renderMealCategory('lunch', dayMeals.lunch)}
        ${renderMealCategory('dinner', dayMeals.dinner)}
        ${renderMealCategory('snack', dayMeals.snack)}
      `;
      mealPlanContent.appendChild(dayDiv);
    }
  });
}

function renderMealCategory(category, meal) {
  if (!meal) {
    return `
      <div class="meal-category">
        <h4>${category}</h4>
        <div class="meal-item-empty">No meal found</div>
      </div>
    `;
  }

  return `
    <div class="meal-category">
      <h4>${category}</h4>
      <div class="meal-item" onclick="showMealDetail('${encodeURIComponent(JSON.stringify(meal))}')">
        <p><strong>${meal.label}</strong></p>
        <p>Calories: ${meal.calories} | Yield: ${meal.yield}</p>
        <p style="cursor: pointer; color: #667eea;">Click for details</p>
      </div>
    </div>
  `;
}

function showMealDetail(mealJson) {
  const meal = JSON.parse(decodeURIComponent(mealJson));
  const modal = document.getElementById('mealDetailModal');
  const content = document.getElementById('mealDetailContent');

  let ingredientsHTML = '';
  if (meal.ingredients && meal.ingredients.length > 0) {
    ingredientsHTML = `
      <div class="meal-detail-ingredients">
        <h4>Ingredients:</h4>
        <ul>
          ${meal.ingredients.slice(0, 10).map(ing => `<li>${ing.food}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  content.innerHTML = `
    <div class="meal-detail-grid">
      <div class="meal-detail-image">
        <img src="${meal.image}" alt="${meal.label}">
      </div>
      <div class="meal-detail-info">
        <h3>${meal.label}</h3>
        <p><strong>Calories:</strong> ${meal.calories}</p>
        <p><strong>Yield:</strong> ${meal.yield}</p>
        <p><strong>Source:</strong> ${meal.source}</p>
        ${meal.dietLabels ? `<p><strong>Diet Labels:</strong> ${meal.dietLabels.join(', ')}</p>` : ''}
        <a href="${meal.url}" target="_blank" class="btn btn-primary" style="display: inline-block; margin-top: 1rem;">View Full Recipe</a>
      </div>
    </div>
    ${ingredientsHTML}
  `;

  modal.style.display = 'block';
}

function closeMealDetailModal() {
  document.getElementById('mealDetailModal').style.display = 'none';
}

async function saveMealPlan() {
  if (!currentMealPlan || !currentMealPlanId) {
    showAlert('No meal plan to save', 'error');
    return;
  }

  const token = localStorage.getItem('token');
  
  try {
    // Meal plan is already saved when generated via POST /generate
    // Just show success and refresh the list
    showAlert('Meal plan saved successfully!', 'success');
    document.getElementById('generateForm').reset();
    document.getElementById('mealPlanDisplay').style.display = 'none';
    currentMealPlan = null;
    currentMealPlanId = null;
    
    // Refresh the meal plans list
    loadMealPlans();
  } catch (error) {
    showAlert('Error saving meal plan', 'error');
    console.error(error);
  }
}

async function loadMealPlans() {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(`${API_URL}/meal-plans`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const mealPlans = await response.json();

    const mealPlansList = document.getElementById('mealPlansList');
    mealPlansList.innerHTML = '';

    if (mealPlans.length === 0) {
      mealPlansList.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-state-icon">📋</div>
          <h3>No meal plans yet</h3>
          <p>Create your first meal plan to get started!</p>
        </div>
      `;
      return;
    }

    mealPlans.forEach(plan => {
      const card = document.createElement('div');
      card.className = 'meal-plan-card';
      card.innerHTML = `
        <div class="meal-plan-header">
          <h3>${plan.plan_name}</h3>
          <p>Created on ${new Date(plan.created_at).toLocaleDateString()}</p>
        </div>
        <div class="meal-plan-body">
          <div class="meal-plan-info">
            <div class="meal-plan-info-item">
              <span class="meal-plan-info-label">Goal</span>
              <span class="meal-plan-info-value">${plan.goal}</span>
            </div>
            <div class="meal-plan-info-item">
              <span class="meal-plan-info-label">Diet</span>
              <span class="meal-plan-info-value">${plan.dietary_preference}</span>
            </div>
          </div>
          <div class="meal-plan-actions">
            <button class="btn-view" onclick="viewMealPlan(${plan.id})">View Plan</button>
            <button class="btn-delete" onclick="deleteMealPlan(${plan.id})">Delete</button>
          </div>
        </div>
      `;
      mealPlansList.appendChild(card);
    });
  } catch (error) {
    showAlert('Error loading meal plans', 'error');
    console.error(error);
  }
}

async function viewMealPlan(mealPlanId) {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(`${API_URL}/meal-plans/${mealPlanId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      showAlert(error.error || 'Error loading meal plan', 'error');
      return;
    }

    const mealPlan = await response.json();
    
    // Ensure plan_data is an object
    if (typeof mealPlan.plan_data === 'string') {
      mealPlan.plan_data = JSON.parse(mealPlan.plan_data);
    }
    
    displayMealPlan(mealPlan.plan_data);
    document.getElementById('mealPlanDisplay').style.display = 'block';
    document.getElementById('generateForm').reset();
    window.scrollTo(0, 0);
    showSection('generate');
  } catch (error) {
    showAlert('Error loading meal plan', 'error');
    console.error(error);
  }
}

async function deleteMealPlan(mealPlanId) {
  if (!confirm('Are you sure you want to delete this meal plan?')) {
    return;
  }

  const token = localStorage.getItem('token');

  try {
    const response = await fetch(`${API_URL}/meal-plans/${mealPlanId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      showAlert('Error deleting meal plan', 'error');
      return;
    }

    showAlert('Meal plan deleted successfully!', 'success');
    loadMealPlans();
  } catch (error) {
    showAlert('Error deleting meal plan', 'error');
    console.error(error);
  }
}

async function handleProfileUpdate(event) {
  event.preventDefault();

  const token = localStorage.getItem('token');
  const age = document.getElementById('profileAge').value || null;
  const weight = document.getElementById('profileWeight').value || null;
  const height = document.getElementById('profileHeight').value || null;
  const goal = document.getElementById('profileGoal').value;
  const dietaryPreference = document.getElementById('profileDietary').value;

  try {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        age,
        weight,
        height,
        goal,
        dietaryPreference
      })
    });

    const data = await response.json();

    if (!response.ok) {
      showAlert(data.error || 'Error updating profile', 'error');
      return;
    }

    showAlert('Profile updated successfully!', 'success');
  } catch (error) {
    showAlert('Error updating profile', 'error');
    console.error(error);
  }
}

function showAlert(message, type) {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;
  alertDiv.textContent = message;
  document.body.insertBefore(alertDiv, document.body.firstChild);

  setTimeout(() => {
    alertDiv.remove();
  }, 5000);
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('mealDetailModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// Handle section switching and load data
function showSection(sectionName) {
  // Hide all sections
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => {
    section.classList.remove('active');
  });
  
  // Show selected section
  document.getElementById(sectionName).classList.add('active');
  
  // Update active sidebar link
  const links = document.querySelectorAll('.sidebar-link');
  links.forEach(link => {
    link.classList.remove('active');
  });
  event.target.classList.add('active');
  
  // Load meal plans when viewing My Plans section
  if (sectionName === 'myplans') {
    loadMealPlans();
  }
  
  return false;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  document.querySelector('.sidebar-link').classList.add('active');
});
