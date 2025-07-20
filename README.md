🧾BachatBUDDY
A robust, full-stack personal finance tracker designed to provide users with an intuitive and powerful way to manage their financial transactions. With a clean, user-friendly interface and a scalable, cloud-powered backend, BachatBuddy helps you gain clarity and control over your spending, income, and transfers.

✨ Features
📊 Comprehensive Transaction Management: Easily add, retrieve, and visualize all your financial transactions.

🔐 Secure Authentication: A dedicated dashboard secured with Firebase authentication ensures your data is private and protected.

☁️ Cloud-Powered Performance: Leverages a fast and scalable Cloudflare Worker backend for efficient data handling.

📈 Insightful Visualizations: Detailed chart views provide a clear overview of your spending history and financial trends.

💰 Categorized Tracking: Effortlessly track income, expenses, and transfers to understand your financial flows.

🔄 Cross-Device Sync: Your financial data is securely stored in the cloud, allowing seamless synchronization across all your devices.

📁 Project Structure
.
├── d1-tutorial/          # Cloudflare Worker backend with SQLite (D1)
└── finance-tracker/      # Frontend built with Next.js 14 App Router




🚀 Getting Started
Follow these steps to get your BachatBuddy project up and running on your local machine.

Prerequisites
Before you begin, ensure you have the following installed:

Node.js: v18+ (recommended)

npm or yarn

Cloudflare Wrangler CLI: For managing and deploying the backend worker.

Firebase Account: Required for user authentication.

Installation
Clone the repository:

git clone https://github.com/Sanyaraj24/FinanceTracker.git
cd finance-tracker




Frontend Setup:

Navigate to the finance-tracker directory, install dependencies, configure environment variables, and start the development server.

cd finance-tracker
npm install
cp .env.example .env.local  
npm run dev




Access the frontend in your browser at http://localhost:3000.

Backend Setup:

Navigate to the d1-tutorial directory, install dependencies, configure your Cloudflare settings, and start the backend development server.

cd ../d1-tutorial
npm install
cp wrangler.toml.example wrangler.toml  
npx wrangler dev




🌐 API Endpoints
The Cloudflare Worker backend exposes the following API endpoints:

Endpoint

Method

Description

/api/add-transaction

POST

Adds a new financial transaction.

/api/get-transactions

GET

Fetches transactions based on user_id and range.

/api/add-account

POST

Adds a new financial account.

/api/get-accounts

GET

Fetches accounts associated with a user_id.

🛠 Tech Stack
BachatBuddy is built using a modern and robust set of technologies:

Frontend

Next.js 14 (App Router): A React framework for building fast web applications.

Tailwind CSS: A utility-first CSS framework for rapid UI development.

Chart.js: Flexible JavaScript charting for data visualization.

Backend

Cloudflare Workers: Serverless execution environment for powerful backend logic.

Cloudflare D1 (SQLite): A serverless SQL database built on SQLite, running on Cloudflare's global network.

Authentication

Firebase: Google's comprehensive platform for authentication and other backend services.

🔧
🚀 Deployment
Frontend (Vercel):
For deploying the Next.js frontend to Vercel:

Set the build command: npm run build

Set the output directory: out

Backend (Cloudflare):
To publish the Cloudflare Worker backend:

cd d1-tutorial
npx wrangler publish




📸 Screenshots


📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

📧 Contact
 Sanya- rajsanya2424@gmail.com 

Link: https://github.com/Sanyaraj24/FinanceTracker
