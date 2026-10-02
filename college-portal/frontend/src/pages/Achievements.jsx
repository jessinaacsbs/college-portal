import { useEffect, useState } from 'react';
import api from '../api.js';
const CATS = ['All', 'Academic', 'Sports', 'Cultural', 'Technical', 'Others'];
const ICON = { Technical: '💻', Sports: '🏆', Others: '⭐', Cultural: '🎵', Academic: '📖' };

export default function Achievements() {
  const [cat, setCat] = useState('All'); const [list, setList] = useState([]);
  useEffect(() => { api.get('/achievements', { params: { category: cat } }).then(r => setList(r.data)); }, [cat]);
  return (
    <>
      <h2>My Achievements</h2><p className="muted">Celebrating your hard work and success!</p>
      <div className="chips">{CATS.map(c => <button key={c} className={'chip' + (c === cat ? ' on' : '')} onClick={() => setCat(c)}>{c}</button>)}</div>
      {list.map(a => (
        <div className="card ach" key={a._id}>
          <div className="aicon">{ICON[a.category]}</div>
          <div style={{ flex: 1 }}><b>{a.title}</b><p className="muted small">{a.description}</p><small>{a.date}</small></div>
          <span className="tag">{a.category}</span>
        </div>
      ))}
      {!list.length && <p className="muted">No achievements in this category yet.</p>}
    </>
  );
}
