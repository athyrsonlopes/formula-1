import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Painel from './components/Painel';
import Carta from './components/Carta';

function App() {
  const [query, setQuery] = useState('');
  const [players, setPlayers] = useState([]);
  const [favoritos, setfavoritos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [qtdPlayer] = useState(3);
  const [lista, setlista] = useState([]);

  useEffect(() => {
    if (query) {
      pesquisar();
    }
  }, [query]);

  const pesquisar = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${query}`
      );
      const automobilistas = response.data.player.filter(
        (player) => player.strSport === 'Motorsport'
      );

      setlista(automobilistas);
      setPlayers(automobilistas.slice(0, qtdPlayer));
      setPage(1);
    } catch (error) {
      console.error('erro ao pesquisar:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadPlayers = () => {
    const startIndex = page * qtdPlayer;
    const nextPlayers = lista.slice(startIndex, startIndex + qtdPlayer);
    setPlayers(nextPlayers);
    setPage(page + 1);
  };

  const favoritar = (player) => {
    if (!favoritos.some((favPlayer) => favPlayer.idPlayer === player.idPlayer)) {
      setfavoritos([...favoritos, player]);
    } else {
      alert("já favoritado");
    }
  };


  return (
    <div className="container mt-5">
      <h2 className='text-white text-center'>F1 Info</h2>
      <div className="row">
        <div className="col">
          <div className="input-group mb-3 mx-auto" style={{ width: '30%' }}>
          <span class="input-group-text" id="basic-addon1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"></path>
                </svg>
              </span>
            <input
              type="text"
              className="form-control"
              placeholder="nome do automobilista"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  pesquisar();
                }
              }}
            />
            <div className="input-group-append">
              <button
                className="btn btn-success"
                type="button"
                onClick={pesquisar}
              >
                <i className="bi bi-search">🏎️</i>
              </button>
            </div>

          </div>
        </div>
      </div>
      <div className="row">
        {isLoading ? (
          <div className="col text-center">
            <p>carregando</p>
          </div>
        ) : players.length > 0 ? (
          players.map((player) => (
            <Carta key={player.idPlayer} player={player} favoritar={favoritar} />
          ))
        ) : (
          <div className="col text-center">
            {query && <p>nenhum automobilista encontrado.</p>}
          </div>
        )}
      </div>
      {players.length > 0 && !isLoading && (
        <div className="row">
          <div className="col text-center">
            <button className="btn btn-danger mb-4" onClick={loadPlayers}>
              Mais
            </button>
          </div>
        </div>
      )}
      
      <div className="row text-center">
      <h2 className='text-white'>favoritos</h2>
        <div className="col">
          
          <Painel favoritos={favoritos} />
        </div>
      </div>
    </div>
  );
}

export default App;