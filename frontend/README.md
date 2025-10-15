Task Manager Frontend
This is a React frontend application for a task manager system. It provides user authentication, task creation, editing, deletion, and viewing with smooth UI and protected routes.

Features
User login and registration pages

Protected routes for authenticated users only

View task status with counts (Completed, In Progress, Pending)

Add, edit, delete tasks with modals

Profile page to update user info and password

Responsive and clean UI using Tailwind CSS

Context for backend API URL

Loading spinners and friendly error handling

Tech Stack
React.js (with hooks)

React Router for navigation

Axios for API requests

Tailwind CSS for styling

React Icons for UI icons

Context API for global settings

Getting Started
1. Clone the repo and install dependencies
bash
git clone <repository-url>
cd frontend
npm install
2. Environment Setup
The app uses a context file src/context/AppContext.js for the backend base URL.
Change the URL there if you want to point to a different backend.

3. Running the app locally
bash
npm start
This will open your browser at http://localhost:3000.

Pages & Components Overview
/login – Login and registration form with toggling views

/ (Home) – Dashboard showing task statuses and task management

/profile – User profile page for viewing and updating user info

ProtectedRoute – Wraps routes requiring authentication

Navbar – Top navigation with profile and logout

AddTask, EditTask, Delete – Modals for task CRUD operations

Usage
Login/Register
Enter your credentials to login or switch to register mode to create a new account.

On success, a token is saved in local storage and you are redirected to the home page.

Task Management
On home page, view summary cards for completed, in-progress, and pending tasks.

Search and filter tasks by status or title.

Add, edit, or delete tasks using the UI buttons, which open modals for actions.

Profile Management
Access your profile from the navbar.

Edit your name, email, and optionally change your password securely.

Notes
All backend requests include the JWT token from local storage for authentication.

The frontend expects the backend API to be running and accessible at the URL in context.

This is a single-page app built with React Router for seamless navigation.

Project Structure
text
src/
├── components/      # UI components (Navbar, AddTask, EditTask, Delete, ProtectedRoute)
├── context/         # App context for backend URL
├── pages/           # Screens (Home, Login, Profile)
├── App.js           # Root app with routes
├── index.js         # ReactDOM bootstrap
...
How to Contribute
Feel free to open issues or submit pull requests. Suggestions and improvements are welcome!

License
This project is open source and available under the MIT License.