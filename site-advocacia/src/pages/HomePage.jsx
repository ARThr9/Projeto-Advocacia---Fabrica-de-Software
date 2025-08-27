// src/pages/HomePage.jsx
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import "./HomePage.css";

function HomePage() {
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getServicos() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("servicos")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(6);

        if (error) throw error;
        if (data) setServicos(data);
      } catch (error) {
        console.error("Erro ao buscar serviços:", error.message);
      } finally {
        setLoading(false);
      }
    }

    getServicos();
  }, []);

  return (
    <div className="homepage">
      {/* --- Seção Hero --- */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Assessoria Jurídica de Confiança e Excelência</h1>
          <p>
            Soluções legais personalizadas para proteger seus direitos e
            interesses.
          </p>
          <button className="hero-button">Entre em Contato</button>
        </div>
        <div className="hero-image">
          {/* Imagem de placeholder. Trocar pela imagem da advogada ou de um escritório */}
          <img
            src="https://placehold.co/800x600/242424/FFF?text=Advocacia"
            alt="Escritório de advocacia"
          />
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
                  <p>{servico.descricao.substring(0, 100)}...</p>{" "}
                  {/* Mostra apenas os primeiros 100 caracteres */}
                  <a href="#">Saiba Mais</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* --- Seção Sobre (Placeholder) --- */}
      <section className="sobre-section">
        <div className="sobre-texto">
          <h2>Sobre Nós</h2>
          <p>
            Com anos de experiência e dedicação, nosso escritório se compromete
            a oferecer um serviço jurídico de alta qualidade, pautado pela
            ética, transparência e pela busca incansável dos melhores resultados
            para nossos clientes. Entendemos que cada caso é único e merece
            atenção especial.
          </p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
