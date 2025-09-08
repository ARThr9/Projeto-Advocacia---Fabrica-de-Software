// src/pages/SobrePage.jsx

function SobrePage() {
  return (
    <div style={{ textAlign: "left", maxWidth: "800px", margin: "0 auto" }}>
      <h1>O Escritório</h1>
      <p>
        Breve história do escritório, missão, etc. É um espaço para gerar
        confiança e apresentar a identidade da advogada.
      </p>
      <img
        src="https://skkyfidccddnqzsroxzr.supabase.co/storage/v1/object/public/imagens-servicos/Foto%20Escritorio%20provisoria.png"
        alt="O escritório"
        style={{ width: "100%", borderRadius: "8px", marginTop: "2rem" }}
      />
    </div>
  );
}

export default SobrePage;
