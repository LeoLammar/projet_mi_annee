import React from "react";
import { Link } from "react-router-dom";
// Importation directe de l'image
import imageSrc from "./media/mentorat-calltoaction.webp";

const CallToAction: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-white gap-8">
      {/* Left Section: Content */}
      <div className="md:w-1/2 w-full order-2 md:order-1">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Rejoignez-nous</h1>
        <p className="text-gray-600 mb-6">
          Découvrez notre programme de mentorat conçu pour vous aider à atteindre vos objectifs professionnels et personnels.
          Rejoignez une communauté passionnée et bénéficiez de conseils personnalisés.
        </p>
        <Link to="/login">
          <button
            type="button"
            className="text-white bg-[#3C6E71] hover:bg-[#3C6E78] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-lg px-6 py-3 text-center dark:bg-[#3C6E71] dark:hover:bg-[#234142] dark:focus:bg-[#234142] transition-all"
          >
            Rejoins-nous
          </button>
        </Link>
      </div>

      {/* Right Section: Image */}
      <div className="md:w-1/2 w-full order-1 md:order-2">
        { 
          <img 
            src="/media/mentorat-calltoaction.webp" 
            alt="Illustration du mentorat" 
            className="w-full h-auto object-cover rounded-lg shadow-md transition-transform transform hover:scale-105" 
/>
         }
      </div>
    </div>
  );
};

export default CallToAction;