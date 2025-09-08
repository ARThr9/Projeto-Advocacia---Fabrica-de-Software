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
          <strong>Telefone:</strong> (16) 3945-9066
        </p>
        <p>
          <strong>Email:</strong> silviapereiraadvogados@gmail.com
        </p>
        <p>
          <strong>Endereço:</strong> Rua Voluntário Otto Gomes Martins, 1202
        </p>
        {/* <Map
          embedUrl={
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.305299041424!2d-47.993216823790235!3d-21.140245177136002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b99925679f6273%3A0xf22a8b79541e22ed!2sR.%20Volunt%C3%A1rio%20Otto%20Gomes%20Martins%2C%201202%20-%20Jardim%20Sumare%2C%20Sert%C3%A3ozinho%20-%20SP%2C%2014160-730!5e0!3m2!1sen!2sbr!4v1756937807043!5m2!1sen!2sbr"
          }
        /> */}
      </div>
    </div>
  );
}

export default ContatoPage;

// Código de Contatos Bonito e quase pronto
// import React from "react";
// import ContatoForm from "../../components/ContatoForm"; // Importando seu formulário!
// import "./ContatoPage.css"; // Usaremos este CSS para o novo estilo

// // Ícones simples para dar um toque visual
// const IconeMapa = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
//     <circle cx="12" cy="10" r="3"></circle>
//   </svg>
// );
// const IconeEmail = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
//     <polyline points="22,6 12,13 2,6"></polyline>
//   </svg>
// );
// const IconeTelefone = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
//   </svg>
// );

// function ContatoPage() {
//   return (
//     <div className="contato-page-container">
//       <div className="contato-header">
//         <h1>Fale Conosco</h1>
//         <p>
//           Estamos à disposição para esclarecer suas dúvidas e agendar uma
//           consulta.
//         </p>
//       </div>

//       <div className="contato-main-content">
//         {/* Coluna da Esquerda: Informações e Mapa */}
//         <div className="contato-info-column">
//           <h2>Nossos Canais</h2>
//           <ul className="contact-details-list">
//             <li className="contact-detail-item">
//               <IconeTelefone />
//               <div>
//                 <strong>Telefone:</strong>
//                 <p>(16) 3945-9066</p>
//               </div>
//             </li>
//             <li className="contact-detail-item">
//               <IconeEmail />
//               <div>
//                 <strong>Email:</strong>
//                 <p>silviapereiraadvogados@gmail.com</p>
//               </div>
//             </li>
//             <li className="contact-detail-item">
//               <IconeMapa />
//               <div>
//                 <strong>Endereço:</strong>
//                 <p>Rua Voluntário Otto Gomes Martins, 1202 - Sertãozinho, SP</p>
//               </div>
//             </li>
//           </ul>
//           <div className="map-container">
//             <iframe
//               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.573177260531!2d-47.9947938855368!3d-21.1695889859223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b9b9a6b1a6a5d7%3A0x7d28c3b3a6b5a5b5!2sR.%20Volunt%C3%A1rio%20Otto%20Gomes%20Martins%2C%201202%20-%20Jardim%20Am%C3%A1lia%2C%20Sert%C3%A3ozinho%20-%20SP%2C%2014160-730!5e0!3m2!1spt-BR!2sbr!4v1663189912123!5m2!1spt-BR!2sbr"
//               width="600"
//               height="450"
//               style={{ border: 0 }}
//               allowFullScreen=""
//               loading="lazy"
//               referrerPolicy="no-referrer-when-downgrade"
//             ></iframe>
//           </div>
//         </div>

//         {/* Coluna da Direita: Formulário */}
//         <div className="contato-form-column">
//           <h2>Envie uma Mensagem</h2>
//           <ContatoForm />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ContatoPage;
