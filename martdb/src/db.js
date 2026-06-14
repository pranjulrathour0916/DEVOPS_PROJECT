import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  // If DATABASE_URL is present (like in your K8s pod), use it
  connectionString: process.env.DATABASE_URL,
  
  // Only fallback to these if DATABASE_URL is missing
  ...(!process.env.DATABASE_URL && {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  }),
  
  // Supabase/External DBs usually require SSL
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;