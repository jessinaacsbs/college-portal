# College Portal (MERN)

Login -> Student Dashboard -> Achievements (plus Exam Results, Schedule, Attendance, Activities, Notices, Library, Fees, Profile).

## Run locally (VS Code)
1. Start MongoDB (local service, or use a MongoDB Atlas URI in `backend/.env`).
2. Terminal 1:  `cd backend && npm install && npm start`   -> http://localhost:5000
3. Terminal 2:  `cd frontend && npm install && npm run dev` -> http://localhost:5173
4. Open http://localhost:5173, enter name, email, 5-digit register number, click Login.

## Deploy (single Render web service)
- Create a MongoDB Atlas free cluster; copy its connection string.
- Push this repo to GitHub, then on render.com create a Web Service from it:
  - Build Command: `npm run build`
  - Start Command: `npm start`
  - Env vars: `MONGO_URI` (Atlas string), `JWT_SECRET` (any random text)
- Your live link will be `https://<your-service>.onrender.com`

## Push to GitHub
```
git init
git add .
git commit -m "College portal MERN project"
git branch -M main
git remote add origin https://github.com/<your-username>/college-portal.git
git push -u origin main
```
