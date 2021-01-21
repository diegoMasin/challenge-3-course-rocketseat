import React, { useEffect, useState } from "react";
import api from "services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Novo Projeto - ${Date.now()}`,
      url: "https://github.com/diegoMasin",
      techs: ["Javascript", "React", "React Native"],
    });
    const repository = response.data;
    setRepositories([...repositories, repository]); //Mantendo a imutabilidade
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`).then((response) => {
      const newRepositoriesList = repositories.filter((item) => item.id !== id);
      setRepositories(newRepositoriesList); //Mantendo a imutabilidade
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}{" "}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
