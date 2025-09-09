import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

function EditServicoPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [descricaoDetalhada, setDescricaoDetalhada] = useState("");
  const [imagemUrlAtual, setImagemUrlAtual] = useState(null);
  const [novaImagem, setNovaImagem] = useState(null);

  const getServico = useCallback(async () => {
    try {
      setLoading(true);
      let { data, error } = await supabase
        .from("servicos")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      if (data) {
        setTitulo(data.titulo);
        setDescricao(data.descricao);
        setDescricaoDetalhada(data.descricao_detalhada || "");
        setImagemUrlAtual(data.imagem_url);
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

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNovaImagem(e.target.files[0]);
    }
  };

  async function handleUpdateServico(e) {
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
        .from("servicos")
        .update({
          titulo: titulo,
          descricao: descricao,
          descricao_detalhada: descricaoDetalhada,
          imagem_url: imageUrl,
        })
        .eq("id", id);

      if (updateError) throw updateError;

      alert("Serviço atualizado com sucesso!");
      navigate("/admin");
    } catch (error) {
      alert(error.message);
    } finally {
      setUpdating(false);
    }
  }

  if (loading) return <p>Carregando dados do serviço...</p>;

  return (
    <div>
      <h1>Editando Serviço</h1>
      {imagemUrlAtual && (
        <div>
          <p>Imagem Atual:</p>
          <img
            src={imagemUrlAtual}
            alt="Imagem atual do serviço"
            style={{
              width: "200px",
              marginBottom: "20px",
              borderRadius: "8px",
            }}
          />
        </div>
      )}

      <form onSubmit={handleUpdateServico}>
        <label htmlFor="titulo">Título</label>
        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <label htmlFor="descricao">Descrição Curta (para a Homepage)</label>
        <textarea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          rows="3"
        />

        {/* 4. NOVO CAMPO ADICIONADO AO FORMULÁRIO */}
        <label htmlFor="descricaoDetalhada">
          Descrição Detalhada (para a página de Áreas de Atuação)
        </label>
        <textarea
          id="descricaoDetalhada"
          value={descricaoDetalhada}
          onChange={(e) => setDescricaoDetalhada(e.target.value)}
          rows="10"
        />

        <label htmlFor="imagem-input">Trocar Imagem:</label>
        <input
          type="file"
          id="imagem-input"
          accept="image/*"
          onChange={handleImageChange}
        />

        <button type="submit" disabled={updating}>
          {updating ? "Salvando..." : "Salvar Alterações"}
        </button>
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
