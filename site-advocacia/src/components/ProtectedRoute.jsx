// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({ session, children }) {
  // Se não houver sessão ativa, redireciona para a página de login
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Se houver sessão, renderiza o componente filho que foi passado (a página protegida)
  return children;
}

export default ProtectedRoute;
