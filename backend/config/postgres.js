const { Pool } = require("pg");

// Support DATABASE_URL (heroku-style) or individual PG_* env vars
const connectionString =
  process.env.DATABASE_URL ||
  (process.env.PG_USER &&
  process.env.PG_PASSWORD &&
  process.env.PG_HOST &&
  process.env.PG_DATABASE
    ? `postgresql://${process.env.PG_USER}:${encodeURIComponent(
        process.env.PG_PASSWORD
      )}@${process.env.PG_HOST}:${process.env.PG_PORT || 5432}/${
        process.env.PG_DATABASE
      }`
    : null);

const pool = new Pool(
  connectionString
    ? {
        connectionString,
        ssl:
          process.env.PG_SSL === "true" ? { rejectUnauthorized: false } : false,
      }
    : {
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
      }
);

const connectPostgres = async () => {
  try {
    // quick test query
    const client = await pool.connect();
    await client.query("SELECT 1");
    client.release();
    console.log("Postgres Connected");
  } catch (error) {
    console.error(`Postgres connection error: ${error.message}`);
    // don't crash in non-production by default
    if (process.env.NODE_ENV === "production") process.exit(1);
  }
};

const query = (text, params) => pool.query(text, params);

module.exports = { pool, query, connectPostgres };
