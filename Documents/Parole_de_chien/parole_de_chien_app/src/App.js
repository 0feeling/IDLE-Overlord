import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/devenir-benevole" element={<div>Devenir Bénévole</div>} />
        <Route path="/notre-mission" element={<div>Notre Mission</div>} />
        <Route path="/notre-equipe" element={<div>Notre Équipe</div>} />
        <Route path="/nos-partenaires" element={<div>Nos Partenaires</div>} />
        <Route path="/nos-contacts" element={<div>Nos Contacts</div>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
