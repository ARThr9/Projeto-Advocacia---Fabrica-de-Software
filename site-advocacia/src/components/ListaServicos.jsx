// src/components/ListaServicos.jsx
import { Link } from "react-router-dom";
import "./ListaServicos.css"; // 1. Importa o novo arquivo CSS

function ListaServicos({ servicos, loading, onDelete }) {
  if (loading) {
    return <p>Carregando serviços...</p>;
  }

  // A função de clique está perfeita, não mudamos
  const handleDeleteClick = (servicoId) => {
    if (window.confirm("Tem certeza que deseja excluir este serviço?")) {
      onDelete(servicoId);
    }
  };

  return (
    // 2. Removemos o h2 e div wrapper, e adicionamos a classe na <ul>
    <ul className="admin-list">
      {servicos.length === 0 ? (
        <p>Nenhum serviço cadastrado.</p>
      ) : (
        servicos.map((servico) => (
          // 3. Removemos o style inline e adicionamos a classe
          <li key={servico.id} className="admin-list-item">
            {servico.imagem_url && (
              // 4. Adicionamos um wrapper com classe para a imagem
              <div className="admin-list-item-image">
                <img src={servico.imagem_url} alt={servico.titulo} />
              </div>
            )}

            {/* 5. Adicionamos um wrapper para o conteúdo de texto */}
            <div className="admin-list-item-content">
              <h3>{servico.titulo}</h3>
              <p>{servico.descricao}</p>

              {/* 6. Adicionamos o wrapper de botões do AdminLayout.css */}
              <div className="admin-list-actions">
                {/* 7. Aplicamos as classes de botão no Link */}
                <Link
                  to={`/admin/edit/${servico.id}`}
                  className="btn-admin-secondary"
                >
                  Editar
                </Link>

                {/* 8. Aplicamos as classes de botão no Button */}
                <button
                  onClick={() => handleDeleteClick(servico.id)}
                  className="btn-admin-secondary btn-admin-danger"
                >
                  Excluir
                </button>
              </div>
            </div>
          </li>
        ))
      )}
    </ul>
  );
}

export default ListaServicos;
