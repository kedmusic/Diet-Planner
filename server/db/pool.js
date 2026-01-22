const Pool = require('pg').Pool;
require('dotenv').config();

let pool;

// Check if DATABASE_URL (Supabase) is provided, otherwise use local database
if (process.env.DATABASE_URL) {
  // Production/Remote (Supabase)
  console.log('🌐 Connecting to remote Supabase database...');
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  // Development/Local PostgreSQL
  console.log('💻 Connecting to local PostgreSQL database...');
  pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  });
}

// Handle pool errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
