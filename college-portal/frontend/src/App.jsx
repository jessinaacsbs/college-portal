import { Routes, Route, Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Achievements from './pages/Achievements.jsx';
import Section from './pages/Section.jsx';

const MENU = [
  ['dashboard', 'Dashboard', '🏠'], ['profile', 'Profile', '👤'], ['results', 'Exam Results', '📝'],
  ['schedule', 'College Schedule', '📅'], ['attendance', 'Attendance', '✅'], ['activities', 'Co-curricular Activities', '🎭'],
  ['achievements', 'Achievements', '🏆'], ['notices', 'Notices', '🔔'], ['library', 'Library', '📚'], ['fees', 'Fees & Payments', '💳']
];

function Layout() {
  const nav = useNavigate();
  const student = JSON.parse(localStorage.getItem('student') || '{}');
  const logout = () => { localStorage.clear(); nav('/'); };
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">🎓 College Portal</div>
        {MENU.map(([key, label, icon]) => (
          <NavLink key={key} to={'/' + key} className={({ isActive }) => 'navitem' + (isActive ? ' active' : '')}>
            <span>{icon}</span>{label}
          </NavLink>
        ))}
        <button className="navitem logout" onClick={logout}><span>🚪</span>Logout</button>
      </aside>
      <main className="content">
        <header className="topbar">
          <div><h2>Welcome, {student.name}!</h2>
            <small>Registration No: {student.regNo} | {student.course}</small></div>
          <div className="avatar">{(student.name || '?')[0].toUpperCase()}</div>
        </header>
        <Outlet />
      </main>
    </div>
  );
}

const Private = ({ children }) => localStorage.getItem('token') ? children : <Navigate to="/" />;

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<Private><Layout /></Private>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/:name" element={<Section />} />
      </Route>
    </Routes>
  );
}
