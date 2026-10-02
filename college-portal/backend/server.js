require('dotenv').config();
const express = require('express'), cors = require('cors'), mongoose = require('mongoose'), jwt = require('jsonwebtoken');
const path = require('path'), fs = require('fs');
const app = express();
app.use(cors(), express.json());
const SECRET = process.env.JWT_SECRET || 'dev_secret';

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/college_portal')
  .then(() => console.log('MongoDB connected')).catch(e => console.error('MongoDB error:', e.message));

const Student = mongoose.model('Student', new mongoose.Schema({
  name: String, email: String, regNo: { type: String, unique: true },
  course: { type: String, default: 'B.Tech - Computer Science' }
}));
const Achievement = mongoose.model('Achievement', new mongoose.Schema({
  regNo: String, title: String, description: String, category: String, date: String
}));

const seedAchievements = [
  ['First Prize in Coding Hackathon', 'Won 1st prize in the National Level Coding Hackathon (TechSpark 2024).', 'Technical', 'Dec 15, 2024'],
  ['Inter College Cricket Tournament', 'Represented college and secured 2nd position in Inter College Cricket Tournament.', 'Sports', 'Nov 20, 2024'],
  ['Best Volunteer Award', 'Recognized for outstanding contribution in NSS activities.', 'Others', 'Sep 10, 2024'],
  ['Cultural Fest - Dance Performance', 'Won 1st prize in group dance at Annual Cultural Fest.', 'Cultural', 'Aug 25, 2024'],
  ['Academic Excellence', 'Secured top rank in Data Structures subject.', 'Academic', 'Apr 15, 2024']
];

const DATA = {
  results: { title: 'Exam Results', columns: ['Subject', 'Code', 'Marks', 'Grade'], rows: [
    ['Data Structures', 'CS201', '92/100', 'O'], ['Database Systems', 'CS203', '88/100', 'A+'],
    ['Operating Systems', 'CS205', '81/100', 'A'], ['Discrete Mathematics', 'MA201', '79/100', 'A'],
    ['Computer Networks', 'CS207', '85/100', 'A+']] },
  schedule: { title: 'College Schedule', columns: ['Day', 'Time', 'Subject', 'Room'], rows: [
    ['Monday', '09:00 - 10:00', 'Data Structures', 'B-101'], ['Tuesday', '10:00 - 11:00', 'Database Systems', 'B-204'],
    ['Wednesday', '11:00 - 12:00', 'Operating Systems', 'C-102'], ['Thursday', '09:00 - 11:00', 'Networks Lab', 'Lab-3'],
    ['Friday', '02:00 - 03:00', 'Discrete Mathematics', 'A-305']] },
  attendance: { title: 'Attendance', columns: ['Subject', 'Attended', 'Total', 'Percentage'], rows: [
    ['Data Structures', '46', '48', '96%'], ['Database Systems', '44', '48', '92%'],
    ['Operating Systems', '42', '48', '88%'], ['Computer Networks', '45', '48', '94%']] },
  activities: { title: 'Co-curricular Activities', columns: ['Activity', 'Role', 'Status'], rows: [
    ['Coding Club', 'Member', 'Active'], ['NSS', 'Volunteer', 'Active'],
    ['Cultural Committee', 'Dance Lead', 'Active'], ['College Cricket Team', 'Player', 'Season ended']] },
  notices: { title: 'Notices', columns: ['Notice', 'Date'], rows: [
    ['Mid Semester Exam Schedule Released', 'Apr 10, 2025'], ['Cultural Fest Registration Open', 'Apr 08, 2025'],
    ['Library Timing Extended', 'Apr 05, 2025'], ['Placement Drive: Registration Open', 'Apr 02, 2025']] },
  library: { title: 'Library', columns: ['Book', 'Issued On', 'Due Date', 'Status'], rows: [
    ['Introduction to Algorithms', 'Mar 20, 2025', 'Apr 20, 2025', 'Issued'],
    ['Database System Concepts', 'Mar 02, 2025', 'Mar 30, 2025', 'Returned']] },
  fees: { title: 'Fees & Payments', columns: ['Description', 'Amount', 'Due Date', 'Status'], rows: [
    ['Tuition Fee - Sem 4', 'Rs. 45,000', 'Jan 15, 2025', 'Paid'], ['Exam Fee', 'Rs. 2,500', 'Mar 01, 2025', 'Paid'],
    ['Library Fee', 'Rs. 1,000', 'May 10, 2025', 'Pending']] }
};

const auth = (req, res, next) => {
  try { req.user = jwt.verify((req.headers.authorization || '').replace('Bearer ', ''), SECRET); next(); }
  catch { res.status(401).json({ message: 'Please login again' }); }
};

app.post('/api/auth/login', async (req, res) => {
  const { name, email, regNo } = req.body;
  if (!name || !email || !/^\d{5}$/.test(regNo || '')) return res.status(400).json({ message: 'Enter name, a valid email and a 5-digit register number' });
  if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ message: 'Invalid email address' });
  const student = await Student.findOneAndUpdate({ regNo }, { name, email }, { upsert: true, new: true, setDefaultsOnInsert: true });
  if (!(await Achievement.countDocuments({ regNo }))) {
    await Achievement.insertMany(seedAchievements.map(([title, description, category, date]) => ({ regNo, title, description, category, date })));
  }
  const token = jwt.sign({ regNo }, SECRET, { expiresIn: '1d' });
  res.json({ token, student });
});

app.get('/api/dashboard', auth, async (req, res) => {
  const student = await Student.findOne({ regNo: req.user.regNo });
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json({ student, stats: { courses: 8, attendance: '92%', cgpa: 8.6, exams: 3 }, notices: DATA.notices.rows.slice(0, 3) });
});

app.get('/api/achievements', auth, async (req, res) => {
  const q = { regNo: req.user.regNo };
  if (req.query.category && req.query.category !== 'All') q.category = req.query.category;
  res.json(await Achievement.find(q).sort({ _id: 1 }));
});

app.get('/api/section/:name', auth, async (req, res) => {
  if (req.params.name === 'profile') {
    const s = await Student.findOne({ regNo: req.user.regNo });
    return res.json({ title: 'Profile', columns: ['Field', 'Details'], rows: [['Name', s.name], ['Email', s.email], ['Registration No', s.regNo], ['Course', s.course]] });
  }
  const d = DATA[req.params.name];
  d ? res.json(d) : res.status(404).json({ message: 'Section not found' });
});

// Serves the built React app (used after deployment)
const dist = path.join(__dirname, '../frontend/dist');
if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.get('*', (req, res) => res.sendFile(path.join(dist, 'index.html')));
}

app.listen(process.env.PORT || 5000, () => console.log('Server running on port ' + (process.env.PORT || 5000)));
