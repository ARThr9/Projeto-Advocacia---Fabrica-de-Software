// src/components/ListaCursos.jsx
import { Link } from "react-router-dom";

function ListaCursos({ cursos, loading, onDelete }) {
  if (loading) {
    return <p>Carregando cursos...</p>;
  }

  const handleDeleteClick = (cursoId) => {
    if (window.confirm("Tem certeza que deseja excluir este curso?")) {
      onDelete(cursoId);
    }
  };

  return (
    <div>
      <h2>Crusos Prestados</h2>
      <ul>
        {cursos.length === 0 ? (
          <p>Nenhum curso cadastrado.</p>
        ) : (
          cursos.map((curso) => (
            <li
              key={curso.id}
              style={{
                marginBottom: "15px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "10px",
              }}
            >
              {/* Adicionamos a exibição da imagem aqui */}
              {/* A imagem só é mostrada se a 'imagem_url' existir */}
              {curso.imagem_url && (
                <img
                  src={curso.imagem_url}
                  alt={curso.titulo}
                  style={{
                    width: "150px",
                    height: "auto",
                    marginBottom: "10px",
                  }}
                />
              )}

              <h3>{curso.titulo}</h3>
              <p>{curso.descricao}</p>

              <Link to={`/admin/edit/${curso.id}`}>
                <button style={{ marginRight: "10px" }}>Editar</button>
              </Link>

              <button onClick={() => handleDeleteClick(curso.id)}>
                Excluir
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default ListaCursos;
