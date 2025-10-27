// src/pages/Admin/AdminCertificadosPage.jsx

import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import "./AdminLayout.css"; // 1. IMPORTA O CSS DO ADMIN

function AdminCertificadosPage({ session }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [certificados, setCertificados] = useState([]);

  const [titulo, setTitulo] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const getCertificados = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("certificados")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) setCertificados(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCertificados();
  }, [getCertificados]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleAddCertificado = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Por favor, selecione uma imagem.");
      return;
    }

    try {
      setUploading(true);
      const filePath = `public/certificados/${Date.now()}-${imageFile.name}`;

      const { error: uploadError } = await supabase.storage
        .from("imagens-servicos")
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("imagens-servicos")
        .getPublicUrl(filePath);

      const imageUrl = publicUrlData.publicUrl;

      const { error: insertError } = await supabase
        .from("certificados")
        .insert([{ titulo: titulo, imagem_url: imageUrl }]);

      if (insertError) throw insertError;

      alert("Certificado adicionado com sucesso!");
      setTitulo("");
      setImageFile(null);
      document.getElementById("image-input").value = "";
      getCertificados();
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteCertificado = async (id, imageUrl) => {
    if (window.confirm("Tem certeza que deseja excluir este certificado?")) {
      try {
        if (imageUrl) {
          const nomeArquivo = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
          await supabase.storage
            .from("imagens-servicos")
            .remove([`public/certificados/${nomeArquivo}`]);
        }
        await supabase.from("certificados").delete().match({ id: id });
        setCertificados(certificados.filter((c) => c.id !== id));
        alert("Certificado excluído com sucesso!");
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  // 2. ADICIONAMOS A VERIFICAÇÃO DE LOADING QUE FALTAVA
  if (loading) {
    return (
      <div className="admin-page-container">
        <h1>Área Administrativa</h1>
        <p>Carregando certificados...</p>
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
        <form onSubmit={handleAddCertificado}>
          <h2>Adicionar Novo Certificado</h2>

          <div className="form-group">
            <label htmlFor="titulo">Título do Certificado</label>
            <input
              id="titulo"
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image-input">Arquivo de Imagem (JPG, PNG)</label>
            <input
              type="file"
              id="image-input"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>

          {/* 5. APLICA O BOTÃO DOURADO */}
          <button
            type="submit"
            disabled={uploading}
            className="btn-admin-primary"
          >
            {uploading ? "Enviando..." : "Salvar Certificado"}
          </button>
        </form>
      </div>
      <hr />

      {/* 6. APLICA A "CAIXA MENOR" NA LISTA */}
      <div className="admin-content-box">
        <h2>Certificados Cadastrados</h2>
        {/* 7. APLICA AS NOVAS CLASSES DE LISTA E REMOVE ESTILOS INLINE */}
        <ul className="admin-card-list">
          {certificados.map((cert) => (
            <li key={cert.id} className="admin-card-item">
              <img src={cert.imagem_url} alt={cert.titulo} />
              <p>
                <strong>{cert.titulo}</strong>
              </p>
              {/* 8. APLICA OS BOTÕES DE PERIGO */}
              <button
                onClick={() =>
                  handleDeleteCertificado(cert.id, cert.imagem_url)
                }
                className="btn-admin-secondary btn-admin-danger"
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminCertificadosPage;
