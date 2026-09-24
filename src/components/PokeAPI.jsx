import React from 'react'
import { useState } from 'react'
import axios from 'axios'

function PokeAPI() {
  const url = 'https://pokeapi.co/api/v2/pokemon/';
  const [name, setName] = useState('');
  const [pokemon, setPokemon] = useState(null);

  const searchPokemon = () => {
    axios
        .get(`${url}${name}`)
        .then(function (response){
          const { name: pokemon_name, base_experience, abilities } = response.data;
          setPokemon({ name: pokemon_name, base_experience, abilities });
        })
  }

  return (
    <div>
        <input type='text' value={name} placeholder='Pokemon'
        onChange={(e) => setName(e.target.value)}></input>

        <button onClick={searchPokemon}>Search Pokemon</button>

        {pokemon && (
        <div>
              <p>NAME: {pokemon.name}</p>
              <p>EXPERIENCE: {pokemon.base_experience}</p>
              <p>ABILITIES: {pokemon.abilities.map(a => a.ability?.name).join(', ')}</p>
        </div>
        )}
    </div>
  )
}

export default PokeAPI
