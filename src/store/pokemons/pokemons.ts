import { SimplePokemon } from '@/pokemons';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
    toggleFavorite: (state, action: PayloadAction<SimplePokemon>)=>{
        const pokemon = action.payload;
        const {id} = pokemon;

        if (state[id]){
            delete state[id];
            return
        }

        state[id] = pokemon;
    }
  }
});

export const {toggleFavorite} = pokemonsSlice.actions

export default pokemonsSlice.reducer