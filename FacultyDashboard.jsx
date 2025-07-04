import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function FacultyDashboard() {
  const navigate = useNavigate();
  const [club, setClub] = useState({
    name: 'CodeCraft Club',
    president: 'Arjun Mehta',
    members: [
      { name: 'Nikita Das', email: 'nikita@example.com' },
      { name: 'Rohan Verma', email: 'rohan@example.com' },
      { name: 'Divya Iyer', email: 'divya@example.com' },
      { name: 'Karthik Menon', email: 'karthik@example.com' },
      { name: 'Simran Kaur', email: 'simran@example.com' },
    ]
  });

  const name = localStorage.getItem('name') || 'Faculty';

  useEffect(() => {
    // You can add fetch logic here later
  }, []);

  return (
    <div className="container mt-4">
      {/* Top Bar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-gradient">👩‍🏫 Welcome {name}</h2>
        <button className="btn btn-outline-danger" onClick={() => { localStorage.clear(); navigate('/'); }}>
          Logout
        </button>
      </div>

      {/* Club Name and President */}
      <div className="text-center mb-4">
        <h1 className="display-5 fw-bold purple-title">{club.name}</h1>
        <p className="lead text-muted">President: {club.president}</p>
      </div>

      {/* Faculty Feature Cards */}
      <div className="row g-4 mb-5">
        {[
          { text: '📊 View Club Reports', color: '#6f42c1' },
          { text: '📁 View Submitted Documents', color: '#7048e8' },
          { text: '🔍 Review Club Activities', color: '#5e32c6' }
        ].map((card, i) => (
          <div className="col-md-4" key={i}>
            <div className="card text-white text-center p-4 shadow border-0" style={{ background: card.color }}>
              <h5>{card.text}</h5>
            </div>
          </div>
        ))}
      </div>

      {/* Member List */}
      <h4 className="text-purple mb-3">👥 Club Members</h4>
      <ul className="list-group">
        {club.members.map((m, i) => (
          <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{m.name}</strong><br />
              <small className="text-muted">{m.email}</small>
            </div>
            <span className="badge bg-secondary">Member</span>
          </li>
        ))}
      </ul>

      {/* Styles */}
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
      `}</style>
    </div>
  );
}

export default FacultyDashboard;
