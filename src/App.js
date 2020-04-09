import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    handleGetRepository();
  }, []);

  async function handleGetRepository() {
    const repos = await api.get("/repositories");

    setRepos([...repos.data]);
  }

  async function handleAddRepository() {
    const repo = await api.post("/repositories", {
      url: "https://github.com/vocampos/conceitos-react",
      title: `Conceitos React ${Math.random()}`,
      techs: ["Node", "Express", "TypeScript"],
    });

    setRepos([...repos, repo.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    if (response.status === 204) {
      setRepos((repos) => repos.filter((item) => item.id !== id));
    }
  }

  return (
    <div>
      <button onClick={handleAddRepository}>Adicionar</button>

      <ul data-testid="repository-list">
        {repos.map((repo, index) => (
          <li key={repo.id}>
            <label>{repo.title}</label>
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
