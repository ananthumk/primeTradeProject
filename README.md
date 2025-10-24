#  Task Manager – Full Stack App

A full stack **Task Manager Application** built with **Express.js**, **SQLite**, and **React.js**, featuring secure JWT authentication and full CRUD management for tasks.  
It’s lightweight, scalable, and deployed live for anyone to explore!

---

##  Live Demo

- **Frontend (React + TailwindCSS):** [https://prime-trade-project.vercel.app/](https://prime-trade-project.vercel.app/)  
- **Backend (Express + SQLite):** [https://primetradeproject.onrender.com](https://primetradeproject.onrender.com)

---

## ⚙️ Features

###  Backend (Express + SQLite)
- User registration & login with email and password
- Hashed passwords using **bcrypt**
- JWT authentication (expires in 5 hours)
- Protected routes for user‑specific tasks
- CRUD operations for tasks
- Proper HTTP status codes and error handling
- Lightweight database management with **SQLite**

###  Frontend (React.js)
- User‑friendly interface with clean UI
- **Authentication flow** (login, register, logout)
- Protected routes for logged‑in users only
- Task creation, editing, deletion, and view by status
- Profile management (update name, email, password)
- Responsive design using **Tailwind CSS**
- Context API for centralized backend URL management

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React.js, React Router, Tailwind CSS, Axios, React Icons |
| Backend | Node.js, Express.js, SQLite, bcryptjs, JSON Web Token |
| Database | SQLite (file‑based relational DB) |
| Hosting | Frontend – Vercel • Backend – Render |

---

## 🛠️ Installation & Setup (Local)

### 1. Clone the repository
git clone <repo-url>
cd task-manager

text

### 2. Backend Setup
cd backend
npm install

text

Create a `.env` file in the backend folder:
JWT_KEY=your_secret_key_here
PORT=4000

text

Run the backend:
npx nodemon index.js

or
node index.js

text
Server will run at → `http://localhost:4000`

### 3. Database Setup
SQLite auto‑creates your database file (`database.db`) on first run.  
If you want to create tables manually, use:

CREATE TABLE users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
email TEXT UNIQUE NOT NULL,
password TEXT NOT NULL
);

CREATE TABLE tasks (
id INTEGER PRIMARY KEY AUTOINCREMENT,
user_id INTEGER NOT NULL,
title TEXT NOT NULL,
description TEXT,
status TEXT DEFAULT 'pending',
FOREIGN KEY (user_id) REFERENCES users(id)
);

text

---

### 4. Frontend Setup
cd frontend
npm install

text

Set up your backend URL in **`src/context/AppContext.js`**:
export const API_BASE = "https://primetradeproject.onrender.com";

text

Run the React app:
npm start

text
Frontend runs at → `http://localhost:3000`

---

## 📦 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|-----------|-------------|------|
| POST | `/auth/signup` | Register new user 
| POST | `/auth/login` | Log in and get JWT |
| GET | `/user/profile` | Get user profile | 
| PUT | `/user/profile` | Update user info/password |
| GET | `/tasks` | Get all user’s tasks |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update an existing task |
| DELETE | `/tasks/:id` | Delete a task | 

Header example:
Authorization: Bearer YOUR_JWT_TOKEN

text

---

## 🧱 Folder Structure

task-manager/
│
├── backend/
│ ├── index.js # Entry point for Express server
│ ├── routes/ # Route definitions
│ ├── middleware/ # JWT verification
│ ├── controllers/ # Business logic
│ ├── db/ # SQLite setup files
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Screens (Home, Login, Profile)
│ │ ├── context/ # AppContext – base API URL
│ │ ├── App.js # Router setup
│ │ └── index.js # Entry file
│
└── README.md

text

---

## 🧠 Example Usage

### Register User
POST /auth/signup
Content-Type: application/json

{
"name": "Alice",
"email": "alice@example.com",
"password": "supersecret"
}

text

### Add Task
POST /tasks
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
"title": "Finish documentation",
"description": "Write project README for GitHub"
}

text

---

## 🚀 Deployment

### Frontend
- **Hosted on Vercel:**  
  [https://prime-trade-project.vercel.app](https://prime-trade-project.vercel.app)  
  Simply push updates to the main branch; Vercel auto‑deploys.

### Backend
- **Hosted on Render:**  
  [https://primetradeproject.onrender.com](https://primetradeproject.onrender.com)  
  Render handles build and SQLite persistence.  
  Ensure `.env` variables are set in Render’s dashboard before deploy.

---

## ⚠️ Common Issues

- **401 Unauthorized:** Missing or invalid JWT token
- **400 Bad Request:** Invalid user input or empty fields
- **CORS errors:** Confirm `cors()` middleware enabled in `index.js`
- **DB not found:** SQLite auto‑creates but ensure write permissions in host environment

---

## 🤝 Contributing

Pull requests and suggestions are always welcome.  
If you find a bug or have a feature idea, open an issue.

---

## 🧾 License

This project is licensed under the **MIT License** — free for use and modification.

---

### 💙 Built With
**React**, **Express**, **SQLite**, and **Tailwind CSS**
