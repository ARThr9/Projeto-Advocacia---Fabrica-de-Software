// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const IconeLinkedIn = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const IconeInstagram = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-column">
          <Link to="/">
            <img
              src="https://skkyfidccddnqzsroxzr.supabase.co/storage/v1/object/public/imagens-servicos/Logo%20Advocacia%20Header.jpg"
              alt="Logo da Advocacia"
              className="footer-logo"
            />
          </Link>

          <p>
            Assessoria jurídica de confiança e excelência, dedicada a proteger
            seus direitos.
          </p>
        </div>

        <div className="footer-column">
          <h3>Contato</h3>
          <p>
            Rua Volutário Otto Gomes Martins, 1202
            <br />
            Sertãozinho, SP, 12345-678
          </p>
          <p>
            <strong>Email:</strong> contato@seuemail.com
          </p>
          <p>
            <strong>Telefone:</strong> (11) 98765-4321
          </p>
        </div>

        <div className="footer-column">
          <h3>Redes Sociais</h3>
          <div className="social-links">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <IconeLinkedIn />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <IconeInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {currentYear} Silvia Pereira Advocacia. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
