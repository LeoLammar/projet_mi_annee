import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Utilisation correcte pour React 18
import App from "./App"; // Assure-toi que App est bien en .tsx
import "./styles.css"; // Import du style global

// 📌 Trouve l'élément root et assure-toi qu'il existe
const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("⚠️ Erreur: Élément root introuvable !");
}