import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

// Componentes SVG para os ícones
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
              {isMenuOpen ? <IconeFechar /> : <IconeMenu />}
            </button>
          </div>

          <div className="header-center">
            <Link to="/" className="logo-link">
              <img
                src="https://skkyfidccddnqzsroxzr.supabase.co/storage/v1/object/public/imagens-servicos/Logo%20Advocacia%20Header.jpg"
                alt="Logo da Advocacia"
                className="logo-image" /* <<< CORRIGIDO AQUI */
              />
            </Link>
          </div>

          <div className="header-right">
            <a
              href="https://wa.me/NUMERO" // Lembre-se de colocar o número aqui
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
          <Link to="/certificados" onClick={toggleMenu}>
            Certificados
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
