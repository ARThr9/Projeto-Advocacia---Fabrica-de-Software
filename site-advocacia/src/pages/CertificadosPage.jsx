import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import "./CertificadosPage.css";

function CertificadosPage() {
  const [certificados, setCertificados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCertificados() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("certificados")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) setCertificados(data);
      } catch (error) {
        console.warn(error.message);
      } finally {
        setLoading(false);
      }
    }
    getCertificados();
  }, []);

  return (
    <div className="certificados-container">
      <h1>Certificados e Diplomas</h1>
      <p className="certificados-subtitle">
        Confira as qualificações e especializações.
      </p>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul className="certificados-list">
          {certificados.length > 0 ? (
            certificados.map((cert) => (
              <li key={cert.id} className="certificado-item">
                <a
                  href={cert.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="pdf-icon">📄</span>
                  {cert.titulo}
                </a>
              </li>
            ))
          ) : (
            <p>Nenhum certificado cadastrado no momento.</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default CertificadosPage;
