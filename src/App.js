import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {

  /**
   * States
   */
  const [repositories, setRepositories] = useState([]);

  /**
   * Functions
   */
  async function handleAddRepository() {
    const response = api.post('repositories', {
      url: "https://github.com/Rocketseat/umbriel",
      title: `Repository ${Date.now()}`,
      techs: ["Node", "Express", "TypeScript"]
    });

    const repository = (await response).data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id, index) {

    try {
      await api.delete(`/repositories/${id}`);
      repositories.splice(index, 1);
      setRepositories([...repositories]);
    } catch (error) {
      alert('It was not possible to remove the project.')
    }

  }


  useEffect(() => {
    api.get('/repositories').then(response => {
      // console.log(response.data);
      setRepositories(response.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">

        {
          repositories.map((repository, index) => {
            return (

              <li key={repository.id}>

                {repository.title}

                <button onClick={() => handleRemoveRepository(repository.id, index)}>
                  Remover
                </button>
              </li>

            );
          })
        }
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
