import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/SideNavBar.css';

function SideNavBar() {
  return (
    <div className="side-navbar">
      <h2 className="side-navbar-title">Dashboard</h2>
      <ul className="side-navbar-links">
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/election">Your Elections</Link></li>
        <li><Link to="/participated">Participated Elections</Link></li>
      </ul>
    </div>
  );
}

export default SideNavBar;
