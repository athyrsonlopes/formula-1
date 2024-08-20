import React from 'react';

function cleanHeight(height) {
    return height.replace(/\s*\(.*?\)\s*/, '');
  }

function Carta({ player, favoritar }) {
  return (
    <div key={player.idPlayer} className="col-md-6 mb-3">
      <div className="card" style={{ backgroundColor: 'white', border: '2px solid white', padding: '10px', width: '100%' }}>
        <div className="d-flex">
          <div className="flex-shrink-0 text-center">
            <img
              src={player.strThumb}
              className="card-img"
              alt={player.strPlayer}
              style={{ width: '200px', height: 'auto', marginRight: '15px' }}
            />
            <h5 className="card-text mt-2">{player.strPlayer}</h5>
          </div>

          <div className="flex-grow-1">
            <div className="card-body">
              <p className="card-text"><b>Nacionalidade:</b> {player.strNationality}</p>
              <p className="card-text"><b>Equipe:</b> {player.strTeam}</p>
              <p className="card-text"><b>Status:</b> {player.strStatus}</p>
              <p className="card-text"><b>Altura:</b> {cleanHeight(player.strHeight)}</p>
              <button className="btn btn-danger" onClick={() => favoritar(player)}>
                Favoritar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carta;
