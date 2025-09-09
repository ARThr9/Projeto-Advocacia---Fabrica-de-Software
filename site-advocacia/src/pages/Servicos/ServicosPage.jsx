import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient"; // Corrigido o caminho do import
import { Link } from "react-router-dom";
import "./ServicosPage.css";

function ServicosPage() {
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getServicos() {
      try {
        setLoading(true);
        // A busca de dados já está correta, pois o select('*') pega todas as colunas
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
    <div className="servicos-page-detalhada">
      <div className="page-banner">
        <div className="banner-content">
          <h1>Áreas de Atuação</h1>
          <p>
            Conheça em detalhe as nossas especialidades e como podemos ajudar.
          </p>
        </div>
      </div>

      <div className="servicos-detalhe-container">
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="servicos-detalhe-lista">
            {servicos.map((servico) => (
              <section key={servico.id} className="servico-detalhe-item">
                <div className="servico-detalhe-imagem">
                  <img src={servico.imagem_url} alt={servico.titulo} />
                </div>
                <div className="servico-detalhe-texto">
                  <h2>{servico.titulo}</h2>
                  {/* ALTERAÇÃO PRINCIPAL AQUI: Usamos a descrição detalhada */}
                  <p
                    dangerouslySetInnerHTML={{
                      __html: (
                        servico.descricao_detalhada || servico.descricao
                      ).replace(/\n/g, "<br />"),
                    }}
                  />
                  <Link to="/contato" className="hero-button">
                    Agendar Consulta
                  </Link>
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ServicosPage;
