import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Styles/TopNavBar.css';

function TopNavBar() {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = sessionStorage.getItem('id');
    setUserId(sessionId);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('id');
    setUserId(null);
    navigate('/');  // SPA navigation back to home
  };

  return (
    <nav className="top-navbar">
      <div className="top-navbar-left">
        <h1 className="top-navbar-logo">🗳 VoterApp</h1>
      </div>
      <div className="top-navbar-right">
        <ul className="top-navbar-links">
          {userId ? (
            <>
              <li><Link to="/winners">Winners</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li>
                <button onClick={handleLogout} className="logout-btn" type="button">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Register</Link></li>
              <li><Link to="/winners">Winners</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default TopNavBar;
