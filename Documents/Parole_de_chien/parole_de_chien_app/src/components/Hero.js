import React from 'react';
import './Hero.css';
import danaBisou from '../assets/Dana-bisou.jpg'; // Correct import path

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Parole de Chien</h1>
        <p>
          Les bénévoles et leurs chiens apportent réconfort et joie aux personnes âgées isolées en EHPAD ou hôpitaux gériatriques.
        </p>
      </div>
      <div className="hero-image">
        <img src={danaBisou} alt="Chiens et personnes âgées" />
      </div>
    </section>
  );
}

export default Hero;
