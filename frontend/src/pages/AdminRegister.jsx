import React, { useState } from "react";
import axios from "axios";

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    adminName: "",
    adminEmail: "",
    adminPassword: "",
    adminProfile: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "adminProfile") {
      setFormData({ ...formData, adminProfile: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("adminName", formData.adminName);
    data.append("adminEmail", formData.adminEmail);
    data.append("adminPassword", formData.adminPassword);
    data.append("adminProfile", formData.adminProfile);

    try {
      const res = await axios.post("http://localhost:5000/api/v1/admin-create", data);
      alert("Admin created successfully");
    } catch (err) {
      console.error(err.response.data.message);
      alert(err.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-xl rounded-lg space-y-4 w-96">
        <h2 className="text-xl font-bold text-center">Admin Register</h2>

        <input type="text" name="adminName" placeholder="Name" onChange={handleChange} className="border p-2 w-full rounded" />
        <input type="email" name="adminEmail" placeholder="Email" onChange={handleChange} className="border p-2 w-full rounded" />
        <input type="password" name="adminPassword" placeholder="Password" onChange={handleChange} className="border p-2 w-full rounded" />
        <input type="file" name="adminProfile" onChange={handleChange} className="border p-2 w-full rounded" />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Register</button>
      </form>
    </div>
  );
};

export default AdminRegister;
