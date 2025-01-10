# Notes Website

## Overview
This is a Notes Web App built with the MERN stack. It allows users to register, log in, and manage their notes. The app features a secure authentication system using JWT, allowing users to add, edit, delete, and search for notes.

---

## Features
- **User Authentication**: Secure login and registration with JWT-based token management.
- **Notes Management**: Users can create, edit, delete, and search for notes.
- **Responsive UI**: Built with React and styled using Tailwind CSS for a clean and modern user interface.

---

## Tech Stack

### Frontend
- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **JWT (JSON Web Token)**: Used for secure authentication.
- **Axios**: HTTP client for making requests to the backend.

### Backend
- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for Node.js to handle routes and requests.
- **MongoDB**: NoSQL database to store user data and notes.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **JWT (JSON Web Token)**: Used for user authentication and session management.

---

## Getting Started

### Prerequisites
- Node.js and npm installed.
- MongoDB running locally or use a cloud-based MongoDB service like MongoDB Atlas.
- A code editor such as VS Code.

### Installation

1. Clone the repository:

   git clone https://github.com/your-username/notes-website.git
Navigate to the backend directory and install dependencies:

cd notes-website/backend
npm install
Navigate to the frontend directory and install dependencies:

cd ../frontend
npm install
Create a .env file in the backend directory with the following environment variables:

ACCESS_TOKEN_SECRET=your_secret_key
Running the Application
Start the backend server:

cd backend
npm start
The backend server will run on port 8000 by default.

Start the frontend React application:

cd frontend
npm start
Usage
Create an Account:
Navigate to the Create Account page and fill in your information.
Log In:
Use the Log In page to authenticate yourself and get a token for accessing notes.
Manage Notes:
Once logged in, you can view, create, edit, and delete notes.
Search Notes:
You can search your notes by title or content.
File Structure
notes-website/
│
├── backend/
│   ├── models/              # MongoDB models (User, Note)
│   ├── .env                # Environment variables for backend
│   ├── index.js           # Backend server entry point
│   └── package.json        # Backend dependencies and scripts
│
├── frontend/
│   ├── src/                # React components and app files
│   ├── public/              # Public assets
│   ├── .env                # Environment variables for frontend (if needed)
│   └── package.json        # Frontend dependencies and scripts
│
└── README.md               # This file

