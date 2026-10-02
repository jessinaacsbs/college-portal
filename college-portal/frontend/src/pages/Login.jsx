import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api.js';

export default function Login() {
  const nav = useNavigate();
  const [f, setF] = useState({ name: '', email: '', regNo: '' });
  const [err, setErr] = useState(''); const [busy, setBusy] = useState(false);
  const set = k => e => setF({ ...f, [k]: e.target.value });

  const submit = async e => {
    e.preventDefault(); setErr('');
    if (!/^\d{5}$/.test(f.regNo)) return setErr('Register number must be exactly 5 digits');
    setBusy(true);
    try {
      const { data } = await api.post('/auth/login', f);
      localStorage.setItem('token', data.token); localStorage.setItem('student', JSON.stringify(data.student));
      nav('/dashboard');
    } catch (ex) { setErr(ex.response?.data?.message || 'Cannot reach server. Is the backend running?'); }
    setBusy(false);
  };

  return (
    <div className="login-wrap">
      <div className="login-hero">
        <h1>Welcome to<br />Your College Portal</h1>
        <p>Learn • Grow • Achieve</p>
        <ul><li>📄 Access your academic records</li><li>📅 Stay updated with college events</li>
          <li>🔍 Explore opportunities</li><li>🚀 Build your future</li></ul>
      </div>
      <form className="login-card" onSubmit={submit}>
        <div className="logo">🎓</div>
        <h2>Student Login</h2><p className="muted">Enter your details to continue</p>
        <label>Full Name<input required placeholder="Enter your name" value={f.name} onChange={set('name')} /></label>
        <label>Email Address<input required type="email" placeholder="Enter your email" value={f.email} onChange={set('email')} /></label>
        <label>Register Number (5 digits)<input required maxLength={5} placeholder="e.g. 12345" value={f.regNo}
          onChange={e => setF({ ...f, regNo: e.target.value.replace(/\D/g, '') })} /></label>
        {err && <div className="error">{err}</div>}
        <button className="btn" disabled={busy}>{busy ? 'Logging in...' : 'Login'}</button>
        <p className="muted small">Don't have an account? Contact your college admin.</p>
      </form>
    </div>
  );
}
