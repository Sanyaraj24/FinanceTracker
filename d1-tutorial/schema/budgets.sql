-- Set limits on spending
--Track budget vs. actual spending

CREATE TABLE IF NOT EXISTS budgets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  amount REAL NOT NULL,        -- Budget limit
  spent REAL DEFAULT 0.00,     -- Amount already spent
  period TEXT CHECK (period IN ('weekly', 'monthly', 'quarterly', 'yearly')) NOT NULL,
  start_date TEXT NOT NULL,    -- SQLite stores DATE as TEXT in ISO8601 (YYYY-MM-DD)
  end_date TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);


CREATE INDEX IF NOT EXISTS idx_user_budgets ON budgets(user_id);
CREATE INDEX IF NOT EXISTS idx_budget_period ON budgets(user_id, start_date, end_date);
