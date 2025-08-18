import React from 'react';
import SideNavBar from '../components/SideNavBar';
import './Styles/DashboardPage.css'; 

function DashboardPage() {
  return (
    <div className="dashboard-layout">
      <SideNavBar />
      <div className="dashboard-content">

        <h2>Welcome to the Dashboard</h2>
      </div>
    </div>
  );
}

export default DashboardPage;
