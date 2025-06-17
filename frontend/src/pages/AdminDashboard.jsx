import React from "react";

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Admin Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 shadow rounded-lg bg-white">
          <h3 className="text-xl font-semibold text-blue-600">Total Faculties</h3>
          <p className="text-gray-700">12</p>
        </div>
        <div className="p-4 shadow rounded-lg bg-white">
          <h3 className="text-xl font-semibold text-blue-600">Total Students</h3>
          <p className="text-gray-700">56</p>
        </div>
        <div className="p-4 shadow rounded-lg bg-white">
          <h3 className="text-xl font-semibold text-blue-600">Courses</h3>
          <p className="text-gray-700">7</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;