import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import "./ServicosPage.css";

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
