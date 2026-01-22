const API_URL = 'http://localhost:3000/api';

function scrollToSignup() {
  document.getElementById('signup').scrollIntoView({ behavior: 'smooth' });
}

function toggleLoginModal() {
  const modal = document.getElementById('loginModal');
  modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

// Close modal when clicking outside
window.onclick = function(event) {
  const loginModal = document.getElementById('loginModal');
  if (event.target === loginModal) {
    loginModal.style.display = 'none';
  }
};

async function handleSignup(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const goal = document.getElementById('goal').value;
  const dietaryPreference = document.getElementById('dietary').value;

  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        password,
        goal,
        dietaryPreference
      })
    });

    const data = await response.json();

    if (!response.ok) {
      showAlert(data.error, 'error');
      return;
    }

    showAlert('Account created successfully! Please login.', 'success');
    document.getElementById('signupForm').reset();

    // Redirect to login
    setTimeout(() => {
      toggleLoginModal();
    }, 1500);
  } catch (error) {
    showAlert('Error creating account. Please try again.', 'error');
    console.error(error);
  }
}

async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      showAlert(data.error, 'error');
      return;
    }

    // Store token and user info
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    showAlert('Login successful! Redirecting...', 'success');

    // Redirect to dashboard
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1000);
  } catch (error) {
    showAlert('Error logging in. Please try again.', 'error');
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
