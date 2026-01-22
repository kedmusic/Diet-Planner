const Pool = require('pg').Pool;
require('dotenv').config();

// Using Supabase PostgreSQL database
if (!process.env.DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL is not set in .env file');
  console.error('Please configure Supabase DATABASE_URL in .env');
  process.exit(1);
}

console.log('🌐 Connecting to Supabase PostgreSQL database...');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
