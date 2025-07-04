import { useEffect, useState } from 'react';
import axios from 'axios';

function CreateClub() {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');
  const [presidents, setPresidents] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [presidentId, setPresidentId] = useState('');
  const [facultyId, setFacultyId] = useState('');
  const [msg, setMsg] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch users by role
    const fetchUsers = async () => {
      const res = await axios.get('http://localhost:5000/api/users/roles', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPresidents(res.data.presidents);
      setFaculties(res.data.faculties);
    };
    fetchUsers();
  }, [token]);

  const handleCreate = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/clubs', {
        name,
        description: desc,
        category,
        president: presidentId,
        facultyCoordinator: facultyId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMsg('✅ Club created!');
    } catch (err) {
      setMsg('❌ ' + err.response?.data?.msg || 'Error');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create a New Club</h2>
      {msg && <div className="alert alert-info">{msg}</div>}
      <input className="form-control my-2" placeholder="Club Name" onChange={(e) => setName(e.target.value)} />
      <textarea className="form-control my-2" placeholder="Description" onChange={(e) => setDesc(e.target.value)} />
      <input className="form-control my-2" placeholder="Category" onChange={(e) => setCategory(e.target.value)} />

      <label>President:</label>
      <select className="form-control" onChange={(e) => setPresidentId(e.target.value)}>
        <option value="">Select</option>
        {presidents.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
      </select>

      <label className="mt-2">Faculty:</label>
      <select className="form-control" onChange={(e) => setFacultyId(e.target.value)}>
        <option value="">Select</option>
        {faculties.map(f => <option key={f._id} value={f._id}>{f.name}</option>)}
      </select>

      <button className="btn btn-primary mt-3" onClick={handleCreate}>Create Club</button>
    </div>
  );
}

export default CreateClub;
