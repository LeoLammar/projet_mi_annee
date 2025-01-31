"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (isAuthenticated) {
      navigate("/accueil");
    }
  }, [navigate]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/connexion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setMessage(data.message);

      if (data.success) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userId", data.userId);
        window.location.reload(); 
        navigate("/accueil");
      } else {
        alert("Échec de la connexion : " + data.message);
      }
    } catch (error) {
      console.error("Erreur lors de la connexion", error);
      setMessage("Erreur lors de la connexion.");
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-center text-2xl font-bold mb-6">LOGIN PAGE</h2>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">EMAIL</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 mt-1 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">PASSWORD</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 mt-1 border rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
              Login
            </button>
          </form>
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}
          
          {/* Lien vers la page d'inscription */}
          <p className="mt-4 text-center">
            Pas encore de compte ?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue-500 hover:underline"
            >
              Créez un compte
            </button>
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default LoginPage;
