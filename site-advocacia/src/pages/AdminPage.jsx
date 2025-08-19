// src/pages/AdminPage.jsx

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

// Componentes filhos que são usados nesta página
import AddServico from "../components/AddServico";
import ListaServicos from "../components/ListaServicos";

function AdminPage({ session }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [servicos, setServicos] = useState([]);

  // Função para buscar os serviços do banco de dados, envolvida em useCallback
  const getServicos = useCallback(async () => {
    try {
      setLoading(true);
      let { data, error } = await supabase
        .from("servicos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) setServicos(data);
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // useEffect que roda a função getServicos uma vez quando a página carrega
  useEffect(() => {
    getServicos();
  }, [getServicos]);

  // Função para excluir um serviço pelo seu ID
  const handleDeleteServico = async (id) => {
    try {
      const { error } = await supabase
        .from("servicos")
        .delete()
        .match({ id: id }); // Condição para apagar a linha correta

      if (error) throw error;

      // Atualiza o estado local para remover o serviço da lista sem precisar recarregar a página
      setServicos(servicos.filter((s) => s.id !== id));
      alert("Serviço excluído com sucesso!");
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  // Função para fazer o logout do usuário
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Erro ao fazer logout:", error);
    } else {
      navigate("/"); // Redireciona para a página inicial após o logout
    }
  };

  // Renderização do componente
  return (
    <div>
      <h1>Área Administrativa</h1>
      <p>Bem-vindo, {session.user.email}!</p>
      <button onClick={handleLogout}>Sair (Logout)</button>
      <hr />

      {/* Componente do formulário para adicionar novos serviços */}
      <AddServico onAdd={getServicos} />
      <hr />

      {/* Componente que lista os serviços existentes */}
      {/* a função de excluir foi passada como uma prop para o componente da lista */}
      <ListaServicos
        servicos={servicos}
        loading={loading}
        onDelete={handleDeleteServico}
      />
    </div>
  );
}

export default AdminPage;
