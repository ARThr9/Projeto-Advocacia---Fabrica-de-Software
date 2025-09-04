// src/pages/EditServicoPage.jsx
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
  const [imagemUrlAtual, setImagemUrlAtual] = useState(null); // URL da imagem que já existe
  const [novaImagem, setNovaImagem] = useState(null); // Novo arquivo de imagem selecionado

  // Função para buscar os dados do serviço específico
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
        setImagemUrlAtual(data.imagem_url); // Guardamos a URL da imagem atual
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

  // Função para lidar com a seleção da nova imagem
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNovaImagem(e.target.files[0]);
    }
  };

  // Função principal para salvar as atualizações
  async function handleUpdateServico(e) {
    e.preventDefault();
    try {
      setUpdating(true);
      let imageUrl = imagemUrlAtual; // Começa com a URL que já existia

      // CENÁRIO: O usuário selecionou uma NOVA imagem para upload
      if (novaImagem) {
        // 1. Deletar a imagem antiga do Storage, se ela existir
        if (imagemUrlAtual) {
          const nomeArquivoAntigo = imagemUrlAtual.split("/").pop(); // Pega o nome do arquivo da URL
          await supabase.storage
            .from("imagens-servicos")
            .remove([`public/${nomeArquivoAntigo}`]);
        }

        // 2. Fazer o upload da NOVA imagem
        const filePath = `public/${Date.now()}-${novaImagem.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("imagens-servicos")
          .upload(filePath, novaImagem);

        if (uploadError) throw uploadError;

        // 3. Obter a URL pública da nova imagem
        const { data: publicUrlData } = supabase.storage
          .from("imagens-servicos")
          .getPublicUrl(uploadData.path);

        imageUrl = publicUrlData.publicUrl; // Atualiza a variável imageUrl com a nova URL
      }

      // 4. Atualizar os dados no banco de dados (texto e a nova URL da imagem, se houver)
      const { error: updateError } = await supabase
        .from("servicos")
        .update({
          titulo: titulo,
          descricao: descricao,
          imagem_url: imageUrl, // Salva a URL nova ou a antiga, dependendo do que aconteceu
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
      {/* Mostra uma prévia da imagem atual, se ela existir */}
      {imagemUrlAtual && (
        <div>
          <p>Imagem Atual:</p>
          <img
            src={imagemUrlAtual}
            alt="Imagem atual do serviço"
            style={{ width: "200px", marginBottom: "20px" }}
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
        <br />
        <label htmlFor="descricao">Descrição</label>
        <textarea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <br />
        <label htmlFor="imagem-input">Trocar Imagem:</label>
        <input
          type="file"
          id="imagem-input"
          accept="image/*"
          onChange={handleImageChange}
        />
        <br />
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
