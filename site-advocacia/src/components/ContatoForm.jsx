import React, { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
// NOVO: Importe o componente da react-imask
import { IMaskInput } from "react-imask";
import "./ContatoForm.css";

function ContatoForm() {
  const [state, handleSubmit] = useForm("mwpnyovk");

  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // A função de change do telefone agora recebe o valor "puro" (sem máscara)
  // O onAccept é uma prop do IMaskInput
  const handleTelefoneChange = (value) => {
    setTelefone(value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");
  };

  const handleEmailBlur = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (email.length > 0 && !emailRegex.test(email)) {
      setEmailError("Por favor, insira um e-mail válido.");
    } else {
      setEmailError("");
    }
  };

  if (state.succeeded) {
    return (
      <p className="form-success-message">
        Obrigado! Sua mensagem foi enviada com sucesso.
      </p>
    );
  }

  return (
    <div className="contato-form">
      <h3>Fale com um de nossos especialistas</h3>
      <form onSubmit={handleSubmit}>
        {/* ... campos de nome e email ... */}
        <div className="form-group">
          <label htmlFor="nome">Nome completo</label>
          <input
            type="text"
            id="nome"
            name="nome"
            placeholder="*Nome completo"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="*E-mail"
            required
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
          />
          {emailError && <p className="error-message">{emailError}</p>}
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>

        {/* --- CAMPO DE TELEFONE ATUALIZADO COM IMaskInput --- */}
        <div className="form-group">
          <label htmlFor="telefone">Telefone</label>
          <IMaskInput
            mask="(00) 00000-0000" // A máscara agora é com 0 para aceitar qualquer número
            value={telefone}
            // onAccept é usado em vez de onChange para pegar o valor sem a máscara
            onAccept={handleTelefoneChange}
            type="tel"
            id="telefone"
            name="telefone"
            placeholder="*Telefone"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="mensagem">Mensagem</label>
          <textarea
            id="mensagem"
            name="mensagem"
            rows="4"
            placeholder="*Mensagem"
            required
          ></textarea>
          <ValidationError
            prefix="Mensagem"
            field="mensagem"
            errors={state.errors}
          />
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={state.submitting}
        >
          {state.submitting ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}

export default ContatoForm;
