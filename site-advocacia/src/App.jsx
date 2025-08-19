// src/App.jsx
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { supabase } from "./supabaseClient";
import "./App.css";

// Importação de todas as páginas
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import EditServicoPage from "./pages/EditServicoPage";
import AdminCursosPage from "./pages/AdminCursosPage";
import EditCursoPage from "./pages/EditCursoPage";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Pega a sessão ativa quando o app carrega
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Ouve por mudanças no estado de autenticação (login, logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Limpa a inscrição quando o componente desmonta
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link> | <Link to="/login">Login</Link> |{" "}
        <Link to="/admin">Admin</Link>
      </nav>
      <main>
        <Routes>
          {/* --- ROTAS PÚBLICAS --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* --- ROTAS PROTEGIDAS PARA SERVIÇOS --- */}
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

          {/* --- ROTAS PROTEGIDAS PARA CURSOS --- */}
          <Route
            path="/admin/cursos"
            element={
              session ? <AdminCursosPage session={session} /> : <LoginPage />
            }
          />
          <Route
            path="/admin/cursos/edit/:id"
            element={
              session ? <EditCursoPage session={session} /> : <LoginPage />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
