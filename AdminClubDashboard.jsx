// AdminClubDashboard.jsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminClubDashboard() {
  const [clubs, setClubs] = useState([]);
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [form, setForm] = useState({
    name: '', description: '', category: '', vision: '', mission: '', location: '', president: '', facultyCoordinator: ''
  });
  const [search, setSearch] = useState('');
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name') || 'Admin';
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);


  useEffect(() => {
    fetchUsers();
    if (showTable) fetchClubs();
  }, [showTable]);

  const fetchUsers = async () => {
    try {
      const studentRes = await axios.get('http://localhost:5000/api/users?role=student', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const facultyRes = await axios.get('http://localhost:5000/api/users?role=faculty', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(studentRes.data);
      setFaculty(facultyRes.data);
    } catch (err) {
      console.error('Error fetching users', err);
    }
  };

  const fetchClubs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/clubs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClubs(res.data);
    } catch (err) {
      console.error('Error fetching clubs', err);
    }
  };

  const handleDelete = async (clubId) => {
    if (!window.confirm('Are you sure you want to delete this club?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/clubs/${clubId}`, { headers: { Authorization: `Bearer ${token}` } });
      setClubs(clubs.filter((club) => club._id !== clubId));
    } catch (err) {
      console.error('Error deleting club', err);
    }
  };

  const handleEdit = (club) => {
  setSelectedClub(club); // needed for updateClub
  setForm({
    name: club.name,
    description: club.description,
    category: club.category,
    vision: club.vision || '',
    mission: club.mission || '',
    location: club.location || '',
    president: club.president?._id || '',
    facultyCoordinator: club.facultyCoordinator?._id || '',
  });
  setShowEditModal(true); // ✅ This line is currently missing in your code!
};

  const handleMembers = (club) => {
    navigate(`/club/${club._id}/members`);
  };

  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(search.toLowerCase()) ||
    club.category.toLowerCase().includes(search.toLowerCase())
  );
  const updateClub = async () => {
  try {
    await axios.put(`http://localhost:5000/api/clubs/${selectedClub._id}`, form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchClubs();
    setShowEditModal(false);
  } catch (err) {
    console.error('Error updating club', err);
  }
};


  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold display-5 text-gradient">👋 Welcome, {name}</h2>
        <button className="btn btn-danger shadow-sm px-4" onClick={() => { localStorage.clear(); navigate('/'); }}>Logout</button>
      </div>

      {/* Search bar shown before cards */}
      <div className="mb-5 text-center">
        <input
          type="text"
          placeholder="🔍 Search clubs..."
          className="form-control w-50 mx-auto shadow rounded-pill px-5"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {!showTable ? (
        <div className="row g-5 justify-content-center">
          {[
            { text: '📄 View All Clubs', bg: '#5e2ca5', onClick: () => setShowTable(true) },
            { text: '➕ Create Club', bg: '#7a3dc9', onClick: () => navigate('/create-club') },
            { text: '📊 Club Reports', bg: '#6c757d', onClick: () => alert('📊 Reports coming soon!') }
          ].map((card, idx) => (
            <div className="col-md-4" key={idx}>
              <div
                className="card text-center text-white border-0 p-5 shadow-lg h-100 d-flex justify-content-center align-items-center zoom-on-hover"
                style={{ cursor: 'pointer', backgroundColor: card.bg, minHeight: '160px', borderRadius: '20px' }}
                onClick={card.onClick}
              >
                <h5 className="fw-bold fs-5">{card.text}</h5>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <button className="btn btn-outline-dark" onClick={() => setShowTable(false)}>⬅ Back</button>
          </div>

          <div className="table-responsive">
            <table className="table table-purple">
            <thead style={{ background: 'linear-gradient(to right, #6a11cb, #2575fc)', color: 'Purple' }}>

                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>President</th>
                  <th>Faculty</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClubs.map((club) => (
                  <tr key={club._id}>
                    <td>{club.name}</td>
                    <td>{club.category}</td>
                    <td>{club.president?.name || 'N/A'}</td>
                    <td>{club.facultyCoordinator?.name || 'N/A'}</td>
                    <td>
                      <button className="btn btn-sm btn-primary me-1" onClick={() => handleEdit(club)}>✏️</button>
                      <button className="btn btn-sm btn-danger me-1" onClick={() => handleDelete(club._id)}>🗑️</button>
                      <button className="btn btn-sm btn-secondary" onClick={() => handleMembers(club)}>👥</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {showEditModal && (
  <div className="modal show fade d-block" tabIndex="-1" role="dialog">
    <div className="modal-dialog modal-lg" role="document">
      <div className="modal-content shadow">
        <div className="modal-header bg-primary text-white">
          <h5 className="modal-title">Edit Club</h5>
          <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
        </div>
        <div className="modal-body">
          <form>
            <div className="mb-3">
              <label>Club Name</label>
              <input type="text" className="form-control" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="mb-3">
              <label>Category</label>
              <input type="text" className="form-control" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
            </div>
            <div className="mb-3">
              <label>Description</label>
              <textarea className="form-control" rows="2" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}></textarea>
            </div>
            <div className="row">
              <div className="col">
                <label>President</label>
                <select className="form-select" value={form.president} onChange={e => setForm({ ...form, president: e.target.value })}>
                  <option value="">Select</option>
                  {students.map((s) => (
                    <option key={s._id} value={s._id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div className="col">
                <label>Faculty Coordinator</label>
                <select className="form-select" value={form.facultyCoordinator} onChange={e => setForm({ ...form, facultyCoordinator: e.target.value })}>
                  <option value="">Select</option>
                  {faculty.map((f) => (
                    <option key={f._id} value={f._id}>{f.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Close</button>
          <button type="button" className="btn btn-success" onClick={updateClub}>Save Changes</button>
        </div>
      </div>
    </div>
  </div>
)}


      <style>{`
        .text-gradient {
          background: linear-gradient(to right, #6a11cb, #2575fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .zoom-on-hover:hover {
          transform: scale(1.05);
          transition: all 0.3s ease-in-out;
        }
      `}</style>
      
    </div>
  );
}
<style>{`
  .text-gradient {
    background: linear-gradient(to right, #6a11cb, #2575fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .zoom-on-hover:hover {
    transform: scale(1.05);
    transition: all 0.3s ease-in-out;
  }
  .table-header-purple {
    background: linear-gradient(to right, #6a11cb, #2575fc);
    color: white;
  }
  .table-row:hover {
    background-color: #f5f0ff;
  }
`}</style>


export default AdminClubDashboard;

