import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="navbar bg-base-100 shadow-md px-6">
      
      {/* Left: Logo */}
      <div className="flex-1">
        <Link
          to="/"
          className="text-xl font-bold text-primary hover:opacity-80 transition"
        >
          Stack<span className="text-secondary">Lite</span>
        </Link>
      </div>
      <Link to="/ask" className="btn btn-primary btn-sm">
        Ask Question
      </Link>


      {/* Center: Home link */}
      <div className="hidden md:flex gap-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `btn btn-sm ${
              isActive ? "btn-primary" : "btn-ghost"
            }`
          }
        >
          Home
        </NavLink>
      </div>

      {/* Right: Auth buttons */}
      <div className="flex gap-2">
        {!user ? (
          <>
            <Link to="/login" className="btn btn-sm btn-outline">
              Login
            </Link>
            <Link to="/register" className="btn btn-sm btn-primary">
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="badge badge-outline">
              @{user.username}
            </span>
            <button
              onClick={logout}
              className="btn btn-sm btn-error btn-outline"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
