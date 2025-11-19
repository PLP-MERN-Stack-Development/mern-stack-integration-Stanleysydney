MernBlog Media Gateway
Project Overview
MernBlog is a specialized Software-as-a-Service (SaaS) platform designed for the Kenyan media landscape. It bridges the gap between independent writers and editorial desks of major local dailies, including Nation Media Group, The Standard, and Tuko.co.ke.
Unlike traditional content management systems, MernBlog functions as a merchant gateway for intellectual property. It allows writers to draft, format, and submit stories directly to verified media partners. The platform operates on a subscription model (Ksh 2,000/month), offering writers guaranteed editorial reviews, faster publication turnaround times, and portfolio tracking.
The application is built using the MERN stack (MongoDB, Express, React, Node.js) with a custom-architected, fully responsive frontend that eschews utility-first frameworks like Tailwind in favor of performant, semantic CSS.
Features Implemented
Frontend Architecture
Custom CSS System: A centralized variable-based CSS architecture (Glassmorphism, Dark Mode) ensuring consistent branding without external framework dependencies.
Responsive Design: Fully adaptive layouts using CSS Grid and Flexbox that support desktop, tablet, and mobile viewports.
Newsroom Editor: A dedicated writing interface allowing users to select specific media outlets (Nation, Standard, Star), categorize content, and write articles with real-time word counting.
Interactive Dashboard: A visual overview displaying published story counts, total readership reach, and active subscription status.
Subscription & Billing: A Kenyan-context billing page featuring "Guest" and "Journalist Pro" tiers, highlighting M-Pesa payment integration points.
Publication History: A status tracking table using color-coded badges to indicate article status (Published, Under Review, Rejected).
Partner Network Visuals: dedicated UI sections establishing trust by displaying partner media house identities.
Backend Architecture
RESTful API: A structured Node.js and Express server handling authentication and data submission.
Authentication & Security: Implementation of JSON Web Tokens (JWT) for session management and Bcrypt for password hashing.
Database Schema: MongoDB schemas using Mongoose to model Users (including subscription status) and effectively structure data.
Mock Submission Logic: Simulation of the asynchronous delay between article submission and editorial system acknowledgement.
Technology Stack
Client: React.js (Vite), React Router DOM, Lucide React (Icons), Standard CSS3.
Server: Node.js, Express.js.
Database: MongoDB (Mongoose ODM).
Authentication: JWT, Bcryptjs.
Environment: Dotenv for variable management.
Setup Instructions
Follow these steps to set up the development environment locally.
Prerequisites
Node.js (v14 or higher)
npm (Node Package Manager)
MongoDB (Local instance or Atlas URI)
1. Clone the Repository
Download the project files to your local machine.
2. Server Setup
Navigate to the server directory and install dependencies.
code
Bash
cd server
npm install
Create a .env file in the server directory with the following configurations:
code
Env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mernblog_media
JWT_SECRET=your_secure_secret_key_here
Start the backend server:
code
Bash
npm run dev
Note: Ensure your MongoDB instance is running before starting the server.
3. Client Setup
Open a new terminal, navigate to the client directory, and install dependencies.
code
Bash
cd client
npm install
Start the frontend development server:
code
Bash
npm run dev
4. Access the Application
Open your web browser and navigate to the local host URL provided by Vite (typically http://localhost:5173).
API Documentation
The backend exposes the following REST endpoints for client communication.
Authentication
1. Register User
Endpoint: POST /api/auth/register
Description: Creates a new user account with free tier status.
Body Parameters:
name (String): Full name of the writer.
email (String): User email address.
password (String): Raw password string.
Response: JSON object indicating success or error (e.g., duplicate email).
2. Login User
Endpoint: POST /api/auth/login
Description: Authenticates a user and returns a session token.
Body Parameters:
email (String): Registered email.
password (String): Password.
Response: JSON object containing the JWT token and user profile data (name, email, subscription plan).
Editorial Operations
1. Submit Story
Endpoint: POST /api/submit-story
Description: Transmits an article draft to a specific media outlet's editorial queue.
Headers: Authorization: Bearer [Token] (Recommended for production).
Body Parameters:
title (String): The headline of the article.
outlet (String): The selected media house (e.g., "Nation Media Group").
body (String): The content of the article.
category (String): The news category (e.g., "Politics").
Response: JSON confirmation message simulating the editorial desk receipt.
Directory Structure
code
Text
mernblog-pro/
├── server/
│   ├── package.json       # Backend dependencies and scripts
│   ├── server.js          # Entry point, API routes, and DB connection
│   └── .env               # Environment variables (not committed)
├── client/
│   ├── index.html         # HTML entry point
│   ├── vite.config.js     # Vite configuration and Proxy setup
│   ├── package.json       # Frontend dependencies
│   └── src/
│       ├── main.jsx       # React DOM rendering
│       ├── App.jsx        # Main application logic and routing
│       └── index.css      # Global styles and theme variables
└── README.md              # Project documentation
License
This project is proprietary software crafted by Barongo. Unauthorized copying or distribution is prohibited.

Some of the screenshots