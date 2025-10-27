import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

// REMOVEMOS os componentes IconeMenu e IconeFechar

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
            {/* ===== ESTA É A MUDANÇA PRINCIPAL NO JSX ===== */}
            <button
              onClick={toggleMenu}
              className={`menu-toggle ${isMenuOpen ? "is-active" : ""}`}
              aria-label="Menu"
            >
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
            {/* ============================================== */}
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
            <a
              href="https://wa.me/551639459066"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-button"
            >
              Chame no WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* O menu overlay continua exatamente o mesmo */}
      <div className={`overlay-menu ${isMenuOpen ? "open" : ""}`}>
        <nav className="overlay-nav">
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
    </>
  );
}

export default Header;
