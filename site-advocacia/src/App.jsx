import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { supabase } from "./supabaseClient";
import ScrollToTop from "./components/ScrollToTop";

import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";

// Public Page Components
import HomePage from "./pages/Home/HomePage";
import SobrePage from "./pages/Sobre/SobrePage";
import ServicosPage from "./pages/Servicos/ServicosPage";
import ContatoPage from "./pages/Contato/ContatoPage";
import LoginPage from "./pages/Admin/LoginPage";
import CertificadosPage from "./pages/Certificados/CertificadosPage";

// Admin Page Components
import AdminPage from "./pages/Admin/AdminPage";
import EditServicoPage from "./pages/Admin/EditServicoPage";
import AdminSobrePage from "./pages/Admin/AdminSobrePage";
import AdminCertificadosPage from "./pages/Admin/AdminCertificadosPage";

import "./App.css";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };
    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  if (loading) {
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
      <Header />
      <main>
        <ScrollToTop />
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
