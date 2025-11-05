// src/components/layout/Header/Header.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

// Ícone do WhatsApp em SVG
const IconeWhatsApp = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="main-header">
        <div className="header-content">
          <div className="header-left">
            <button
              onClick={toggleMenu}
              className={`menu-toggle ${isMenuOpen ? "is-active" : ""}`}
              aria-label="Menu"
            >
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
          </div>

          <div className="header-center">
            <Link to="/" className="logo-link">
              <img
                src="https://skkyfidccddnqzsroxzr.supabase.co/storage/v1/object/public/imagens-servicos/Logo%20Advocacia%20Header.jpg"
                alt="Logo da Advocacia"
                className="logo-image"
              />
            </Link>
          </div>

          <div className="header-right">
            {/* Este é o botão do Desktop */}
            <a
              href="https://wa.me/551639459066"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-button-desktop" // Classe correta
            >
              Chame no WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* Menu Overlay */}
      <div className={`overlay-menu ${isMenuOpen ? "open" : ""}`}>
        <nav className="overlay-nav">
          {/* ======================================= */}
          {/* --- A CORREÇÃO ESTÁ AQUI (LINKS DE VOLTA) --- */}
          {/* ======================================= */}

          <Link to="/" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/sobre" onClick={toggleMenu}>
            Sobre nós
          </Link>
          <Link to="/servicos" onClick={toggleMenu}>
            Áreas de Atuação
          </Link>
          <Link to="/certificados" onClick={toggleMenu}>
            Certificações
          </Link>
          <Link to="/contato" onClick={toggleMenu}>
            Fale Conosco
          </Link>
          <Link to="/admin" onClick={toggleMenu}>
            Admin
          </Link>
        </nav>
      </div>

      {/* Botão Flutuante (FAB) do WhatsApp para o celular */}
      <a
        href="https://wa.me/551639459066"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        aria-label="Chame no WhatsApp"
      >
        <IconeWhatsApp />
      </a>
    </>
  );
}

export default Header;
