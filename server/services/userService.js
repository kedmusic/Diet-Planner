const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db/pool');

// Register a new user
async function registerUser(username, email, password, goal, dietaryPreference) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (username, email, password, goal, dietary_preference) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email',
      [username, email, hashedPassword, goal, dietaryPreference]
    );

    return result.rows[0];
  } catch (error) {
    if (error.code === '23505') {
      throw new Error('Username or email already exists');
    }
    throw error;
  }
}

// Login user
async function loginUser(email, password) {
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      throw new Error('User not found');
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        goal: user.goal,
        dietary_preference: user.dietary_preference
      }
    };
  } catch (error) {
    throw error;
  }
}

// Get user by ID
async function getUserById(id) {
  try {
    const result = await pool.query('SELECT id, username, email, goal, dietary_preference, age, weight, height FROM users WHERE id = $1', [id]);
    return result.rows[0] || null;
  } catch (error) {
    throw error;
  }
}

// Update user profile
async function updateUserProfile(id, { age, weight, height, goal, dietaryPreference }) {
  try {
    const result = await pool.query(
      'UPDATE users SET age = $1, weight = $2, height = $3, goal = $4, dietary_preference = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING id, username, email, goal, dietary_preference',
      [age, weight, height, goal, dietaryPreference, id]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  updateUserProfile
};
