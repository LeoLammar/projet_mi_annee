"use client";
import React from "react";
import HeaderWB from "./layout/header-without-button";
import DashboardCard from "./layout/Dashboardcard";
import Footer from "./layout/Footer";



const Dashboard: React.FC = () => {
  return (
    <div>
      <HeaderWB />
      <DashboardCard />
      <Footer />
    </div>
  );
}

export default Dashboard;