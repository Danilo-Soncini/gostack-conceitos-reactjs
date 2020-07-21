import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories,setRepositories] = useState([]);

  async function handleAddRepository() {
    const { data : repository } = await api.post('/repositories', {
      title : 'Desafio ReactJS',
      owner : 'Danilo Soncini'
    });
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter((repository)=> repository.id !== id));
  }

  useEffect(() =>{
    async function getRepositories() {
      const { data } = await api.get('/repositories');
      setRepositories(data);
    }
    getRepositories();
  },[])
  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

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
