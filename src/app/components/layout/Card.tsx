import React from 'react';
import { Link } from "react-router-dom";

interface CardProps {
  name: string;
  imageSrc: string;
}

const Card: React.FC<CardProps> = ({ name, imageSrc }) => {
  return (
    <div className="max-w-[14rem] bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-[#D9D9D9]">
      
      {/* Image avec gestion d'erreur */}
      <img 
        className="rounded-t-lg" 
        src={imageSrc || "/media/default-image.webp"} 
        alt={`Photo of ${name}`} 
      />

      {/* Contenu texte */}
      <div className="p-3 text-center">
        
        {/* Titre */}
        <h2 className="mb-2 text-lg font-bold tracking-tight text-[#3C6E71]">
          {name}
        </h2>

        {/* Bouton avec effet hover */}
        <Link to="/login">
          <button 
            aria-label={`Voir plus sur ${name}`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white 
              rounded-full focus:ring-4 focus:outline-none focus:ring-blue-300 
              bg-[#3C6E71] hover:bg-white hover:text-[#3C6E71] 
              hover:border-[#3C6E71] hover:border-2 transition-all duration-300"
          >
            Voir plus
          </button>
        </Link>
        
      </div>
    </div>
  );
};

export default Card;
