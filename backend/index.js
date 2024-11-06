const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const router = express.Router();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'world_change_db',
  host: process.env.DB_HOST || 'db',
  database: process.env.POSTGRES_DB || 'yahoo_improved',
  password: process.env.POSTGRES_PASSWORD || 'frank123',
  port: 5432,
});

// Test DB connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL');
  release();
});

// API endpoint to fetch items
app.get('/api/items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
