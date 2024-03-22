import React from "react";

export function Query({pokemonData, status, previous, next}) {
  
    switch(status){
      case(1):
        return (
          <div className='container'>
            <div className='name-id'>
              <h3 className='pokemon-name'>
                {pokemonData ? pokemonData.name[0].toUpperCase() + pokemonData.name.slice(1) : ''}
              </h3>
              <p className='id'>
                {pokemonData ? pokemonData.id : ''}
              </p>
            </div>
            <img src={pokemonData ? pokemonData.sprites.front_default : ''} alt={pokemonData ? pokemonData.name : ''} />
            <div className='buttons'>
                {/* Check if status is 1 to show buttons */}
                {status === 1 &&
                  <div>
                    <button disabled={pokemonData && pokemonData.id === 1} onClick={previous}>Previous</button>
                    <button disabled={pokemonData && pokemonData.id === 1025} onClick={next}>Next</button>
                  </div>
                }
            </div>
          </div>
        );
      case(-1):
        return(
          <div className='container'>
            <h1>POKEMON NOT FOUND</h1>
          </div>
        );
      case(-2):
        return(
          <div className='container'>
            <h1>ERROR</h1>
          </div>
        );
      default:
        return(
          <div className='container'></div>
        );
    }
}