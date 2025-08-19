// src/pages/EditCursoPage.jsx
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function EditCursoPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagemUrlAtual, setImagemUrlAtual] = useState(null);
  const [novaImagem, setNovaImagem] = useState(null);

  const getCurso = useCallback(async () => {
    try {
      setLoading(true);
      let { data, error } = await supabase
        .from("cursos")
        .select("*")
        .eq("id", id)
        .single(); // MUDANÇA AQUI
      if (error) throw error;
      if (data) {
        setTitulo(data.titulo);
        setDescricao(data.descricao);
        setImagemUrlAtual(data.imagem_url);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getCurso();
  }, [getCurso]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNovaImagem(e.target.files[0]);
    }
  };

  async function handleUpdateCurso(e) {
    e.preventDefault();
    try {
      setUpdating(true);
      let imageUrl = imagemUrlAtual;

      if (novaImagem) {
        if (imagemUrlAtual) {
          const nomeArquivoAntigo = imagemUrlAtual.split("/").pop();
          await supabase.storage
            .from("imagens-servicos")
            .remove([`public/${nomeArquivoAntigo}`]);
        }
        const filePath = `public/${Date.now()}-${novaImagem.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("imagens-servicos")
          .upload(filePath, novaImagem);
        if (uploadError) throw uploadError;
        const { data: publicUrlData } = supabase.storage
          .from("imagens-servicos")
          .getPublicUrl(uploadData.path);
        imageUrl = publicUrlData.publicUrl;
      }

      const { error: updateError } = await supabase
        .from("cursos")
        .update({
          // MUDANÇA AQUI
          titulo: titulo,
          descricao: descricao,
          imagem_url: imageUrl,
        })
        .eq("id", id);

      if (updateError) throw updateError;

      alert("Curso atualizado com sucesso!");
      navigate("/admin/cursos");
    } catch (error) {
      alert(error.message);
    } finally {
      setUpdating(false);
    }
  }

  if (loading) return <p>Carregando dados do curso...</p>;

  return (
    <div>
      <h1>Editando Curso</h1>
      {imagemUrlAtual && (
        <div>
          <p>Imagem Atual:</p>
          <img
            src={imagemUrlAtual}
            alt="Imagem atual do curso"
            style={{ width: "200px", marginBottom: "20px" }}
          />
        </div>
      )}
      <form onSubmit={handleUpdateCurso}>
        {/* ... O resto do formulário é idêntico ao de EditServicoPage ... */}
        <label>Título</label>
        <input value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        <br />
        <label>Descrição</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <br />
        <label>Trocar Imagem:</label>
        <input type="file" onChange={handleImageChange} />
        <br />
        <button type="submit" disabled={updating}>
          {updating ? "Salvando..." : "Salvar Alterações"}
        </button>
        <button type="button" onClick={() => navigate("/admin/cursos")}>
          Cancelar
        </button>
      </form>
    </div>
  );
}

export default EditCursoPage;
