import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RoleSelect from './pages/RoleSelect';
import Dashboard from './pages/Dashboard';
import CreateClub from './pages/CreateClub';
import AdminClubDashboard from './pages/AdminClubDashboard';
import ClubMembersPage from './pages/ClubMembersPage';
import PresidentDashboard from './pages/PresidentDashboard';
import LoginPage from './pages/LoginPage';
import FacultyDashboard from './pages/FacultyDashboard';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleSelect />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-club" element={<CreateClub />} />
        <Route path="/admin-dashboard" element={<AdminClubDashboard />} />
        <Route path="/club/:id/members" element={<ClubMembersPage />} />
        <Route path="/president-dashboard" element={<PresidentDashboard />} />
        <Route path="/login/:role" element={<LoginPage />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
