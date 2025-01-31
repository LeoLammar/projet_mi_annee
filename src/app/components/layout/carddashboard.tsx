import React from "react";

interface CardDashboardProps {
  image: string;
  title: string;
  description: string;
  url: string;
  onClick?: () => void;
}

const CardDashboard: React.FC<CardDashboardProps> = ({ image, title, description, url, onClick }) => {
  return (
    <div
      className="max-w-[14rem] h-[24rem] bg-gray-200 border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:scale-105 transition-transform"
      onClick={onClick}
    >
      <a href="#">
        <img className="rounded-t-lg w-full h-[13rem] object-cover" src={image} alt={title} />
      </a>
      <div className="p-3 text-center">
        <a href="#">
          <h2 className="mb-2 text-lg font-bold tracking-tight text-[#3C6E71]">
            {title}
          </h2>
        </a>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 mt-3 text-sm font-medium text-center text-white rounded-full focus:ring-4 focus:outline-none focus:ring-blue-300"
          style={{ backgroundColor: '#3C6E71', transition: 'background-color 0.3s, color 0.3s, border-color 0.3s' }}
          onMouseEnter={(e) => {
            const target = e.target as HTMLAnchorElement;
            target.style.backgroundColor = 'white';
            target.style.color = '#3C6E71';
            target.style.borderColor = '#3C6E71';
            target.style.borderWidth = '2px';
          }}
          onMouseLeave={(e) => {
            const target = e.target as HTMLAnchorElement;
            target.style.backgroundColor = '#3C6E71';
            target.style.color = 'white';
            target.style.borderColor = 'transparent';
            target.style.borderWidth = '0';
          }}
        >
          Voir plus
        </a>
      </div>
    </div>
  );
};

export default CardDashboard;
