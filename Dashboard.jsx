import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const name = localStorage.getItem('name');

  useEffect(() => {
    if (role === 'admin') {
      navigate('/admin-dashboard');
    }
    // Add more conditions for president/faculty if needed
  }, [role, navigate]);

  return (
    <div className="text-center mt-5">
      <h2>Welcome {name}!</h2>
      <p>You're logged in as {role}.</p>
    </div>
  );
}

export default Dashboard;

