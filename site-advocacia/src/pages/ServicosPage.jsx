// // src/pages/ServicosPage.jsx
// import { useState, useEffect } from "react";
// import { supabase } from "../supabaseClient";
// import ContatoForm from "../components/ContatoForm"; // Importar o novo formulário
// import "./ServicosPage.css"; // Criaremos este CSS a seguir

// function ServicosPage() {
//   const [servicos, setServicos] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function getServicos() {
//       try {
//         setLoading(true);
//         const { data, error } = await supabase
//           .from("servicos")
//           .select("*")
//           .order("created_at", { ascending: false });

//         if (error) throw error;
//         if (data) setServicos(data);
//       } catch (error) {
//         console.error("Erro ao buscar serviços:", error.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     getServicos();
//   }, []);

//   return (
//     <div className="servicos-page">
//       {/* --- Cabeçalho da Página --- */}
//       <section className="page-banner">
//         <div className="banner-content">
//           <h1>Áreas de atuação</h1>
//         </div>
//       </section>

//       {/* --- Conteúdo Principal --- */}
//       <div className="main-content">
//         {/* Coluna da Esquerda: Serviços */}
//         <div className="servicos-column">
//           {loading ? (
//             <p>Carregando...</p>
//           ) : (
//             <div className="servicos-grid">
//               {servicos.map((servico) => (
//                 <div key={servico.id} className="servico-card-light">
//                   <h3>{servico.titulo}</h3>
//                   <p>{servico.descricao}</p>
//                   <a href="#" className="saiba-mais-btn">
//                     Saiba Mais
//                   </a>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Coluna da Direita: Formulário */}
//         <div className="contato-column">
//           <ContatoForm />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ServicosPage;
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import "./ServicosPage.css"; // Usaremos este CSS a seguir

function ServicosPage() {
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getServicos() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("servicos")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        if (data) setServicos(data);
      } catch (error) {
        console.warn(error.message);
      } finally {
        setLoading(false);
      }
    }
    getServicos();
  }, []);

  return (
    <div className="servicos-page">
      <div className="page-banner">
        <div className="banner-content">
          <h1>Áreas de Atuação</h1>
        </div>
      </div>

      <div className="servicos-page-container">
        {loading ? (
          <p>Carregando serviços...</p>
        ) : (
          <div className="servicos-grid">
            {servicos.map((servico) => (
              <div key={servico.id} className="servico-card">
                <img
                  src={
                    servico.imagem_url ||
                    "https://placehold.co/400x250/242424/FFF?text=Serviço"
                  }
                  alt={servico.titulo}
                />
                <div className="servico-card-content">
                  <h3>{servico.titulo}</h3>
                  <p>{servico.descricao}</p>
                  <a href="#" className="saiba-mais-btn">
                    Saiba Mais
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ServicosPage;
