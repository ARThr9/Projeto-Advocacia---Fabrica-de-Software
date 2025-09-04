import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";

function AdminSobrePage({ session }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // States for the form fields
  const [titulo, setTitulo] = useState("");
  const [biografia, setBiografia] = useState("");
  const [imagemUrlAtual, setImagemUrlAtual] = useState(null);
  const [novaImagem, setNovaImagem] = useState(null);

  // Fetch the current page content
  const getPageData = useCallback(async () => {
    try {
      setLoading(true);
      // We know the id is 1, so we fetch it directly
      let { data, error } = await supabase
        .from("pagina_sobre")
        .select("*")
        .eq("id", 1)
        .single();

      if (error) throw error;

      if (data) {
        setTitulo(data.titulo || "");
        setBiografia(data.biografia || "");
        setImagemUrlAtual(data.imagem_perfil_url);
      }
    } catch (error) {
      // It's normal to have an error if the row doesn't exist yet
      console.warn(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPageData();
  }, [getPageData]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNovaImagem(e.target.files[0]);
    }
  };

  // Handle form submission to update the data
  async function handleUpdate(e) {
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
        const filePath = `public/perfil-${Date.now()}-${novaImagem.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("imagens-servicos")
          .upload(filePath, novaImagem);
        if (uploadError) throw uploadError;
        const { data: publicUrlData } = supabase.storage
          .from("imagens-servicos")
          .getPublicUrl(uploadData.path);
        imageUrl = publicUrlData.publicUrl;
      }

      // 'upsert' will create the row if it doesn't exist, or update it if it does.
      const { error } = await supabase.from("pagina_sobre").upsert({
        id: 1, // Always update the row with id = 1
        titulo: titulo,
        biografia: biografia,
        imagem_perfil_url: imageUrl,
      });

      if (error) throw error;

      alert('Página "Sobre" atualizada com sucesso!');
      getPageData(); // Refresh data after update
    } catch (error) {
      alert(error.message);
    } finally {
      setUpdating(false);
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div>
      <h1>Área Administrativa</h1>
      <nav>
        <Link to="/admin">Gerenciar Serviços</Link> |{" "}
        <Link to="/admin/cursos">Gerenciar Certificados</Link> |{" "}
        <Link to="/admin/sobre">Gerenciar "Sobre"</Link>
      </nav>
      <p>Bem-vindo, {session.user.email}!</p>
      <button onClick={handleLogout}>Sair (Logout)</button>
      <hr />

      <h2>Editar Página "O Escritório"</h2>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <form onSubmit={handleUpdate}>
          {imagemUrlAtual && (
            <div>
              <p>Foto de Perfil Atual:</p>
              <img
                src={imagemUrlAtual}
                alt="Foto de perfil"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "1rem",
                }}
              />
            </div>
          )}

          <label htmlFor="titulo">Título da Página</label>
          <input
            id="titulo"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <label htmlFor="biografia">Biografia / Texto Principal</label>
          <textarea
            id="biografia"
            value={biografia}
            onChange={(e) => setBiografia(e.target.value)}
            rows="10"
          />

          <label htmlFor="imagem-input">Trocar Foto de Perfil:</label>
          <input
            type="file"
            id="imagem-input"
            accept="image/*"
            onChange={handleImageChange}
          />

          <button type="submit" disabled={updating}>
            {updating ? "Salvando..." : "Salvar Alterações"}
          </button>
        </form>
      )}
    </div>
  );
}

export default AdminSobrePage;
