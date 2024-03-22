import React from "react";

class Query extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const {pokemonData, status} = this.props;
    
    switch(status){
      case(0):
        return(
          <div></div>
        );
      case(1):
        
        const {name, sprites} = pokemonData;
        return (
          <div>
            <h1>Name: {name[0].toUpperCase() + name.slice(1)}</h1>
            <img src={sprites.front_default} alt={name}></img>
          </div>
        );
      case(-1):
        return(
          <div>
            <h1>POKEMON NOT FOUND</h1>
          </div>
        );
      case(-2):
        return(
          <div>
            <h1>ERROR</h1>
          </div>
        );
    }
  }
}

export default Query;