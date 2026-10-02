import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api.js';

export default function Dashboard() {
  const [d, setD] = useState(null);
  useEffect(() => { api.get('/dashboard').then(r => setD(r.data)); }, []);
  if (!d) return <p>Loading...</p>;
  const stats = [['Total Courses', d.stats.courses, 'c1'], ['Attendance', d.stats.attendance, 'c2'], ['CGPA', d.stats.cgpa, 'c3'], ['Upcoming Exams', d.stats.exams, 'c4']];
  const quick = [['results', '📝', 'Exam Results'], ['schedule', '📅', 'College Schedule'], ['activities', '🎭', 'Activities'], ['achievements', '🏆', 'Achievements']];
  return (
    <>
      <div className="banner"><h1>Dream • Learn • Achieve</h1><p>Your journey towards a brighter future</p></div>
      <div className="stats">{stats.map(([l, v, c]) => <div key={l} className={'stat ' + c}><small>{l}</small><b>{v}</b></div>)}</div>
      <h3>Quick Access</h3>
      <div className="quick">{quick.map(([k, i, l]) => <Link key={k} to={'/' + k} className="qcard"><span>{i}</span>{l}</Link>)}</div>
      <div className="card"><div className="row"><h3>Recent Notices</h3><Link to="/notices">View All</Link></div>
        {d.notices.map(([t, date]) => <div className="notice" key={t}><span>📌 {t}</span><small>{date}</small></div>)}</div>
    </>
  );
}
