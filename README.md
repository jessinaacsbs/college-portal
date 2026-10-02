.

🌐 Live Application Links

Live Frontend App: https://college-portal-huwn.onrender.com
Live Backend API Service: https://college-portal-backend-6myl.onrender.com



🛠️ Tools & Technologies Used
1. Core Development Stack (MERN)
MongoDB Atlas (Database Layer): A cloud-hosted NoSQL database storing JSON-like documents. It manages your application data, including student records (students collection) and achievements (achievements collection).

Express.js (Backend Framework): A lightweight Node.js web framework used to construct API endpoints (REST API), handle client requests, and implement access routes.

React.js (Frontend Library): A JavaScript library built with Vite that creates single-page, component-based user interfaces for pages like Dashboard, Login, Achievements, and Sections.

Node.js (Runtime Environment): Executes JavaScript on the server side, managing backend modules, packages (npm), and server logic.

2. Auxiliary Libraries & Utility Tools
Axios: A promise-based HTTP client used inside frontend/src/api.js to send asynchronous requests from React to Express.

MongoDB Compass: A desktop GUI client used locally to manage database schemas, inspect data, and export/import collections.

Git & GitHub: Version control system used to track changes, maintain code, and push the project repository (jessinaacsbs/college-portal) online.

Render: A cloud hosting platform used to deploy both the static frontend assets and the live backend Node/Express web service.

⚙️ How You Built and Connected the System
Database Migration to the Cloud:

Exported local JSON data (achievements.json and students.json) from a local MongoDB instance using MongoDB Compass.

Provisioned a cloud MongoDB Atlas cluster (cluster0.zkxttvk.mongodb.net) with database user credentials.

Connected Compass directly to Atlas using the secure connection URI string and created the college_portal database containing students and achievements collections.

Backend Server Integration:

Configured backend/server.js to establish connection with MongoDB Atlas using Mongoose and the MONGO_URI environment variable.

Defined API routes for authentication, fetching student profiles, and logging/retrieving achievements.

Configured server deployment settings on Render using Node as runtime, npm install for dependencies, and node server.js as the startup command.

Frontend Connection & API Routing:

Updated frontend/src/api.js to set the base URL directly to your live backend endpoint: https://college-portal-backend-6myl.onrender.com/api.

Configured Axios interceptors to auto-attach authorization Bearer tokens from localStorage on every outbound request.

Built optimized static distribution assets via npm run build and deployed them on Render Static Sites.

Version Control & Repository Setup:

Initialized Git inside the project directory, committed source files across frontend and backend, and pushed code to the main branch of https://github.com/jessinaacsbs/college-portal.git.

⚡ What Does the Live Link Actually Do?
When you open https://college-portal-huwn.onrender.com in a browser, here is the automated end-to-end flow:

User Request & UI Rendering:

The Render CDN serves the pre-built React static files directly to your web browser.

React renders the student login screen.

Authentication & Token Storage:

When a student enters credentials (e.g., Register Number 12345), React sends a POST request using Axios to your backend URL ([https://college-portal-backend-6myl.onrender.com/api/login](https://college-portal-backend-6myl.onrender.com/api/login)).

Express processes the login, verifies credentials against MongoDB Atlas, generates a JWT token, and returns it to the client.

React stores the JWT token locally in the browser's localStorage.

Data Fetching & Authorization:

When navigating to the Dashboard or Achievements pages, Axios automatically attaches the Bearer token in request headers.

Express receives the HTTP request, authenticates the token, queries the live MongoDB Atlas cluster for matching records in students or achievements collections, and responds with JSON data.

Dynamic Interface Updates:

React receives the JSON responses from Express and dynamically renders student details, section info, and achievement lists without requiring a full page refresh.
