import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { supabase } from "./supabaseClient";

// Layout Components (versão antiga)
import Header from "./components/Header";
import Footer from "./components/Footer";

// Public Page Components
import HomePage from "./pages/HomePage";
import SobrePage from "./pages/SobrePage";
import ServicosPage from "./pages/ServicosPage";
import ContatoPage from "./pages/ContatoPage";
import LoginPage from "./pages/LoginPage";
import CertificadosPage from "./pages/CertificadosPage";

// Admin Page Components
import AdminPage from "./pages/AdminPage";
import EditServicoPage from "./pages/EditServicoPage";
import AdminSobrePage from "./pages/AdminSobrePage";
import AdminCertificadosPage from "./pages/AdminCertificadosPage";

import "./App.css"; // Depende do seu App.css antigo

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Verifica a sessão ativa quando o app carrega
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    getSession();

    // Ouve por mudanças no estado de autenticação (login, logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Limpa a inscrição quando o componente é desmontado
    return () => subscription.unsubscribe();
  }, []);

  // Efeito para rolar para âncoras (ex: /#contato)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]); // Roda sempre que a localização mudar

  // Mostra um indicador de carregamento enquanto a sessão é verificada
  if (loading) {
    // Você pode querer criar uma classe para isso no seu App.css
    return (
      <div
        style={{ textAlign: "center", marginTop: "5rem", fontSize: "1.5rem" }}
      >
        Carregando...
      </div>
    );
  }

  return (
    <div className="App">
      {" "}
      {/* Usa a classe de container principal do seu CSS antigo */}
      <Header />
      <main>
        <Routes>
          {/* --- Rotas Públicas --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/servicos" element={<ServicosPage />} />
          <Route path="/contato" element={<ContatoPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/certificados" element={<CertificadosPage />} />

          {/* --- Rotas de Admin Protegidas --- */}
          <Route
            path="/admin"
            element={session ? <AdminPage session={session} /> : <LoginPage />}
          />
          <Route
            path="/admin/edit/:id"
            element={
              session ? <EditServicoPage session={session} /> : <LoginPage />
            }
          />
          <Route
            path="/admin/sobre"
            element={
              session ? <AdminSobrePage session={session} /> : <LoginPage />
            }
          />
          <Route
            path="/admin/certificados"
            element={
              session ? (
                <AdminCertificadosPage session={session} />
              ) : (
                <LoginPage />
              )
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
