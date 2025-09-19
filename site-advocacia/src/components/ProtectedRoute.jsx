// src/components/ProtectedRoute.jsx

import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ session }) => {
  // Se não houver uma sessão ativa, redireciona o usuário para a página de login
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Se houver uma sessão, permite a renderização da rota filha (página de admin)
  return <Outlet />;
};

export default ProtectedRoute;
