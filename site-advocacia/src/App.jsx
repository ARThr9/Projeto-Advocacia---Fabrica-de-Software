// src/App.jsx
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { supabase } from "./supabaseClient";
import "./App.css";

// Componentes
import Header from "./components/Header";

// Importação de TODAS as páginas
import HomePage from "./pages/HomePage";
import SobrePage from "./pages/SobrePage";
import ServicosPage from "./pages/ServicosPage";
import ContatoPage from "./pages/ContatoPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import EditServicoPage from "./pages/EditServicoPage";
import AdminCursosPage from "./pages/AdminCursosPage";
import EditCursoPage from "./pages/EditCursoPage";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true); // Adicionamos um estado de loading

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false); // Finaliza o loading após pegar a sessão inicial
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Enquanto a sessão inicial está sendo verificada, não renderizamos as rotas
  // Isso evita um "flash" da página de login antes de redirecionar para o admin
  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="App">
      <Header />

      <main>
        <Routes>
          {/* --- ROTAS PÚBLICAS --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/servicos" element={<ServicosPage />} />
          <Route path="/contato" element={<ContatoPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* --- ROTAS PROTEGIDAS --- */}
          {/* Rota principal de Admin (Serviços) */}
          <Route
            path="/admin"
            element={session ? <AdminPage session={session} /> : <LoginPage />}
          />
          <Route
            path="/admin/edit/:id"
            element={session ? <EditServicoPage /> : <LoginPage />}
          />

          {/* Rotas de Admin (Cursos) */}
          <Route
            path="/admin/cursos"
            element={
              session ? <AdminCursosPage session={session} /> : <LoginPage />
            }
          />
          <Route
            path="/admin/cursos/edit/:id"
            element={session ? <EditCursoPage /> : <LoginPage />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
