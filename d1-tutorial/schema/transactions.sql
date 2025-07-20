--spend/earn/move money track
CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  account_id INTEGER NOT NULL,
  amount REAL NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  transaction_type TEXT CHECK(transaction_type IN ('income', 'expense', 'transfer')) NOT NULL,
  payment_method TEXT CHECK(payment_method IN ('cash', 'card', 'bank_transfer', 'check', 'UPI')) DEFAULT 'cash',
  transaction_date DATE NOT NULL,
  notes TEXT,
  reference_number TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_user_transactions ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_account_transactions ON transactions(account_id);
CREATE INDEX IF NOT EXISTS idx_transaction_date ON transactions(transaction_date);
CREATE INDEX IF NOT EXISTS idx_user_date ON transactions(user_id, transaction_date);
CREATE INDEX IF NOT EXISTS idx_category_date ON transactions(user_id, category, transaction_date);
