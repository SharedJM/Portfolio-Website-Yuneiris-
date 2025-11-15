import React from 'react';
import { portfolioData } from '../../data';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        Made with <span className="heart">♥</span> by{' '}
        <a 
          href={portfolioData.socialLinks.find(link => link.name === 'GitHub')?.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="footer-link"
        >
          Julian Mangual
        </a>
      </p>
    </footer>
  );
};

export default Footer;
