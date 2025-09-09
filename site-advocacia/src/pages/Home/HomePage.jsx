import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import "./HomePage.css";

function HomePage() {
  const [servicos, setServicos] = useState([]);
  const [sobre, setSobre] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        // Buscar serviços
        const { data: servicosData, error: servicosError } = await supabase
          .from("servicos")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(3);

        if (servicosError) throw servicosError;
        if (servicosData) setServicos(servicosData);

        const { data: sobreData, error: sobreError } = await supabase
          .from("conteudo_sobre") // Nome da nova tabela
          .select("*")
          .order("ordem", { ascending: true }) // Ordena pela ordem definida
          .limit(1) // Pega apenas o primeiro bloco
          .single(); // Converte o resultado de um array para um único objeto

        if (sobreError) throw sobreError;
        if (sobreData) setSobre(sobreData);
        // ===================================
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

      {/* --- Seção Sobre Nós (Dinâmica e Corrigida) --- */}
      {/* O 'sobre' agora vem da nova tabela, então as propriedades mudaram */}
      {sobre && (
        <section className="sobre-section">
          <div className="sobre-imagem">
            <img src={sobre.imagem_url} alt={sobre.titulo} />
          </div>
          <div className="sobre-texto">
            <h2>{sobre.titulo}</h2>
            <p
              dangerouslySetInnerHTML={{
                __html: sobre.texto.replace(/\n/g, "<br />"),
              }}
            />
          </div>
        </section>
      )}
    </div>
  );
}

export default HomePage;
