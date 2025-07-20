--Each account (like savings, credit card, cash) is linked to that user using user_id (foreign key).
--same user can have multiple accounts
CREATE TABLE IF NOT EXISTS accounts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  account_type TEXT CHECK(account_type IN ('checking', 'savings', 'credit_card', 'cash', 'investment', 'loan', 'wallet')) NOT NULL,
  balance REAL DEFAULT 0.00,
  currency TEXT DEFAULT 'INR',
  bank_name TEXT,
  account_number TEXT,
  notes TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);


CREATE INDEX IF NOT EXISTS idx_user_accounts ON accounts(user_id);
