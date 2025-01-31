"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

const interestsOptions = ["Informatique", "Sport", "Lecture", "Musique", "Jeux vidéo", "Voyage"];
const subjectsOptions = ["Mathématiques", "Physique", "Programmation", "Histoire", "Chimie", "Anglais"];

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    promotion: "",
    role: "Étudiant",
    interests: [] as string[], // Tableau pour stocker les intérêts sélectionnés
    favoriteSubjects: [] as string[], // Tableau pour stocker les matières préférées
  });

  const [message, setMessage] = useState("");

  // Fonction pour gérer les changements dans les checkboxes
  const handleCheckboxChange = (category: "interests" | "favoriteSubjects", value: string) => {
    setFormData((prev) => {
      const selected = prev[category].includes(value)
        ? prev[category].filter((item) => item !== value) // Si déjà coché, on retire
        : [...prev[category], value]; // Sinon, on ajoute
      return { ...prev, [category]: selected };
    });
  };

  // Fonction pour gérer les inputs texte et select
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Envoi du formulaire
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5000/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, calendar: [] }),
      });

      const data = await response.json();
      setMessage(data.message);

      if (data.success) {
        alert("Inscription réussie !");
        navigate("/");
      } else {
        alert("Erreur : " + data.message);
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      setMessage("Erreur lors de l'inscription.");
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-center text-2xl font-bold mb-6">INSCRIPTION</h2>
          <form className="space-y-4" onSubmit={handleRegister}>
            <input type="text" name="lastName" placeholder="Nom" className="w-full p-2 border rounded" onChange={handleChange} required />
            <input type="text" name="firstName" placeholder="Prénom" className="w-full p-2 border rounded" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Mot de passe" className="w-full p-2 border rounded" onChange={handleChange} required />
            <input type="text" name="promotion" placeholder="Numéro de promotion" className="w-full p-2 border rounded" onChange={handleChange} required />

            <select name="role" className="w-full p-2 border rounded" onChange={handleChange} required>
              <option value="Étudiant">Étudiant</option>
              <option value="Mentor">Mentor</option>
            </select>

            {/* Centres d'intérêt */}
            <div>
              <p className="font-semibold">Centres d'intérêt :</p>
              <div className="grid grid-cols-2 gap-2">
                {interestsOptions.map((interest) => (
                  <label key={interest} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={interest}
                      checked={formData.interests.includes(interest)}
                      onChange={() => handleCheckboxChange("interests", interest)}
                    />
                    <span>{interest}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Matières préférées */}
            <div>
              <p className="font-semibold">Matières préférées :</p>
              <div className="grid grid-cols-2 gap-2">
                {subjectsOptions.map((subject) => (
                  <label key={subject} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={subject}
                      checked={formData.favoriteSubjects.includes(subject)}
                      onChange={() => handleCheckboxChange("favoriteSubjects", subject)}
                    />
                    <span>{subject}</span>
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
              S'inscrire
            </button>
          </form>
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}

          <p className="mt-4 text-center">
            Déjà un compte ?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-500 hover:underline"
            >
              Connectez-vous ici
            </button>
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default RegisterPage;
