// src/components/ListaServicos.jsx
import { Link } from "react-router-dom";

function ListaServicos({ servicos, loading, onDelete }) {
  if (loading) {
    return <p>Carregando serviços...</p>;
  }

  const handleDeleteClick = (servicoId) => {
    if (window.confirm("Tem certeza que deseja excluir este serviço?")) {
      onDelete(servicoId);
    }
  };

  return (
    <div>
      <h2>Serviços Prestados</h2>
      <ul>
        {servicos.length === 0 ? (
          <p>Nenhum serviço cadastrado.</p>
        ) : (
          servicos.map((servico) => (
            <li
              key={servico.id}
              style={{
                marginBottom: "15px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "10px",
              }}
            >
              {servico.imagem_url && (
                <img
                  src={servico.imagem_url}
                  alt={servico.titulo}
                  style={{
                    width: "150px",
                    height: "auto",
                    marginBottom: "10px",
                  }}
                />
              )}

              <h3>{servico.titulo}</h3>
              <p>{servico.descricao}</p>

              <Link to={`/admin/edit/${servico.id}`}>
                <button style={{ marginRight: "10px" }}>Editar</button>
              </Link>

              <button onClick={() => handleDeleteClick(servico.id)}>
                Excluir
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default ListaServicos;
