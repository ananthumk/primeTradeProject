Task Manager Backend
Hey there! This is a simple backend API for managing users and tasks, built with Express and SQLite.
It’s got user signup/login with JWT auth, and lets you create, read, update, and delete tasks—all secured behind a login.

What’s Inside?
User registration and login with email & password

Passwords are safely hashed with bcrypt

JWT tokens keep your sessions secure (they expire in 5 hours)

Middleware protects routes — only logged-in users can access their data

SQLite keeps things lightweight and simple

Basic error handling and proper HTTP status codes

How to Get It Running
Clone the repo and jump in:

bash
git clone <repo-url>
cd backend
Install everything:

bash
npm install
Create a .env file at the root with these variables:

text
JWT_KEY=your_secret_key_here
PORT=4000
Fire it up:

bash
npx nodemon index.js
or just

bash
node index.js
The server will be hanging out at http://localhost:4000.

Quick Database Setup
SQLite will create the database file for you on first run.
If you want to set it up manually, here’s the schema:

sql
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
What Can You Do with This API?
Sign up: Create a new user with your name, email, and password

Log in: Receive a JWT token to authenticate requests

Get your profile: See your user info

Update profile: Change your name, email, or password (old password required)

Manage tasks: Add new tasks, view your tasks, update, or delete them

How To Use It
Remember to include your token in requests to protected routes:

text
Authorization: Bearer YOUR_JWT_TOKEN
Example: Signing Up
bash
POST /auth/signup
Content-Type: application/json

{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "supersecret"
}
If all goes well, you get back a token and your user info.

Handy Commands
Start server in dev mode (auto restarts on changes):

bash
npx nodemon index.js
Need Help?
Check the console for errors. Most issues come down to missing tokens, invalid input, or DB connection errors.