import React from "react";
import "./ContatoForm.css";

function ContatoForm() {
  return (
    <div className="contato-form">
      <h3>Fale com um de nossos especialistas</h3>
      <form>
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
        </div>
        <button type="submit" className="submit-btn">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default ContatoForm;
