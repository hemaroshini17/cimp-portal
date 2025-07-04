import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function LoginPage() {
  const { role } = useParams(); // 'admin', 'president', 'faculty'
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clubName, setClubName] = useState(''); // Club name input for president

  const handleLogin = () => {
    // Save values in localStorage
    localStorage.setItem('role', role);
    localStorage.setItem('name', email); // using email as name
    localStorage.setItem('token', 'dummy-token'); // dummy token
    localStorage.setItem('userId', 'dummy-user'); // dummy user
    if (role === 'president') localStorage.setItem('clubName', clubName); // Save club name only for president

    // Navigate to correct dashboard
    if (role === 'admin') navigate('/admin-dashboard');
    else if (role === 'president') navigate('/president-dashboard');
    else if (role === 'faculty') navigate('/faculty-dashboard');
    else navigate('/');
  };

  const isDisabled = !email || !password || (role === 'president' && !clubName);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: 500 }}>
        <h3 className="text-center mb-4 text-gradient">Login as {role}</h3>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter any email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter any password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {role === 'president' && (
          <div className="mb-3">
            <label>Club Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your club name"
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
            />
          </div>
        )}

        <button
          className="btn btn-primary w-100"
          onClick={handleLogin}
          disabled={isDisabled}
        >
          Login
        </button>
      </div>

      <style>{`
        .text-gradient {
          background: linear-gradient(to right, #6a11cb, #2575fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
}

export default LoginPage;

