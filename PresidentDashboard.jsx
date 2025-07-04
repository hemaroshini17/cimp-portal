import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PresidentDashboard() {
  const [club] = useState({ name: 'CodeCraft Club' });
  const [members, setMembers] = useState([
    { name: 'Aarav Chatterjee', email: 'aarav@example.com' },
    { name: 'Sneha Nair', email: 'sneha@example.com' },
    { name: 'Vikram Iyer', email: 'vikram@example.com' },
    { name: 'Meera Menon', email: 'meera@example.com' },
    { name: 'Pranav Raj', email: 'pranav@example.com' }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', email: '' });
  const name = localStorage.getItem('name') || 'President';
  const navigate = useNavigate();

  const handleAddMember = () => {
    if (!newStudent.name || !newStudent.email) return;
    setMembers([...members, newStudent]);
    setNewStudent({ name: '', email: '' });
    setShowModal(false);
  };

  const handleRemoveMember = (index) => {
    const updated = [...members];
    updated.splice(index, 1);
    setMembers(updated);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-gradient">👑 Welcome President {name}</h2>
        <button className="btn btn-outline-danger" onClick={() => { localStorage.clear(); navigate('/'); }}>Logout</button>
      </div>

      <div className="text-center mb-4">
        <h1 className="display-5 fw-bold purple-title">{club.name}</h1>
      </div>

      <div className="row g-4 mb-5">
        {[
          { text: '🎉 Events', color: '#6f42c1' },
          { text: '📋 View Proposals', color: '#7048e8' },
          { text: '📝 Submit Budget', color: '#5e32c6' }
        ].map((card, idx) => (
          <div className="col-md-4" key={idx}>
            <div className="card text-white text-center p-4 shadow border-0" style={{ background: card.color }}>
              <h5>{card.text}</h5>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold text-purple">👥 Club Members</h4>
        <button className="btn btn-purple" onClick={() => setShowModal(true)}>➕ Add Member</button>
      </div>

      <ul className="list-group">
        {members.map((m, i) => (
          <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{m.name}</strong><br />
              <small className="text-muted">{m.email}</small>
            </div>
            <div>
              <button className="btn btn-sm btn-outline-primary me-2">✏️</button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => handleRemoveMember(i)}>❌</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Add Member Modal */}
      {showModal && (
        <div className="modal show fade d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content shadow">
              <div className="modal-header bg-purple text-white">
                <h5 className="modal-title">Add New Member</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Student Name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                />
                <input
                  type="email"
                  className="form-control"
                  placeholder="Student Email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-purple" onClick={handleAddMember}>Add</button>
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
        .purple-title {
          font-size: 2.5rem;
          color: #6f42c1;
        }
        .text-purple {
          color: #6f42c1;
        }
        .btn-purple {
          background-color: #6f42c1;
          color: white;
        }
        .btn-purple:hover {
          background-color: #5a32a3;
        }
        .bg-purple {
          background-color: #6f42c1;
        }
      `}</style>
    </div>
  );
}

export default PresidentDashboard;

