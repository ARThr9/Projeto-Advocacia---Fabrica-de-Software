// src/components/Header.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Criaremos este arquivo de CSS a seguir

// Componentes SVG para os ícones, para não dependermos de arquivos externos
const IconeMenu = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const IconeFechar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const IconeLupa = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
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
            <button onClick={toggleMenu} className="menu-toggle">
              {/* O ícone muda dependendo se o menu está aberto ou fechado */}
              {isMenuOpen ? <IconeFechar /> : <IconeMenu />}
            </button>
          </div>

          <div className="header-center">
            {/* Adicione seu logo aqui */}
            <Link to="/" className="link-logo">
              <span className="logo-text">Logo</span>
            </Link>
          </div>

          <div className="header-right">
            <a
              href="https://wa.me/SEUNUMERO"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-button"
            >
              Chame no WhatsApp
            </a>
          </div>
        </div>
      </header>

      <div className={`overlay-menu ${isMenuOpen ? "open" : ""}`}>
        <nav className="overlay-nav">
          <Link to="/" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/sobre" onClick={toggleMenu}>
            O Escritório
          </Link>
          <Link to="/servicos" onClick={toggleMenu}>
            Áreas de Atuação
          </Link>
          <Link to="/contato" onClick={toggleMenu}>
            Fale Conosco
          </Link>
          <Link to="/admin" onClick={toggleMenu}>
            Admin
          </Link>
        </nav>
      </div>
    </>
  );
}

export default Header;
