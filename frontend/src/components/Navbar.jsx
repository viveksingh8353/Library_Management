import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';



const Navbar = () => {
  const { admin, logout } = useAuth();

  return (
    <nav className="bg-white p-4 shadow-md flex justify-between">
      <h1 className="text-xl font-bold text-blue-600">Library Admin</h1>
      <div className="space-x-4">
        <Link to="/admin-dashboard">Dashboard</Link>

        {!admin ? (
          <>
            <Link to="/admin-register">Register</Link>
            <Link to="/admin-login">Login</Link>
          </>
        ) : (
          <button onClick={logout} className="text-red-600 font-semibold">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
