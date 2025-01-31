import React from "react";
import Card from "./Card";

type CardData = {
  name: string;
  imageSrc: string;
};

const CardContainer: React.FC = () => {
  const cardsData: CardData[] = [
    { name: "Maxime", imageSrc: "./media/personne2.webp" },
    { name: "Emma", imageSrc: "./media/personne4.webp" },
    { name: "Patrick", imageSrc: "./media/personne1.webp" },
    { name: "Elodie", imageSrc: "./media/personne3.webp" },
  ];

  return (
    <div className="p-4 text-center">
      <h1
        className="mb-8 text-3xl font-bold italic text-black"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        Nos meilleurs mentors
      </h1>
      <div className="flex flex-wrap justify-center gap-20">
        {cardsData.map((card, index) => (
          <Card key={index} name={card.name} imageSrc={card.imageSrc} />
        ))}
      </div>
    </div>
  );
};

export default CardContainer;