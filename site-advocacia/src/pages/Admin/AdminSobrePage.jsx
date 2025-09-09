// import { useState, useEffect, useCallback } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { supabase } from "../../supabaseClient";

// function AdminSobrePage({ session }) {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);

//   // States for the form fields
//   const [titulo, setTitulo] = useState("");
//   const [biografia, setBiografia] = useState("");
//   const [imagemUrlAtual, setImagemUrlAtual] = useState(null);
//   const [novaImagem, setNovaImagem] = useState(null);

//   // Fetch the current page content
//   const getPageData = useCallback(async () => {
//     try {
//       setLoading(true);
//       // We know the id is 1, so we fetch it directly
//       let { data, error } = await supabase
//         .from("pagina_sobre")
//         .select("*")
//         .eq("id", 1)
//         .single();

//       if (error) throw error;

//       if (data) {
//         setTitulo(data.titulo || "");
//         setBiografia(data.biografia || "");
//         setImagemUrlAtual(data.imagem_perfil_url);
//       }
//     } catch (error) {
//       // It's normal to have an error if the row doesn't exist yet
//       console.warn(error.message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     getPageData();
//   }, [getPageData]);

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setNovaImagem(e.target.files[0]);
//     }
//   };

//   // Handle form submission to update the data
//   async function handleUpdate(e) {
//     e.preventDefault();
//     try {
//       setUpdating(true);
//       let imageUrl = imagemUrlAtual;

//       if (novaImagem) {
//         if (imagemUrlAtual) {
//           const nomeArquivoAntigo = imagemUrlAtual.split("/").pop();
//           await supabase.storage
//             .from("imagens-servicos")
//             .remove([`public/${nomeArquivoAntigo}`]);
//         }
//         const filePath = `public/perfil-${Date.now()}-${novaImagem.name}`;
//         const { data: uploadData, error: uploadError } = await supabase.storage
//           .from("imagens-servicos")
//           .upload(filePath, novaImagem);
//         if (uploadError) throw uploadError;
//         const { data: publicUrlData } = supabase.storage
//           .from("imagens-servicos")
//           .getPublicUrl(uploadData.path);
//         imageUrl = publicUrlData.publicUrl;
//       }

//       // 'upsert' will create the row if it doesn't exist, or update it if it does.
//       const { error } = await supabase.from("pagina_sobre").upsert({
//         id: 1, // Always update the row with id = 1
//         titulo: titulo,
//         biografia: biografia,
//         imagem_perfil_url: imageUrl,
//       });

//       if (error) throw error;

//       alert('Página "Sobre" atualizada com sucesso!');
//       getPageData(); // Refresh data after update
//     } catch (error) {
//       alert(error.message);
//     } finally {
//       setUpdating(false);
//     }
//   }

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     navigate("/");
//   };

//   return (
//     <div>
//       <h1>Área Administrativa</h1>
//       <nav>
//         <Link to="/admin">Gerenciar Serviços</Link> |{" "}
//         <Link to="/admin/cursos">Gerenciar Certificações</Link> |{" "}
//         <Link to="/admin/sobre">Gerenciar "Sobre"</Link>
//       </nav>
//       <p>Bem-vindo, {session.user.email}!</p>
//       <button onClick={handleLogout}>Sair (Logout)</button>
//       <hr />

//       <h2>Editar Página "Sobre nós"</h2>

//       {loading ? (
//         <p>Carregando...</p>
//       ) : (
//         <form onSubmit={handleUpdate}>
//           {imagemUrlAtual && (
//             <div>
//               <p>Foto de Perfil Atual:</p>
//               <img
//                 src={imagemUrlAtual}
//                 alt="Foto de perfil"
//                 style={{
//                   width: "150px",
//                   height: "150px",
//                   borderRadius: "50%",
//                   objectFit: "cover",
//                   marginBottom: "1rem",
//                 }}
//               />
//             </div>
//           )}

//           <label htmlFor="titulo">Título da Página</label>
//           <input
//             id="titulo"
//             type="text"
//             value={titulo}
//             onChange={(e) => setTitulo(e.target.value)}
//           />

//           <label htmlFor="biografia">Biografia / Texto Principal</label>
//           <textarea
//             id="biografia"
//             value={biografia}
//             onChange={(e) => setBiografia(e.target.value)}
//             rows="10"
//           />

//           <label htmlFor="imagem-input">Trocar Foto de Perfil:</label>
//           <input
//             type="file"
//             id="imagem-input"
//             accept="image/*"
//             onChange={handleImageChange}
//           />

//           <button type="submit" disabled={updating}>
//             {updating ? "Salvando..." : "Salvar Alterações"}
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }

// export default AdminSobrePage;

import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";

function AdminSobrePage({ session }) {
  // 1. AGORA USAMOS A 'session'
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [blocos, setBlocos] = useState([]);

  // States para o formulário de "Adicionar Novo Bloco"
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
          // Corrige o caminho para a pasta "sobre"
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

  // 2. AGORA ESTA FUNÇÃO SERÁ USADA PELO BOTÃO
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
      {/* SEÇÃO ADICIONADA PARA USAR AS VARIÁVEIS */}
      <p>Bem-vindo, {session.user.email}!</p>
      <button onClick={handleLogout}>Sair (Logout)</button>
      <hr />

      <form onSubmit={handleAddBloco}>
        <h2>Adicionar Novo Bloco de Conteúdo</h2>

        {/* === ALTERAÇÃO APLICADA AQUI === */}
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
        {/* ================================ */}

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

        <button type="submit" disabled={uploading}>
          {uploading ? "Enviando..." : "Salvar Bloco"}
        </button>
      </form>
      <hr />

      <h2>Blocos Existentes</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div>
          {blocos.map((bloco) => (
            <div
              key={bloco.id}
              style={{
                border: "1px solid gray",
                padding: "1rem",
                marginBottom: "1rem",
                borderRadius: "8px",
              }}
            >
              <p>
                <strong>Ordem:</strong> {bloco.ordem} | <strong>Título:</strong>{" "}
                {bloco.titulo}
              </p>
              {bloco.imagem_url && (
                <img
                  src={bloco.imagem_url}
                  alt={bloco.titulo}
                  style={{
                    width: "150px",
                    height: "auto",
                    borderRadius: "4px",
                  }}
                />
              )}
              <p>{bloco.texto.substring(0, 100)}...</p>
              <button
                onClick={() => handleDeleteBloco(bloco.id, bloco.imagem_url)}
                style={{ backgroundColor: "#e53e3e" }}
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminSobrePage;
