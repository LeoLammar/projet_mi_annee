import React from "react";
import Header from "./layout/Header";
import CallToAction from "./layout/CallToAction";
import CardContainer from "./layout/CardContainer";
import Testimonial from "./layout/Testimonial";
import Footer from "./layout/Footer";




export default function App() {
    return (
      <div className="min-h-screen bg-white">
        {/* Affiche le composant Profile */}
      <Header />
      <CallToAction />
      <CardContainer />
      <Testimonial />
      <Footer />
    </div>
    );
  }