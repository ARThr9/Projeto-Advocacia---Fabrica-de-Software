// src/pages/AdminCursosPage.jsx
import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";

import AddCurso from "../../components/AddCurso";
import ListaCursos from "../../components/ListaCursos";

function AdminCursosPage({ session }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cursos, setCursos] = useState([]);

  const getCursos = useCallback(async () => {
    try {
      setLoading(true);
      let { data, error } = await supabase
        .from("cursos") // MUDANÇA AQUI
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) setCursos(data);
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCursos();
  }, [getCursos]);

  const handleDeleteCurso = async (id) => {
    try {
      // Deletar a imagem do storage primeiro
      const cursoParaDeletar = cursos.find((c) => c.id === id);
      if (cursoParaDeletar && cursoParaDeletar.imagem_url) {
        const nomeArquivo = cursoParaDeletar.imagem_url.split("/").pop();
        await supabase.storage
          .from("imagens-servicos")
          .remove([`public/${nomeArquivo}`]);
      }

      // Deletar o registro do curso no banco de dados
      const { error } = await supabase
        .from("cursos")
        .delete()
        .match({ id: id }); // MUDANÇA AQUI
      if (error) throw error;

      setCursos(cursos.filter((c) => c.id !== id));
      alert("Curso excluído com sucesso!");
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div>
      <h1>Área Administrativa</h1>
      <nav>
        <Link to="/admin">Gerenciar Serviços</Link> |{" "}
        <Link to="/admin/cursos">Gerenciar Cursos</Link>
      </nav>
      <p>Bem-vindo, {session.user.email}!</p>
      <button onClick={handleLogout}>Sair (Logout)</button>
      <hr />
      <AddCurso onAdd={getCursos} />
      <hr />
      <ListaCursos
        cursos={cursos}
        loading={loading}
        onDelete={handleDeleteCurso}
      />
    </div>
  );
}

export default AdminCursosPage;
