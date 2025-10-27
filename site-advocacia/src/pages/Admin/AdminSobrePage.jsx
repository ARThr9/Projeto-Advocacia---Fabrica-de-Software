// src/pages/Admin/AdminSobrePage.jsx

import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import "./AdminLayout.css"; // 1. IMPORTA O CSS DO ADMIN

function AdminSobrePage({ session }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [blocos, setBlocos] = useState([]);

  // States para o formulário
  const [uploading, setUploading] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [imagem, setImagem] = useState(null);
  const [ordem, setOrdem] = useState(0);

  const getBlocos = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("conteudo_sobre")
        .select("*")
        .order("ordem", { ascending: true });

      if (error) throw error;
      if (data) {
        setBlocos(data);
        setOrdem(data.length); // Sugere o próximo número de ordem
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getBlocos();
  }, [getBlocos]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImagem(e.target.files[0]);
    }
  };

  const handleAddBloco = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      let imageUrl = null;

      if (imagem) {
        const filePath = `public/sobre/${Date.now()}-${imagem.name}`;
        const { error: uploadError } = await supabase.storage
          .from("imagens-servicos")
          .upload(filePath, imagem);
        if (uploadError) throw uploadError;
        const { data: publicUrlData } = supabase.storage
          .from("imagens-servicos")
          .getPublicUrl(filePath);
        imageUrl = publicUrlData.publicUrl;
      }

      const { error: insertError } = await supabase
        .from("conteudo_sobre")
        .insert([{ titulo, texto, imagem_url: imageUrl, ordem }]);

      if (insertError) throw insertError;

      alert("Bloco adicionado com sucesso!");
      setTitulo("");
      setTexto("");
      setImagem(null);
      document.getElementById("imagem-input").value = "";
      getBlocos();
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteBloco = async (id, imageUrl) => {
    if (window.confirm("Tem certeza que deseja excluir este bloco?")) {
      try {
        if (imageUrl) {
          const nomeArquivo = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
          await supabase.storage
            .from("imagens-servicos")
            .remove([`public/sobre/${nomeArquivo}`]);
        }
        await supabase.from("conteudo_sobre").delete().match({ id });
        setBlocos(blocos.filter((b) => b.id !== id));
        alert("Bloco excluído com sucesso!");
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  // 2. ADICIONAMOS A VERIFICAÇÃO DE LOADING
  if (loading) {
    return (
      <div className="admin-page-container">
        <h1>Área Administrativa</h1>
        <p>Carregando conteúdo "Sobre"...</p>
      </div>
    );
  }

  return (
    // 3. APLICA O CONTAINER GERAL
    <div className="admin-page-container">
      <h1>Área Administrativa</h1>
      <nav>
        <Link to="/admin">Gerenciar Serviços</Link> |{" "}
        <Link to="/admin/certificados">Gerenciar Certificações</Link> |{" "}
        <Link to="/admin/sobre">Gerenciar "Sobre"</Link>
      </nav>
      <p>Bem-vindo, {session.user.email}!</p>
      <button onClick={handleLogout}>Sair (Logout)</button>
      <hr />

      {/* 4. APLICA A "CAIXA MENOR" NO FORMULÁRIO */}
      <div className="admin-content-box">
        <form onSubmit={handleAddBloco}>
          <h2>Adicionar Novo Bloco de Conteúdo</h2>

          {/* 5. APLICA AS CLASSES DE FORMULÁRIO */}
          <div className="form-group-inline">
            <div className="form-group">
              <label htmlFor="ordem">Ordem de Exibição (0, 1, 2...)</label>
              <input
                id="ordem"
                type="number"
                value={ordem}
                onChange={(e) => setOrdem(e.target.valueAsNumber)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="titulo">Título do Bloco</label>
              <input
                id="titulo"
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="texto">Texto do Bloco</label>
            <textarea
              id="texto"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              rows="7"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="imagem-input">Imagem (Opcional)</label>
            <input
              type="file"
              id="imagem-input"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {/* 6. APLICA O BOTÃO DOURADO */}
          <button
            type="submit"
            disabled={uploading}
            className="btn-admin-primary"
          >
            {uploading ? "Enviando..." : "Salvar Bloco"}
          </button>
        </form>
      </div>
      <hr />

      {/* 7. APLICA A "CAIXA MENOR" NA LISTA */}
      <div className="admin-content-box">
        <h2>Blocos Existentes</h2>
        {/* 8. APLICA AS NOVAS CLASSES DE LISTA E REMOVE ESTILOS INLINE */}
        <ul className="admin-bloco-list">
          {blocos.map((bloco) => (
            <li key={bloco.id} className="admin-bloco-item">
              <div className="admin-bloco-info">
                <p>
                  <strong>Ordem:</strong> {bloco.ordem} |{" "}
                  <strong>Título:</strong> {bloco.titulo}
                </p>
                <p>{bloco.texto.substring(0, 150)}...</p>{" "}
                {/* Mostra um preview */}
              </div>
              {bloco.imagem_url && (
                <div className="admin-bloco-image">
                  <img src={bloco.imagem_url} alt={bloco.titulo} />
                </div>
              )}
              {/* 9. APLICA OS BOTÕES DE PERIGO */}
              <div className="admin-list-actions">
                {" "}
                {/* Reutiliza a classe de alinhamento */}
                <button
                  onClick={() => handleDeleteBloco(bloco.id, bloco.imagem_url)}
                  className="btn-admin-secondary btn-admin-danger"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminSobrePage;
