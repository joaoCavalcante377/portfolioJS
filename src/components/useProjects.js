import { useState, useEffect } from "react";

export function useProjects() {
  const [projects, setProjects] = useState([]);

  const API_URL = "https://69f692f8a72f01a951b96fc9.mockapi.io/projects";

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Erro ao buscar projetos (GET):", error));
  }, []);

  function addProject(newProject) {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProject),
    })
      .then((response) => response.json())
      .then((data) => {
        setProjects((prev) => [...prev, data]);
      })
      .catch((error) =>
        console.error("Erro ao adicionar projeto (POST):", error),
      );
  }

  function deleteProject(id) {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setProjects((prev) =>
          prev.filter((project) => String(project.id) !== String(id)),
        );
      })
      .catch((error) =>
        console.error("Erro ao deletar projeto (DELETE):", error),
      );
  }

  function updateProject(id, updatedProject) {
    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProject),
    })
      .then((response) => response.json())
      .then((data) => {
        setProjects((prev) =>
          prev.map((proj) => (String(proj.id) === String(id) ? data : proj)),
        );
      })
      .catch((error) =>
        console.error("Erro ao atualizar projeto (PUT):", error),
      );
  }

  return { projects, addProject, deleteProject, updateProject };
}
