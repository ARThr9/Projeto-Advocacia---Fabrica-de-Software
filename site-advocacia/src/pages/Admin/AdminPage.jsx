import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import ListaServicos from "../../components/ListaServicos"; // Apenas esta importação é necessária

function AdminPage({ session }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [servicos, setServicos] = useState([]);

  // Estados do formulário
  const [uploading, setUploading] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [descricaoDetalhada, setDescricaoDetalhada] = useState("");
  const [imagem, setImagem] = useState(null);

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
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getServicos();
  }, [getServicos]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImagem(e.target.files[0]);
    }
  };

  const handleAddServico = async (e) => {
    e.preventDefault();
    if (!imagem) {
      alert("Por favor, selecione uma imagem.");
      return;
    }
    try {
      setUploading(true);
      const filePath = `public/${Date.now()}-${imagem.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("imagens-servicos")
        .upload(filePath, imagem);
      if (uploadError) throw uploadError;
      const { data: publicUrlData } = supabase.storage
        .from("imagens-servicos")
        .getPublicUrl(uploadData.path);
      const imageUrl = publicUrlData.publicUrl;

      const { error: insertError } = await supabase.from("servicos").insert([
        {
          titulo: titulo,
          descricao: descricao,
          descricao_detalhada: descricaoDetalhada,
          imagem_url: imageUrl,
        },
      ]);
      if (insertError) throw insertError;

      alert("Serviço adicionado com sucesso!");
      setTitulo("");
      setDescricao("");
      setDescricaoDetalhada("");
      setImagem(null);
      document.getElementById("imagem-input-add").value = "";
      getServicos();
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteServico = async (id, imageUrl) => {
    if (window.confirm("Tem certeza que deseja excluir este serviço?")) {
      try {
        if (imageUrl) {
          const nomeArquivo = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
          await supabase.storage
            .from("imagens-servicos")
            .remove([`public/${nomeArquivo}`]);
        }
        await supabase.from("servicos").delete().match({ id });
        setServicos(servicos.filter((s) => s.id !== id));
        alert("Serviço excluído com sucesso!");
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return <div>Carregando painel de administração...</div>;
  }

  return (
    <div>
      <h1>Área Administrativa</h1>
      <nav>
        <Link to="/admin">Gerenciar Serviços</Link> |{" "}
        <Link to="/admin/certificados">Gerenciar Certificações</Link> |{" "}
        <Link to="/admin/sobre">Gerenciar "Sobre"</Link>
      </nav>
      <p>Bem-vindo, {session?.user?.email}!</p>
      <button onClick={handleLogout}>Sair (Logout)</button>
      <hr />

      <form onSubmit={handleAddServico}>
        <h2>Adicionar Novo Serviço</h2>
        <label htmlFor="titulo-add">Título do Serviço</label>
        <input
          id="titulo-add"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />

        <label htmlFor="descricao-add">Descrição Curta (para Homepage)</label>
        <textarea
          id="descricao-add"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
          rows="3"
        />

        <label htmlFor="descricao-detalhada-add">
          Descrição Detalhada (para página de Áreas de Atuação)
        </label>
        <textarea
          id="descricao-detalhada-add"
          value={descricaoDetalhada}
          onChange={(e) => setDescricaoDetalhada(e.target.value)}
          required
          rows="7"
        />

        <label htmlFor="imagem-input-add">Imagem</label>
        <input
          type="file"
          id="imagem-input-add"
          accept="image/*"
          onChange={handleImageChange}
          required
        />

        <button type="submit" disabled={uploading}>
          {uploading ? "Salvando..." : "Salvar Serviço"}
        </button>
      </form>
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
