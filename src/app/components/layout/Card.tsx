import React from 'react';

interface CardProps {
  name: string;
  imageSrc: string;
}

const Card: React.FC<CardProps> = ({ name, imageSrc }) => {
  return (
    <div className="max-w-[14rem] bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-[#D9D9D9]">
      <a href="#">
        <img 
          className="rounded-t-lg" 
          src={imageSrc} 
          alt={`Photo of ${name}`} 
        />
      </a>
      <div className="p-3 text-center">
        <a href="#">
          <h2 className="mb-2 text-lg font-bold tracking-tight" style={{ color: '#3C6E71' }}>
            {name}
          </h2>
        </a>
        <a 
          href="#" 
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white rounded-full focus:ring-4 focus:outline-none focus:ring-blue-300"
          style={{ backgroundColor: '#3C6E71', transition: 'background-color 0.3s, color 0.3s, border-color 0.3s' }}
        //   onMouseEnter={(e) => {
        //     (e.target as HTMLElement).style.backgroundColor = 'white';
        //     (e.target as HTMLElement).style.color = '#3C6E71';
        //     (e.target as HTMLElement).style.borderColor = '#3C6E71';
        //     (e.target as HTMLElement).style.borderWidth = '2px';
        //   }}
        //   onMouseLeave={(e) => {
        //     (e.target as HTMLElement).style.backgroundColor = '#3C6E71';
        //     (e.target as HTMLElement).style.color = 'white';
        //     (e.target as HTMLElement).style.borderColor = 'transparent';
        //     (e.target as HTMLElement).style.borderWidth = '0';
        //   }}
        >
          Read more
        </a>
      </div>
    </div>
  );
};

export default Card;
