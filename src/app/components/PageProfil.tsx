import React from "react";
import Profil from "./layout/Profil";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import CardContainer from "./layout/CardContainer";
//import Card from "./layout/Card";



export default function App() {
    return (
      <div>
        {/* Affiche le composant Profile */}
        <Header />
        <Profil />
        <Footer />
      </div>
    );
}