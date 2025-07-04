import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function RoleSelect() {
  const navigate = useNavigate();

  const roles = [
    { title: 'Admin', image: '/admin.png' },
    { title: 'President', image: '/president.png' },
    { title: 'Faculty', image: '/faculty.png' },
  ];

  return (
    <div className="bg-light min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#5c32c6" }}>
        <div className="container d-flex justify-content-between align-items-center">
          <img src="/vit-logo.png" alt="VIT Logo" style={{ height: 80 }} />
          <img src="/cimp-logo.png" alt="CIMP Logo" style={{ height: 70 }} />
        </div>
      </nav>

      {/* Welcome */}
      <div className="text-center mt-4">
        <h2 className="fw-bold text-primary">Welcome to CIMP Portal</h2>
        <p className="text-muted">Please select your role to continue</p>
      </div>

      {/* Role Cards */}
      <div className="container mt-5">
        <div className="row justify-content-center g-4">
          {roles.map((role, i) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              key={i}
              onClick={() => navigate(`/login/${role.title.toLowerCase()}`)} // ✅ this is correct
              style={{ cursor: 'pointer' }}
            >
              <div className="card text-center shadow border-0 p-4 h-100 role-card">
                <img
                  src={role.image}
                  alt={role.title}
                  className="mx-auto d-block mb-3"
                  style={{ height: 120 }}
                />
                <h5 className="fw-bold mb-0">{role.title}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hover effect */}
      <style>{`
        .role-card {
          transition: transform 0.3s ease-in-out;
        }
        .role-card:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}

export default RoleSelect;
