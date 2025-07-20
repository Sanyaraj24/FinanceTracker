# 🧾 FinanceTracker

A full-stack personal finance tracker that helps users manage transactions with a clean UI and cloud-powered backend.  
It is composed of:

- ✅ `finance-tracker`: a **Next.js** frontend for managing and visualizing your finances
- ☁️ `d1-tutorial`: a **Cloudflare Worker** backend that exposes REST APIs and connects to a **Cloudflare D1** database

---

## 📁 Project Structure

.
├── d1-tutorial # Cloudflare Worker backend with SQLite (D1)
└── finance-tracker # Frontend built with Next.js 14 App Router

yaml
Copy
Edit

---

## 🚀 Features

- 📊 Add, retrieve, and visualize transaction data
- 🔐 Firebase-authenticated dashboard
- ☁️ Fast and scalable Cloudflare Worker backend
- 📈 Chart view for spending history
- 💰 Track income, expenses, and transfers

---

## 💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
2. Set Up the Frontend (finance-tracker)
bash
Copy
Edit
cd finance-tracker
npm install
npm run dev
Open http://localhost:3000 in your browser.

3. Set Up the Backend (d1-tutorial)
bash
Copy
Edit
cd ../d1-tutorial
npm install
npx wrangler dev
Make sure you have Wrangler installed and authenticated.

🌐 API Endpoints (Cloudflare Worker)
POST /api/add-transaction — Add a new transaction

GET /api/get-transactions?user_id=...&range=... — Fetch user transactions

POST /api/add-account — Add a new account

GET /api/get-accounts?user_id=... — Fetch user accounts

These APIs are consumed by the Next.js frontend.

🔐 Authentication & Database
Firebase Authentication for user login

Cloudflare D1 (SQLite) for storing all transactional and account data

🛠 Tech Stack
Frontend	Backend	Database	Auth
Next.js 14	Cloudflare Workers	Cloudflare D1	Firebase

🚀 Deployment
Frontend (Next.js):
Deploy finance-tracker using Vercel.

Backend (Cloudflare Worker):
bash
Copy
Edit
cd d1-tutorial
npx wrangler publish
```
