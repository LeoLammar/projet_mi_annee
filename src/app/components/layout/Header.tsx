import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-[#D9D9D9]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo Section */}
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="./media/EduLink-logo.webp"
            className="logo-size" // Ajout d'une classe personnalisée
            alt="Edu Link logo"
          />
        </a>

        {/* Title Section */}
        <div className="text-center flex-1">
          <Link to="/" className="font-bold text-4xl text-[#3C6E71] italic font-poppins">
            Edu-Link
          </Link>
        </div>

        {/* Buttons Section */}
        <div className="flex space-x-3 rtl:space-x-reverse">
          <Link to="/login">
            <button type="button" className="text-white bg-[#3C6E71] hover:bg-[#3C6E78] font-medium rounded-4xl text-sm px-4 py-2 text-center dark:bg-[#3C6E71] dark:hover:bg-[#234142] dark:focus:bg-[#234142]">
              Rejoins-nous
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;