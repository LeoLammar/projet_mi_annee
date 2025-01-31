import React from "react";


const HeaderWB: React.FC = () => {
  const handleLogout = () => {
    window.location.href = "./components/Dashboard.tsx"; // Redirection vers Google
  };

  return (
    <nav className="bg-gray-200 border-gray-400">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo Section */}
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="/media/EduLink-logo.png"
            className="w-12 h-12"
            alt="Edu Link logo"
          />
        </a>

        {/* Title Section */}
        <div className="text-center flex-1">
          <span className="font-bold text-xl text-[#3C6E71] italic font-poppins">Edu-Link</span>
        </div>

        {/* Bouton de déconnexion */}
        <button
          onClick={handleLogout}
          className="bg-[#FF2800] text-white font-bold py-2 px-6 rounded-full border-2 border-[#FF2800] transition duration-300 ease-in-out hover:bg-white hover:text-[#FF2800]"
        >
          Se déconnecter
        </button>
      </div>
    </nav>
  );
};

export default HeaderWB;
