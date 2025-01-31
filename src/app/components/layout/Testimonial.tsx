import React from 'react';

interface TestimonialProps {
  text: string;
  author: string;
  role: string;
  imageSrc: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ text, author, role, imageSrc }) => {
  return (
    <div className="text-center mt-16 bg-[#D9D9D9] py-10">
      <h2 className="text-2xl font-bold italic text-black" style={{ fontFamily: 'Poppins, sans-serif' }}>
        Ils parlent de nous
      </h2>

      <figure className="max-w-screen-md mx-auto text-center mt-8 transition-transform transform hover:scale-105 duration-300">
        <svg
          className="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 14"
        >
          <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
        </svg>

        {/* Texte du témoignage */}
        <blockquote>
          <p className="text-3xl italic font-medium text-black">
            {text}
          </p>
        </blockquote>

        {/* Auteur du témoignage */}
        <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
          <img
            className="w-10 h-10 rounded-full"
            src={imageSrc}
            alt={`Photo de ${author}`}
          />
          <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 dark:divide-gray-700">
            <cite className="pe-3 font-medium text-black">{author}</cite>
            <cite className="ps-3 text-sm text-gray-500 dark:text-gray-400">{role}</cite>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};

// Définition de plusieurs témoignages
const TestimonialSection: React.FC = () => {
  const testimonials = [
    {
      text: "Avec Edu-Link, chaque étudiant de l’ISEN trouve un mentor, un guide et une inspiration pour transformer ses ambitions en réussites.",
      author: "Pierre Dubois",
      role: "Spécialiste des mathématiques",
      imageSrc: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png",
    },
    {
      text: "Edu-Link, c’est bien plus qu’une plateforme : c’est un pont entre les étudiants et les mentors, un espace d’échange où l’expérience éclaire l’avenir.",
      author: "David Mele",
      role: "Enseignant chercheur",
      imageSrc: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png",
    },
  ];

  return (
    <div className="bg-[#D9D9D9] py-10">
      {testimonials.map((testimonial, index) => (
        <Testimonial key={index} {...testimonial} />
      ))}
    </div>
  );
};

export default TestimonialSection;
