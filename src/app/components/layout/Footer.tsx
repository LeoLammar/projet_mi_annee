import React from 'react';

const Footer = () => {
  return (
    <footer className="rounded-lg shadow-sm m-4" style={{ backgroundColor: '#3C6E71' }}>
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="#" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src="../../media/EduLink-logo.png" className="h-8" alt="Edu Link Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Edu-Link</span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">À propos</a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">Vos données</a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">Licence</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Contact</a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-white sm:text-center">
          © 2025 <a href="https://ikea.com/fr/fr" className="hover:underline">Edu-Link</a>. Tous droits réservés.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
