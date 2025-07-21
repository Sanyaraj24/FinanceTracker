🧾BachatBUDDY
A robust, full-stack personal finance tracker designed to provide users with an intuitive and powerful way to manage their financial transactions. With a clean, user-friendly interface and a scalable, cloud-powered backend, BachatBuddy helps you gain clarity and control over your spending, income, and transfers.
:

🌍 Live Demo
🔗 Deployed Project:  https://bachatbuddy.vercel.app

🎥 Demo Video
📺 Watch on YouTube: https://youtu.be/Du2p6g6i7TM



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

| Feature                      | Description                                                                 |
| ---------------------------- | --------------------------------------------------------------------------- |
| 📊 Transaction Management    | Add, retrieve, and visualize all your financial transactions easily.        |
| 🔐 Secure Authentication     | Firebase-based login keeps your dashboard private and protected.            |
| ☁️ Cloud-Powered Backend     | Fast, scalable backend using Cloudflare Workers + D1 for efficient storage. |
| 💰 Categorized Tracking      | Separate tracking for income, expenses                  |
| 🔄 Cross-Device Sync         | Seamlessly sync data across all devices via cloud storage.                  |

TECHSTACK -

| Category           | Technology              | Description                                                         |
| ------------------ | ----------------------- | ------------------------------------------------------------------- |
| **Frontend**       | Next.js 14 (App Router) | React-based framework for building fast, modern web applications.   |
|                    | Tailwind CSS            | Utility-first CSS framework for efficient and responsive styling.   |
|                    | Chart.js                | JavaScript charting library for data visualization.                 |
| **Backend**        | Cloudflare Workers      | Serverless compute platform for lightweight, scalable backend.      |
|                    | Cloudflare D1 (SQLite)  | Serverless SQL database powered by SQLite and distributed globally. |
| **Authentication** | Firebase                | Google’s secure authentication and user management system.          |
| **AI Integration** | Gemini API              | AI-powered data processing and text understanding by Google.        |



Endpoint	Method	Description
| Endpoint                      | Method | Description                                                 |
| ----------------------------- | ------ | ----------------------------------------------------------- |
| `/api/add-transaction`        | POST   | Adds a new financial transaction to the database.           |
| `/api/get-transactions`       | GET    | Retrieves transactions based on `user_id` and time `range`. |
| `/api/add-account`            | POST   | Adds a new account (e.g., savings, credit card, cash).      |
| `/api/get-accounts`           | GET    | Fetches all accounts linked to a specific `user_id`.        |                            |
| `/api/delete-account/:id`     | DELETE | Deletes an account by its ID.                               |
| `/api/users`                  | POST   | add new user and get a user                                 |

<img width="509" height="379" alt="image" src="https://github.com/user-attachments/assets/275904fb-a132-47e4-90f7-bf09932044d3" />



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
