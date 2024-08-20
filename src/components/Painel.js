import React from 'react';

const Painel = ({ favoritos }) => {
  const rows = [];
  for (let i = 0; i < favoritos.length; i += 4) {
    rows.push(favoritos.slice(i, i + 4));
  }

  return (
    
    <div className="col text-center mt-12 mb-4" style={{ border: '5px solid white', background: 'white', borderRadius: '20px'}}>
    <h2 className='text-white'>favoritos</h2>
      {favoritos.length > 0 && (
        <div>
          
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((player) => (
                <div key={player.idPlayer} className="col-md-4 mb-2">
                  <div className="card" style={{ width: '90%', border: '1px solid black' }}>
                    <img
                      style={{ width: '100%' }}
                      src={player.strThumb}
                      className="card-img-top mx-auto"
                      alt={player.strPlayer}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title">{player.strPlayer}</h5>
                      <p className="card-text">Nacionalidade: {player.strNationality}</p>
                      <p className="card-text">Time: {player.strTeam}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Painel;