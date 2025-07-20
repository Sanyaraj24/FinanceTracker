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

Endpoint	Method	Description
/api/add-transaction	POST	Adds a new financial transaction.
/api/get-transactions	GET	Fetches transactions based on user_id & range.
/api/add-account	POST	Adds a new financial account.
/api/get-accounts	GET	Retrieves accounts linked to a user_id.

🛠 Tech Stack
Category	Technology	Description
Frontend	Next.js 14 (App Router)	React framework for building fast, scalable UIs.
Tailwind CSS	Utility-first CSS for rapid styling.
Chart.js	For interactive data visualizations.
Backend	Cloudflare Workers	Serverless backend execution.
Cloudflare D1 (SQLite)	Serverless SQL DB running globally via Cloudflare.
Auth	Firebase	Google’s secure authentication system.
AI	Gemini API	Used for AI-powered data extraction and enhancements.

🚀 Deployment
Frontend (Vercel)
Build Command: npm run build


📸 Screenshots
<img width="937" height="437" alt="image" src="https://github.com/user-attachments/assets/dbcf3246-6a02-47f2-9ad1-2f90457a77dc" />

<img width="940" height="439" alt="image" src="https://github.com/user-attachments/assets/d16bd301-ec9b-4862-a1c6-72cca1308810" />

<img width="916" height="420" alt="image" src="https://github.com/user-attachments/assets/1d338a5a-e746-4188-a2b5-66d910160101" />



📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

📧 Contact
 Sanya- rajsanya2424@gmail.com 

Link: https://github.com/Sanyaraj24/FinanceTracker
