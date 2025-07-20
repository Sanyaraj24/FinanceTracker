--User'table--
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL UNIQUE, -- from Firebase
    name TEXT,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    photo_url TEXT,
    location TEXT,
    pincode TEXT,
    default_currency TEXT DEFAULT 'INR',
    timezone TEXT DEFAULT 'Asia/Kolkata',
    is_verified BOOLEAN DEFAULT FALSE, -- from Firebase
    join_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
