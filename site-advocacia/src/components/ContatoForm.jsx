import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import "./ContatoForm.css";

function ContatoForm() {
  const [state, handleSubmit] = useForm("mwpnyovk"); // Alterar para o email da cliente

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
      {/* O handleSubmit do Formspree cuida do envio */}
      <form onSubmit={handleSubmit}>
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
          />

          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>

        <div className="form-group">
          <label htmlFor="telefone">Telefone</label>
          <input
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
