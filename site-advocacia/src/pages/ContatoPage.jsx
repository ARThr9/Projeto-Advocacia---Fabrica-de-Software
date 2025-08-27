// src/pages/ContatoPage.jsx

function ContatoPage() {
  return (
    <div style={{ textAlign: "left", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Fale Conosco</h1>
      <p>
        Estamos à disposição para esclarecer suas dúvidas e agendar uma
        consulta. Utilize o formulário abaixo ou entre em contato através de
        nossos canais.
      </p>
      {/* Aqui você pode adicionar um formulário de contato ou o widget do Calendly no futuro */}
      <div style={{ marginTop: "2rem" }}>
        <p>
          <strong>Telefone:</strong> (XX) XXXX-XXXX
        </p>
        <p>
          <strong>Email:</strong> contato@seuemail.com
        </p>
        <p>
          <strong>Endereço:</strong> Rua Voluntário Otto Gomes Martins, 1202
        </p>
      </div>
    </div>
  );
}

export default ContatoPage;
