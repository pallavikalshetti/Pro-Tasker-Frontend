import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();  
    return (
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">Pro-Tasker</Link>
          <ul className="navbar-links">
            {user ? (
              <>
                <li><Link to="/dashboard" className="navbar-link">Dashboard</Link></li>
                <li><button className="navbar-link" onClick={logout}>Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="navbar-link">Login</Link></li>
                <li><Link to="/register" className="navbar-link">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </nav>
    );
  }

export default Navbar;