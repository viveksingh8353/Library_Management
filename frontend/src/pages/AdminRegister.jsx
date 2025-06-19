import React, { useState } from 'react';
import axios from 'axios';

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    adminName: '',
    adminEmail: '',
    adminPassword: '',
    adminProfile: null
  });

  const handleChange = (e) => {
    if (e.target.name === 'adminProfile') {
      setFormData({ ...formData, adminProfile: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const form = new FormData();
  form.append('adminName', formData.adminName);
  form.append('adminEmail', formData.adminEmail);
  form.append('adminPassword', formData.adminPassword);
  form.append('adminProfile', formData.adminProfile); // image upload

  try {
    const res = await axios.post("http://localhost:5000/api/v1/admin-create", form, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    alert("Registration successful ✅");
    console.log(res.data);
  } catch (err) {
    console.error("❌ Error response:", err.response?.data || err.message);
    alert("Registration failed ❌");
  }
};

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/loginBG.jpg')" }} // image public folder me ho
    >
      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-[90%] max-w-md border border-white/30">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Admin Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="adminName"
            placeholder="Admin Name"
            className="w-full px-4 py-2 rounded bg-white/30 text-white placeholder-white border border-white/30 focus:outline-none focus:ring focus:ring-white"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="adminEmail"
            placeholder="Admin Email"
            className="w-full px-4 py-2 rounded bg-white/30 text-white placeholder-white border border-white/30 focus:outline-none focus:ring focus:ring-white"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="adminPassword"
            placeholder="Admin Password"
            className="w-full px-4 py-2 rounded bg-white/30 text-white placeholder-white border border-white/30 focus:outline-none focus:ring focus:ring-white"
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="adminProfile"
            accept="image/*"
            className="text-white"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-2 rounded-lg hover:scale-105 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
