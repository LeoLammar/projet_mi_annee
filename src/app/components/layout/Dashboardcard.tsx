import React from 'react';
import CardDashboard from './carddashboard';

interface CardData {
  title: string;
  description: string;
  image: string;
  url: string;
}

const DashboardCard: React.FC = () => {
  const cardsData: CardData[] = [
    { title: 'Edu-Link', description: 'Rechercher votre mentor ou votre étudiant', image: '/media/school.svg', url: 'https://www.karminecorp.fr/collections/pro-kit-2025/products/maillot-pro-2025' },
    { title: 'Message', description: 'Accéder à votre messagerie privée', image: '/media/message.svg', url: 'https://www.boutique-losc.fr/fr' },
    { title: 'Calendrier', description: 'Planifier vos séances de mentorat', image: '/media/calendar.svg', url: 'https://www.leroymerlin.fr/' },
    { title: 'Profil', description: 'Modifier vos informations personnelles', image: '/media/user.svg', url: 'https://www.google.com/search?num=10&newwindow=1&sca_esv=c7459735fc04b658&sxsrf=AHTn8zpmAP2Os4k1t1ATo9YQnsPqrCjK_A:1738189440373&q=lensois+bourr%C3%A9&udm=2&fbs=ABzOT_BnMAgCWdhr5zilP5f1cnRvJ3SHQcDVxkdpDyHwlRhdNfno-ClRh0PKqyvFYyTkfIfJOoyi6rL2ScSJ67dNoiLlMWEa4QTgvKiwWpVPHfvfFl6C6UKP40sBFgK-aVZi7_cLiNt0er8CvMg8Fwbey-kQrzLZL27-98exL8BCUTeW6KBI2kM&sa=X&ved=2ahUKEwjK_ZSh_JuLAxVPcKQEHb-8BFMQtKgLegQIExAB&biw=1495&bih=702&dpr=1.25' },
    { title: 'THIA', description: 'Votre assistant IA pour vos cours', image: '/media/user-screen.svg', url: 'https://papertoilet.com/' }
  ];

  return (
    <div className="mt-20 mb-32 p-4 text-center">
      <div className="flex flex-wrap justify-center gap-10">
        {cardsData.map((card, index) => (
          <CardDashboard 
            key={index} 
            title={card.title} 
            description={card.description} 
            image={card.image} 
            url={card.url} 
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardCard;
