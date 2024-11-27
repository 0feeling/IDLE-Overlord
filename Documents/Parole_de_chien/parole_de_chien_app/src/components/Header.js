import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo-Parole de chien-RVB.svg'; // Import the logo

function Header() {
  return (
    <header className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo Parole de Chien" />
        </Link>
        <nav className="nav-links">
          <Link to="/devenir-benevole">Devenir Bénévole</Link>
          <Link to="/notre-mission">Notre Mission</Link>
          <Link to="/notre-equipe">Notre Équipe</Link>
          <Link to="/nos-partenaires">Nos Partenaires</Link>
          <Link to="/nos-contacts">Nos Contacts</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
