// components/FacultyForm.jsx
import React, { useState } from "react";
import axios from "axios";

const FacultyForm = ({ onSuccess, initialData = {} }) => {
  const [form, setForm] = useState({
    facultyName: initialData.facultyName || "",
    facultyEmail: initialData.facultyEmail || "",
    ...initialData,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = initialData._id
      ? `http://localhost:5000/api/v1/faculity-update/${initialData._id}`
      : `http://localhost:5000/api/v1/faculity-create`;

    const method = initialData._id ? "put" : "post";

    try {
      await axios[method](url, form);
      onSuccess();
    } catch (err) {
      alert("Error saving faculty");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-lg font-bold mb-2">
        {initialData._id ? "Edit Faculty" : "Add Faculty"}
      </h2>
      <input
        name="facultyName"
        placeholder="Faculty Name"
        value={form.facultyName}
        onChange={handleChange}
        className="w-full border p-2 mb-2 rounded"
        required
      />
      <input
        name="facultyEmail"
        placeholder="Faculty Email"
        value={form.facultyEmail}
        onChange={handleChange}
        className="w-full border p-2 mb-2 rounded"
        required
      />
      <button className="bg-blue-600 text-white py-2 px-4 rounded">
        {initialData._id ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default FacultyForm;
