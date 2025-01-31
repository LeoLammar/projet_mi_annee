import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  // 🔹 Vérifie l'authentification au chargement
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  // 🔹 Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false); // Met à jour l'état
    navigate("/"); // Redirige vers la page de connexion
  };

  if (!isAuthenticated) {
    return null; // Cache la Navbar si l'utilisateur n'est pas connecté
  }

  return (
    <nav className="p-4 bg-gray-800 text-white">
      <ul className="flex space-x-4">
        <li><Link to="/accueil">Accueil</Link></li>
        <li><Link to="/profil">Profil</Link></li>
        <li><Link to="/calendar">Calendrier</Link></li>
        <li>
          <button onClick={handleLogout} className="text-red-400">
            Déconnexion
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
