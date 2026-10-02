import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api.js';

export default function Section() {
  const { name } = useParams(); const [d, setD] = useState(null);
  useEffect(() => { setD(null); api.get('/section/' + name).then(r => setD(r.data)).catch(() => setD({ title: 'Not found', columns: [], rows: [] })); }, [name]);
  if (!d) return <p>Loading...</p>;
  return (
    <div className="card"><h2>{d.title}</h2>
      <table><thead><tr>{d.columns.map(c => <th key={c}>{c}</th>)}</tr></thead>
        <tbody>{d.rows.map((r, i) => <tr key={i}>{r.map((v, j) => <td key={j}>{v}</td>)}</tr>)}</tbody></table>
    </div>
  );
}
