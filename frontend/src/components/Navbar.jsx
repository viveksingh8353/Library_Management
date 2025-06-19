import React from "react";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  RectangleGroupIcon,
  UserPlusIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext"; // ✅ import your auth context

const Navbar = () => {
  const { admin, logout } = useAuth(); // ✅ get admin and logout from context

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 shadow-xl text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">📚 Library Manager</h1>
      <ul className="flex gap-8 font-medium">
        <li className="hover:scale-105 transition-transform">
          <Link to="/" className="flex items-center gap-1">
            <HomeIcon className="h-5 w-5" /> Home
          </Link>
        </li>

        {admin && (
          <li className="hover:scale-105 transition-transform">
            <Link to="/admin-dashboard" className="flex items-center gap-1">
              <RectangleGroupIcon className="h-5 w-5" /> Dashboard
            </Link>
          </li>
        )}

        {!admin && (
          <>
            <li className="hover:scale-105 transition-transform">
              <Link to="/admin-register" className="flex items-center gap-1">
                <UserPlusIcon className="h-5 w-5" /> Register
              </Link>
            </li>
            <li className="hover:scale-105 transition-transform">
              <Link to="/admin-login" className="flex items-center gap-1">
                <ArrowRightOnRectangleIcon className="h-5 w-5" /> Login
              </Link>
            </li>
          </>
        )}

        {admin && (
          <li className="hover:scale-105 transition-transform">
            <button
              onClick={logout}
              className="flex items-center gap-1 hover:text-yellow-300"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" /> Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
