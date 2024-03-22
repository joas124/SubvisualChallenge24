import React, { useState } from 'react';
import './App.css';
import { Query } from './query.js';

function App() {
  const [input, setInput] = useState(0);
  const [pokemonData, setPokemonData] = useState(null);
  const [status, setStatus] = useState(0); // 0 -> initial, 1 -> found, -1 -> not found, -2 -> error
  const [cache, setCache] = useState({}); // Object to store cached Pokémon data

  const previous = () => {
    const id = pokemonData.id - 1;
    if (id > 0) searchPokemon(id);
  }

  const next = () => {
    const id = pokemonData.id + 1;
    if (id < 1026) searchPokemon(id);
  }

  const searchPokemon = (idOrName) => {
    document.getElementById('input').value = '';
    const cacheKey = idOrName;

    // Check if the data is already cached
    if (cache[cacheKey]) {
      setPokemonData(cache[cacheKey]);
      setStatus(1);
      return;
    }

    let api = 'https://pokeapi.co/api/v2/pokemon/';

    // Check if idOrName is a number
    if (isNaN(idOrName)) {
      api += idOrName.toLowerCase();
    } else {
      api += idOrName;
    }

    fetch(api)
      .then(response => {
        if (!response.ok) {
          let status = -2;
          let message = 'Network response was not ok';

          if (response.status === 404) {
            status = -1;
            message = 'Pokemon not found';
          } else if (response.status === 500) {
            message = 'Server error';
          }

          setPokemonData(null);
          setStatus(status);
          throw new Error(message);
        }
        return response.json();
      })
      .then(data => {
        // Update cache
        cache[cacheKey] = data;
        setPokemonData(data);
        setStatus(1);
        setCache(cache);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="App">
      <nav>
        <img src='https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg' alt='Pokemon logo' />
        <h1>Searcher</h1>
      </nav>
      <main>
        <h2>Search Pokedex:</h2>
        <Query pokemonData={pokemonData} status={status} previous={previous} next={next} />
        <div className='search'>
          <input type='text' placeholder='Name/Id' id='input' className='input-bar' onChange={(i) => setInput(i.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                searchPokemon(input);
              }
            }} />
          <button className='search' onClick={() => searchPokemon(input)}>Search</button>
        </div>
        {/* write made by joas at the bottom */}
        <footer>
          <p>Made by Joás Silva</p>
        </footer>
      </main>
    </div>
  );
}


export default App;