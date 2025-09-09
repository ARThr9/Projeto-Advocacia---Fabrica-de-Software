import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import "./HomePage.css";

function HomePage() {
  const [servicos, setServicos] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        // Agora buscamos apenas os serviços
        const { data: servicosData, error: servicosError } = await supabase
          .from("servicos")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(3);

        if (servicosError) throw servicosError;
        if (servicosData) setServicos(servicosData);
      } catch (error) {
        console.warn("Aviso ao buscar dados da homepage:", error.message);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  return (
    <div className="homepage">
      {/* --- Seção Hero --- */}
      <section className="hero-section">
        <div className="hero-image">
          <img
            src="https://skkyfidccddnqzsroxzr.supabase.co/storage/v1/object/public/imagens-servicos/Logo%20Advocacia.jpg"
            alt="Logo do escritório de advocacia"
          />
        </div>
        <div className="hero-content">
          <h1>Assessoria Jurídica de Confiança e Excelência</h1>
          <p>
            Soluções legais personalizadas para proteger seus direitos e
            interesses.
          </p>
          <Link to="/contato" className="hero-button">
            Entre em Contato
          </Link>
        </div>
      </section>

      {/* --- Seção de Serviços (Áreas de Atuação) --- */}
      <section className="servicos-section">
        <h2>Áreas de Atuação</h2>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="servicos-grid">
            {servicos.map((servico) => (
              <div key={servico.id} className="servico-card">
                <img
                  src={
                    servico.imagem_url ||
                    "https://placehold.co/400x300/242424/FFF?text=Serviço"
                  }
                  alt={servico.titulo}
                />
                <div className="servico-card-content">
                  <h3>{servico.titulo}</h3>
                  <p>{servico.descricao}</p>
                  <Link to="/servicos" className="saiba-mais-btn">
                    Saiba Mais
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default HomePage;
