import { SimplePokemon } from '@/pokemons';
import { createSlice } from '@reduxjs/toolkit'

interface pokemonState{
    [key:string]: SimplePokemon
}

const initialState:pokemonState = {
    '1': {id: '1', name:'bulbasor'},
    '3': {id: '3', name:'venasaur'}
}

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {

  }
});

export const {} = pokemonsSlice.actions

export default pokemonsSlice.reducer