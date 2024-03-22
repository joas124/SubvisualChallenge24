import React from 'react';
import './App.css';
import Query from './query.js';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      input: '',
      pokemonData: null,
      status: 0 //0 -> initial, 1 -> found, -1 -> not found, -2 -> error
    };
  }

  previous = () => {
    const id = this.state.pokemonData.id - 1;
    if(id > 0) this.searchPokemon(id);
  }

  next = () => {
    const api = this.state.pokemonData.id + 1;
    if (api < 1026) this.searchPokemon(api);
  }

  searchPokemon = (id) => {
    let api = 'https://pokeapi.co/api/v2/pokemon/';
    //check if id is a number

    if (!isNaN(id)){
      api += id;
    }else{
      api += this.state.input.toLowerCase();
    }
    console.log(api);

    fetch(api)
      .then(response => {
        if (!response.ok) {
          if (response.status === 404) {
            this.setState({pokemonData: null, status: -1});
            throw new Error('Pokemon not found');
          } else if (response.status === 500) {
            this.setState({pokemonData: null, status: -2});
            throw new Error('Server error');
          } else {
            this.setState({pokemonData: null, status: -2});
            throw new Error('Network response was not ok');
          }
        }
        return response.json();
      })
      .then(data => {
        this.setState({pokemonData: data, status: 1});
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render(){
    return(
      <div className="App">
        <h1>Search Pokedex:</h1>
        <input type="text" id="input" onChange={(i) => this.setState({input: i.target.value})} />
        <button onClick={this.searchPokemon}>Search</button>
        <Query pokemonData={this.state.pokemonData} status={this.state.status} previous={this.previous} next={this.next} />
      </div>
  )};
}

export default App;
