// src/pages/ContatoPage.jsx
import Map from "../../components/Map";

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
        <Map
          embedUrl={
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.305299041424!2d-47.993216823790235!3d-21.140245177136002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b99925679f6273%3A0xf22a8b79541e22ed!2sR.%20Volunt%C3%A1rio%20Otto%20Gomes%20Martins%2C%201202%20-%20Jardim%20Sumare%2C%20Sert%C3%A3ozinho%20-%20SP%2C%2014160-730!5e0!3m2!1sen!2sbr!4v1756937807043!5m2!1sen!2sbr"
          }
        />
      </div>
    </div>
  );
}

export default ContatoPage;
