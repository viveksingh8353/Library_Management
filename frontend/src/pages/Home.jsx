import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, UserCircleIcon } from "@heroicons/react/24/outline";



const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/libraryBG.jpg')", // Make sure this image exists in public folder
      }}
    >
     <div className="bg-white/70 backdrop-blur-md p-10 rounded-3xl shadow-xl text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4 animate-pulse">
          📚 Welcome to Library Management System
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          Manage <span className="text-purple-600 font-semibold">faculties</span>, <span className="text-purple-600 font-semibold">students</span> and <span className="text-purple-600 font-semibold">courses</span> with ease.
        </p>
        <div className="flex justify-center gap-6">
          <Link to="/login">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-lg transition-transform hover:scale-105">
              <UserCircleIcon className="h-5 w-5" /> Admin Login
            </button>
          </Link>
          <Link to="/register">
            <button className="flex items-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-100 px-6 py-2 rounded-full text-lg transition-transform hover:scale-105">
              <ArrowRightIcon className="h-5 w-5" /> Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
