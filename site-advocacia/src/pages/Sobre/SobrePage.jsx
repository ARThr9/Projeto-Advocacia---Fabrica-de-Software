import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient"; // Verifique se o caminho está correto
import "./SobrePage.css";

function SobrePage() {
  const [blocos, setBlocos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getBlocos() {
      try {
        setLoading(true);
        // AGORA BUSCAMOS DA NOVA TABELA 'conteudo_sobre'
        const { data, error } = await supabase
          .from("conteudo_sobre")
          .select("*")
          .order("ordem", { ascending: true }); // Puxa os blocos na ordem correta

        if (error) throw error;
        if (data) setBlocos(data);
      } catch (error) {
        console.warn(error.message);
      } finally {
        setLoading(false);
      }
    }
    getBlocos();
  }, []);

  return (
    <div className="sobre-page-container">
      {loading ? (
        <p className="loading-message">Carregando...</p>
      ) : // Se não houver blocos, mostra uma mensagem
      blocos.length === 0 ? (
        <p className="loading-message">
          Nenhum conteúdo cadastrado para esta página ainda.
        </p>
      ) : (
        // Mapeia e exibe cada bloco de conteúdo
        blocos.map((bloco) => (
          <section key={bloco.id} className="sobre-bloco-item">
            {bloco.imagem_url && (
              <div className="sobre-bloco-imagem">
                <img src={bloco.imagem_url} alt={bloco.titulo} />
              </div>
            )}
            <div className="sobre-bloco-texto">
              <h2>{bloco.titulo}</h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: bloco.texto.replace(/\n/g, "<br />"),
                }}
              />
            </div>
          </section>
        ))
      )}
    </div>
  );
}

export default SobrePage;
