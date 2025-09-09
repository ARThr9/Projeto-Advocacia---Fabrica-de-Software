// import { useState, useEffect, useCallback } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { supabase } from "../supabaseClient";

// function AdminCertificadosPage({ session }) {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [uploading, setUploading] = useState(false);
//   const [certificados, setCertificados] = useState([]);

//   // States for the new certificate form
//   const [titulo, setTitulo] = useState("");
//   const [pdfFile, setPdfFile] = useState(null);

//   const getCertificados = useCallback(async () => {
//     try {
//       setLoading(true);
//       const { data, error } = await supabase
//         .from("certificados")
//         .select("*")
//         .order("created_at", { ascending: false });

//       if (error) throw error;
//       if (data) setCertificados(data);
//     } catch (error) {
//       alert(error.message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     getCertificados();
//   }, [getCertificados]);

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setPdfFile(e.target.files[0]);
//     }
//   };

//   const handleAddCertificado = async (e) => {
//     e.preventDefault();
//     if (!pdfFile) {
//       alert("Por favor, selecione um arquivo PDF.");
//       return;
//     }

//     try {
//       setUploading(true);
//       const filePath = `public/certificados/${Date.now()}-${pdfFile.name}`;

//       const { error: uploadError } = await supabase.storage
//         .from("imagens-servicos") // Reutilizando nosso bucket
//         .upload(filePath, pdfFile);

//       if (uploadError) throw uploadError;

//       const { data: publicUrlData } = supabase.storage
//         .from("imagens-servicos")
//         .getPublicUrl(filePath);

//       const pdfUrl = publicUrlData.publicUrl;

//       const { error: insertError } = await supabase
//         .from("certificados")
//         .insert([{ titulo: titulo, pdf_url: pdfUrl }]);

//       if (insertError) throw insertError;

//       alert("Certificado adicionado com sucesso!");
//       setTitulo("");
//       setPdfFile(null);
//       document.getElementById("pdf-input").value = "";
//       getCertificados();
//     } catch (error) {
//       alert(error.message);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleDeleteCertificado = async (id, pdfUrl) => {
//     if (window.confirm("Tem certeza que deseja excluir este certificado?")) {
//       try {
//         const nomeArquivo = pdfUrl.substring(pdfUrl.lastIndexOf("/") + 1);
//         await supabase.storage
//           .from("imagens-servicos")
//           .remove([`public/certificados/${nomeArquivo}`]);
//         await supabase.from("certificados").delete().match({ id: id });
//         setCertificados(certificados.filter((c) => c.id !== id));
//         alert("Certificado excluído com sucesso!");
//       } catch (error) {
//         alert(error.message);
//       }
//     }
//   };

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     navigate("/");
//   };

//   return (
//     <div>
//       <h1>Área Administrativa</h1>
//       <nav>
//         <Link to="/admin">Gerenciar Serviços</Link> |{" "}
//         <Link to="/admin/certificados">Gerenciar Certificados</Link> |{" "}
//         <Link to="/admin/sobre">Gerenciar "Sobre"</Link>
//       </nav>
//       <p>Bem-vindo, {session.user.email}!</p>
//       <button onClick={handleLogout}>Sair (Logout)</button>
//       <hr />

//       {/* Formulário para Adicionar */}
//       <form onSubmit={handleAddCertificado}>
//         <h2>Adicionar Novo Certificado</h2>
//         <label htmlFor="titulo">Título do Certificado</label>
//         <input
//           id="titulo"
//           type="text"
//           value={titulo}
//           onChange={(e) => setTitulo(e.target.value)}
//           required
//         />

//         <label htmlFor="pdf-input">Arquivo PDF</label>
//         <input
//           type="file"
//           id="pdf-input"
//           accept=".pdf"
//           onChange={handleFileChange}
//           required
//         />

//         <button type="submit" disabled={uploading}>
//           {uploading ? "Enviando..." : "Salvar Certificado"}
//         </button>
//       </form>
//       <hr />

//       {/* Lista de Certificados Existentes */}
//       <h2>Certificados Cadastrados</h2>
//       {loading ? (
//         <p>Carregando...</p>
//       ) : (
//         <ul>
//           {certificados.map((cert) => (
//             <li key={cert.id}>
//               <p>
//                 <strong>{cert.titulo}</strong>
//               </p>
//               <a
//                 href={cert.pdf_url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="whatsapp-button"
//                 style={{ backgroundColor: "#646cff" }}
//               >
//                 Ver PDF
//               </a>
//               <button
//                 onClick={() => handleDeleteCertificado(cert.id, cert.pdf_url)}
//                 style={{ marginLeft: "1rem", backgroundColor: "#e53e3e" }}
//               >
//                 Excluir
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default AdminCertificadosPage;
import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";

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
        .from("imagens-servicos") // Reutilizando nosso bucket
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("imagens-servicos")
        .getPublicUrl(filePath);

      const imageUrl = publicUrlData.publicUrl;

      const { error: insertError } = await supabase
        .from("certificados")
        .insert([{ titulo: titulo, imagem_url: imageUrl }]); // Salva na coluna imagem_url

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

  return (
    <div>
      <h1>Área Administrativa</h1>
      <nav>
        <Link to="/admin">Gerenciar Serviços</Link> |{" "}
        <Link to="/admin/certificados">Gerenciar Certificações</Link> |{" "}
        <Link to="/admin/sobre">Gerenciar "Sobre"</Link>
      </nav>
      <p>Bem-vindo, {session.user.email}!</p>
      <button onClick={handleLogout}>Sair (Logout)</button>
      <hr />

      {/* Formulário para Adicionar */}
      <form onSubmit={handleAddCertificado}>
        <h2>Adicionar Novo Certificado</h2>
        <label htmlFor="titulo">Título do Certificado</label>
        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />

        <label htmlFor="image-input">Arquivo de Imagem (JPG, PNG)</label>
        <input
          type="file"
          id="image-input"
          accept="image/*"
          onChange={handleFileChange}
          required
        />

        <button type="submit" disabled={uploading}>
          {uploading ? "Enviando..." : "Salvar Certificado"}
        </button>
      </form>
      <hr />

      {/* Lista de Certificados Existentes */}
      <h2>Certificados Cadastrados</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {certificados.map((cert) => (
            <li key={cert.id} style={{ listStyle: "none" }}>
              <p>
                <strong>{cert.titulo}</strong>
              </p>
              <img
                src={cert.imagem_url}
                alt={cert.titulo}
                style={{ width: "200px", height: "auto", borderRadius: "8px" }}
              />
              <button
                onClick={() =>
                  handleDeleteCertificado(cert.id, cert.imagem_url)
                }
                style={{ marginTop: "0.5rem", backgroundColor: "#e53e3e" }}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminCertificadosPage;
