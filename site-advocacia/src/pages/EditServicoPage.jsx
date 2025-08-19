// src/pages/EditServicoPage.jsx
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function EditServicoPage() {
  const { id } = useParams(); // Pega o 'id' da URL (ex: /admin/edit/123)
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  // Função para buscar os dados do serviço específico
  const getServico = useCallback(async () => {
    try {
      setLoading(true);
      let { data, error } = await supabase
        .from("servicos")
        .select("*")
        .eq("id", id) // A condição é: onde a coluna 'id' for igual ao 'id' da URL
        .single(); // Esperamos apenas um resultado

      if (error) throw error;

      if (data) {
        setTitulo(data.titulo);
        setDescricao(data.descricao);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getServico();
  }, [getServico]);

  // Função para salvar as atualizações
  async function handleUpdateServico(e) {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("servicos")
        .update({ titulo: titulo, descricao: descricao })
        .eq("id", id); // A condição é: atualize a linha onde o 'id' corresponde

      if (error) throw error;

      alert("Serviço atualizado com sucesso!");
      navigate("/admin"); // Volta para a página de admin
    } catch (error) {
      alert(error.message);
    }
  }

  if (loading) return <p>Carregando dados do serviço...</p>;

  return (
    <div>
      <h1>Editando Serviço</h1>
      <form onSubmit={handleUpdateServico}>
        <label htmlFor="titulo">Título</label>
        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <br />
        <label htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <br />
        <button type="submit">Salvar Alterações</button>
        <button
          type="button"
          onClick={() => navigate("/admin")}
          style={{ marginLeft: "10px" }}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default EditServicoPage;
