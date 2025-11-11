// src/components/layout/Header/Header.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

// Ícone do WhatsApp em SVG
const IconeWhatsApp = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="28"
    height="28"
    fill="white"
  >
    <path d="M16.04 2C8.71 2 2.75 7.96 2.75 15.28c0 2.6.69 5.15 2 7.38L2 30l7.62-2.73a13.4 13.4 0 0 0 6.42 1.63h.02c7.32 0 13.28-5.96 13.28-13.28S23.36 2 16.04 2zm7.8 18.74c-.33.94-1.93 1.84-2.66 1.96-.68.1-1.54.15-2.5-.16-.58-.18-1.32-.43-2.27-.84-3.99-1.73-6.59-5.79-6.79-6.06-.2-.27-1.62-2.15-1.62-4.1s1.03-2.91 1.39-3.31c.36-.4.79-.5 1.06-.5.27 0 .53 0 .76.01.24.01.56-.09.88.67.33.79 1.13 2.72 1.23 2.92.1.2.17.43.03.7-.13.27-.2.43-.4.66-.2.23-.43.52-.62.7-.2.17-.4.36-.17.73.23.36 1.04 1.7 2.23 2.76 1.53 1.37 2.82 1.8 3.19 2 .36.2.57.17.8-.1.23-.27.93-1.08 1.18-1.45.26-.36.5-.3.83-.17.33.13 2.15 1.01 2.52 1.19.37.17.62.26.71.4.1.13.1.77-.23 1.71z" />
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
