// src/pages/AdminPage.jsx
import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom"; // Importar o Link
import { supabase } from "../../supabaseClient";

// Componentes filhos que são usados nesta página
import AddServico from "../../components/AddServico";
import ListaServicos from "../../components/ListaServicos";

function AdminPage({ session }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [servicos, setServicos] = useState([]);

  // Função para buscar os serviços do banco de dados
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

  // Função para excluir um serviço (incluindo a imagem do Storage)
  const handleDeleteServico = async (id) => {
    try {
      // Primeiro, encontrar o serviço para pegar a URL da imagem
      const servicoParaDeletar = servicos.find((s) => s.id === id);
      if (servicoParaDeletar && servicoParaDeletar.imagem_url) {
        const nomeArquivo = servicoParaDeletar.imagem_url.split("/").pop();
        await supabase.storage
          .from("imagens-servicos")
          .remove([`public/${nomeArquivo}`]);
      }

      // Depois, deletar o registro do serviço no banco de dados
      const { error } = await supabase
        .from("servicos")
        .delete()
        .match({ id: id });

      if (error) throw error;

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
      navigate("/");
    }
  };

  return (
    <div>
      <h1>Área Administrativa</h1>

      {/* NAVEGAÇÃO INTERNA DO PAINEL DE ADMIN */}
      <nav
        style={{
          padding: "10px 0",
          borderBottom: "1px solid #ccc",
          marginBottom: "20px",
        }}
      >
        <Link to="/admin">Gerenciar Serviços</Link> |{" "}
        <Link to="/admin/certificados">Gerenciar Certificados</Link> |{" "}
        <Link to="/admin/sobre">Gerenciar "Sobre"</Link>
      </nav>

      <p>Bem-vindo, {session.user.email}!</p>
      <button onClick={handleLogout}>Sair (Logout)</button>
      <hr />

      <h2>Gerenciamento de Serviços</h2>
      <AddServico onAdd={getServicos} />
      <hr />

      <ListaServicos
        servicos={servicos}
        loading={loading}
        onDelete={handleDeleteServico}
      />
    </div>
  );
}

export default AdminPage;
