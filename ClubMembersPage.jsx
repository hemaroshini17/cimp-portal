// ClubMembersPage.jsx

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ClubMembersPage() {
  const { id } = useParams();
  const [members, setMembers] = useState([]);
  const [students, setStudents] = useState([]);
  const [clubName, setClubName] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchMembers = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/clubs/${id}/members`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMembers(res.data);
    } catch (err) {
      console.error('Error fetching members', err);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users?role=student', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students', err);
    }
  };

  const fetchClubName = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/clubs`);
      const club = res.data.find((c) => c._id === id);
      if (club) setClubName(club.name);
    } catch (err) {
      console.error('Error fetching club name');
    }
  };

  useEffect(() => {
    fetchMembers();
    fetchStudents();
    fetchClubName();
  }, [id]);

  const addMember = async (memberId) => {
    try {
      await axios.post(`http://localhost:5000/api/clubs/${id}/add-member`, { memberId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMembers();
    } catch (err) {
      console.error('Error adding member', err);
    }
  };

  const removeMember = async (memberId) => {
    try {
      await axios.delete(`http://localhost:5000/api/clubs/${id}/remove-member/${memberId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMembers();
    } catch (err) {
      console.error('Error removing member', err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">👥 Members of {clubName}</h2>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>⬅ Back</button>
      </div>

      <div className="mb-4">
        <h5 className="text-primary">Current Members</h5>
        <ul className="list-group">
          {members.map((member) => (
            <li key={member._id} className="list-group-item d-flex justify-content-between align-items-center">
              {member.name} <button className="btn btn-sm btn-danger" onClick={() => removeMember(member._id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h5 className="text-success">Add New Member</h5>
        <select className="form-select" onChange={(e) => addMember(e.target.value)}>
          <option value="">-- Select a student --</option>
          {students.filter(s => !members.some(m => m._id === s._id)).map((student) => (
            <option key={student._id} value={student._id}>{student.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default ClubMembersPage;
