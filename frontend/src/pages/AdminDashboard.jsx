import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const AdminDashboard = () => {
  const { admin } = useAuth();
  const [facultyCount, setFacultyCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [bookCount, setBookCount] = useState(0); // Optional static/mock value

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/faculity-all/admin/${admin?._id}`);
        setFacultyCount(res.data?.data?.length || 0);
        setBookCount(120); // Replace with actual fetch if needed
        setStudentCount(350); // Replace with actual fetch if needed
      } catch (err) {
        console.error("Error fetching faculty:", err.message);
      }
    };

    if (admin?._id) {
      fetchCounts();
    }
  }, [admin]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 p-6 md:p-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800 drop-shadow-sm">
        Welcome to Dashboard
      </h1>

      {/* Admin Info Card */}
      <div className="flex justify-center mb-12">
        <div className="bg-white/90 backdrop-blur-md shadow-xl p-6 rounded-2xl w-full max-w-md text-center border border-gray-200">
          <img
            src={`http://localhost:5000/admin/${admin?.adminProfile}`}
            alt="Admin"
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-purple-500 shadow-md"
          />
          <h2 className="text-2xl font-bold text-gray-800">{admin?.adminName}</h2>
          <p className="text-gray-600">{admin?.adminEmail}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg p-6 rounded-xl hover:scale-105 transition-all duration-300 text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-1">📚 Total Books</h3>
          <p className="text-2xl font-bold text-indigo-600">{bookCount}</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-xl hover:scale-105 transition-all duration-300 text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-1">👨‍🏫 Total Faculty</h3>
          <p className="text-2xl font-bold text-indigo-600">{facultyCount}</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-xl hover:scale-105 transition-all duration-300 text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-1">👨‍🎓 Total Students</h3>
          <p className="text-2xl font-bold text-indigo-600">{studentCount}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
