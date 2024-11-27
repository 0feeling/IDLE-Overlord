import React from 'react';
import './Footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Suivez-nous :</p>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="icon-facebook">
            <FacebookIcon /> Facebook
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="icon-youtube">
            <YouTubeIcon /> YouTube
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="icon-instagram">
            <InstagramIcon /> Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;


