import React from 'react';
import './App.css';
import Query from './query.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      pokemonData: null,
      status: 0, // 0 -> initial, 1 -> found, -1 -> not found, -2 -> error
      cache: {} // Object to store cached Pokémon data
    };
  }

  previous = () => {
    const id = this.state.pokemonData.id - 1;
    if (id > 0) this.searchPokemon(id);
  }

  next = () => {
    const id = this.state.pokemonData.id + 1;
    if (id < 1026) this.searchPokemon(id);
  }

  searchPokemon = (idOrName) => {
    const { cache } = this.state;
    const cacheKey = idOrName;
    
    // Check if the data is already cached
    if (cache[cacheKey]) {
      this.setState({ pokemonData: cache[cacheKey], status: 1 });
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
          if (response.status === 404) {
            this.setState({ pokemonData: null, status: -1 });
            throw new Error('Pokemon not found');
          } else if (response.status === 500) {
            this.setState({ pokemonData: null, status: -2 });
            throw new Error('Server error');
          } else {
            this.setState({ pokemonData: null, status: -2 });
            throw new Error('Network response was not ok');
          }
        }
        return response.json();
      })
      .then(data => {
        // Update cache
        cache[cacheKey] = data;
        this.setState({ pokemonData: data, status: 1, cache });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {
    return (
      <div className="App">
        <h1>Search Pokedex:</h1>
        <input type="text" id="input" onChange={(i) => this.setState({ input: i.target.value })} />
        <button onClick={() => this.searchPokemon(this.state.input)}>Search</button>
        <Query pokemonData={this.state.pokemonData} status={this.state.status} previous={this.previous} next={this.next} />
      </div>
    );
  }
}

export default App;
