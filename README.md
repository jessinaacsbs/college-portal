# College Portal

A full-stack MERN (MongoDB, Express.js, React, Node.js) web application designed for managing student profiles, sections, and achievements.



## 🚀 Live Demo

- **Frontend Application:** [https://college-portal-huwn.onrender.com](https://college-portal-huwn.onrender.com)
- **Backend API Service:** [https://college-portal-backend-6myl.onrender.com](https://college-portal-backend-6myl.onrender.com)




## ✨ Features
1. Authentication System: Secure JWT-based login for students and administrators.

2. Student Dashboard: View student profiles, registration details, and assigned sections.

3. Achievements Tracker: Add, display, and categorize student achievements and extracurricular activities.

4. Responsive UI: Modern React interface styled for seamless desktop and mobile navigation.




## 🛠️ Tech Stack
1. Frontend: React.js, Vite, Axios, React Router

2. Backend: Node.js, Express.js

3. Database: MongoDB Atlas (Cloud Database)

4. Deployment: Render (Frontend Static Site & Backend Web Service)

5. Version Control: Git & GitHub




## 📁 Repository Structure

```text
college-portal/
└── college-portal/
    ├── backend/          # Express server & API routes
    │   ├── server.js
    │   └── package.json
    └── frontend/         # React client application
        ├── src/
        └── package.json
```
   



## 💻 Local Setup & Development
1. Prerequisites
2. Node.js installed locally

MongoDB Atlas cluster or local MongoDB instance

1. Clone the Repository
   git clone [https://github.com/jessinaacsbs/college-portal.git](https://github.com/jessinaacsbs/college-portal.git)
   cd college-portal/college-portal

2. Backend Setup
   cd backend
   npm install

Create a .env file in the backend directory:
    MONGO_URI=your_mongodb_connection_string
    PORT=5000

Start the backend server:
   npm start


3. Frontend Setup
   cd ../frontend
   npm install
   npm run dev
The frontend will run on http://localhost:5173 and communicate with the backend server.





## 📷 Project Screenshots

### 1. VS Code Environment & Structure
<img width="257" height="494" alt="Screenshot 2026-10-02 121311" src="https://github.com/user-attachments/assets/0571d58b-129d-4a36-8428-d3de34df5c33" />



### 2. Database Management
| MongoDB Atlas (Cloud) | 
<img width="956" height="417" alt="Screenshot 2026-10-02 120233" src="https://github.com/user-attachments/assets/a706370c-8800-4b89-a015-366321316c88" />


| MongoDB Compass (Local Client) |
<img width="957" height="500" alt="Screenshot 2026-10-02 120212" src="https://github.com/user-attachments/assets/e72c542f-1e8e-4dde-b6c5-90101d87556c" />


### 3. Render Deployment & Cloud Hosting
<img width="941" height="412" alt="Screenshot 2026-10-02 122502" src="https://github.com/user-attachments/assets/175dbc59-f317-47bf-b19c-c098febc67dc" />



### 4. Live Deployed Application


### 🌐 MODEL 1: Application User Flow & Page Transitions

**Phase 1: Authentication & Entry (`/login`)**  
The user enters their credentials (such as Register Number `12345`). Upon submit, React calls `/api/login` on Express, stores the returning JWT token in local storage, and routes the user to the Dashboard.

**User Move:** Enters login details into the authentication form.  

**System Move:** Validates credentials via Node/Express API against the `students` collection in MongoDB Atlas and returns an authorization token.
<img width="952" height="418" alt="Screenshot 2026-10-02 120300" src="https://github.com/user-attachments/assets/90914913-c8de-4b57-8042-2e81b6816f50" />



### 🔄 MODEL 2: Application Interaction States

### 🔄 MODEL 2: Application Interaction States

**Phase 2: Profile Overview & Navigation (`/dashboard`)**
The user accesses their personalized student portal showing register details and assigned section info retrieved directly from MongoDB Atlas.

**User Move:** Navigates student profile views and section assignments.

**System Move:** Decodes the session token to retrieve specific student metadata and renders active portal modules.
<img width="957" height="410" alt="Screenshot 2026-10-02 120325" src="https://github.com/user-attachments/assets/58f03cf3-b217-4ee8-80bb-22a02f90920b" />



### 🔀 MODEL 3: Application Navigation Pipeline

**Phase 3: Achievement Management (`/achievements`)**
Clicking the Achievements tab triggers an authorized `GET` request to fetch and display the student's logged extracurricular achievements and certifications.

**User Move:** Clicks the Achievements option in the navigation bar.

**System Move:** Sends a token-bearing Axios request to `/api/achievements`, retrieves matching records, and updates the DOM dynamically without a page refresh.
<img width="955" height="409" alt="Screenshot 2026-10-02 120345" src="https://github.com/user-attachments/assets/c48f838f-6c53-4944-b309-be4026d1e20b" />



