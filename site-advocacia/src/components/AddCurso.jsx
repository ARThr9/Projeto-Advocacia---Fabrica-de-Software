// src/components/AddCurso.jsx
import { useState } from "react";
import { supabase } from "../supabaseClient";

function AddCurso({ onAdd }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState(null); // Novo estado para o arquivo da imagem
  const [uploading, setUploading] = useState(false);

  // Função para lidar com a seleção do arquivo
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImagem(e.target.files[0]);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!imagem) {
      alert("Por favor, selecione uma imagem.");
      return;
    }

    try {
      setUploading(true);

      // 1. Fazer o upload da imagem para o Supabase Storage

      const filePath = `public/${Date.now()}-${imagem.name}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("imagens-servicos") // O nome do seu bucket
        .upload(filePath, imagem);

      if (uploadError) throw uploadError;

      // 2. Obter a URL pública da imagem que acabamos de enviar
      const { data: publicUrlData } = supabase.storage
        .from("imagens-servicos")
        .getPublicUrl(uploadData.path);

      const imageUrl = publicUrlData.publicUrl;

      // 3. Inserir os dados do curso (incluindo a URL da imagem) no banco de dados
      const { error: insertError } = await supabase.from("cursos").insert([
        {
          titulo: titulo,
          descricao: descricao,
          imagem_url: imageUrl, // Salvamos o link da imagem
        },
      ]);

      if (insertError) throw insertError;

      alert("Curso adicionado com sucesso!");
      setTitulo("");
      setDescricao("");
      setImagem(null);
      document.getElementById("imagem-input").value = ""; // Limpa o campo de arquivo
      onAdd(); // Atualiza a lista de cursos na página de admin
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Adicionar Novo Curso</h2>
      <input
        type="text"
        placeholder="Título do curso"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />
      <br />
      <textarea
        placeholder="Descrição do curso"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        required
      />
      <br />
      {/* Novo campo de input para a imagem */}
      <label htmlFor="imagem-input">Imagem:</label>
      <input
        type="file"
        id="imagem-input"
        accept="image/*" // Aceita apenas arquivos de imagem
        onChange={handleImageChange}
        required
      />
      <br />
      <button type="submit" disabled={uploading}>
        {uploading ? "Salvando..." : "Salvar Curso"}
      </button>
    </form>
  );
}

export default AddCurso;
