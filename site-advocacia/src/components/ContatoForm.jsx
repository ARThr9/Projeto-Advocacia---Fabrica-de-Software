// src/components/ContatoForm.jsx
import { useState } from "react";
import "./ContatoForm.css"; // Criaremos este CSS a seguir

function ContatoForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Futuramente, aqui você pode adicionar a lógica para enviar o email
    alert("Mensagem enviada! (funcionalidade a ser implementada)");
    // Limpar formulário
    setNome("");
    setEmail("");
    setTelefone("");
    setMensagem("");
  };

  return (
    <div className="form-container">
      <h3>Fale com um de nossos especialistas</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="*Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="*E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="*Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          required
        />
        <textarea
          placeholder="*Mensagem"
          rows="4"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          required
        ></textarea>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default ContatoForm;
