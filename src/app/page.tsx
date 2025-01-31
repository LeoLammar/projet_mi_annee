"use client";
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Accueil from "./components/Accueil";
import Profil from "./components/PageProfil";
import Calendar from "./components/Calendar";
import Navbar from "./components/Navbar"; // Optionnel, si tu veux une barre de navigation
import App from "./components/App";
import RegisterPage from "./components/RegisterPage";
import "./globals.css";
import Dashboard from "./components/Dashboard";

const Page: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar /> {/* Barre de navigation */}
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <App />
      </div>
    </Router>
  );
};

export default Page;