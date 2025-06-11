

import { SimplePokemon } from '@/pokemons';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../index'

/*
  {
    favorites :{
     '1': {id: '1', name:'bulbasor'},
     '3': {id: '3', name:'venasaur'},
     '5': {id: '5', name:'charmaleon'}
    }
  }
*/

interface pokemonState{
    favorites: {[key:string]: SimplePokemon}
}

// const getInitialState = ():pokemonState => {
//   //if(typeof localStorage === 'undefined') return {}
//   const favorites = JSON.parse(localStorage.getItem('favorite-pokemons') ?? '{}');
//   return favorites;
// }

const initialState:pokemonState = {
    favorites: {},
    //...getInitialState()
    // '1': {id: '1', name:'bulbasor'},
    // '3': {id: '3', name:'venasaur'},
    // '5': {id: '5', name:'charmaleon'}
}

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {

    setFavoritePokemons: (state, action: PayloadAction<{[key:string]: SimplePokemon}>)=>{
      state.favorites = action.payload;
    },

    toggleFavorite: (state, action: PayloadAction<SimplePokemon>)=>{
        const pokemon = action.payload;
        const {id} = pokemon;

        if (state.favorites[id]){
            delete state.favorites[id];
            return
        }else{
          state.favorites[id] = pokemon;
        }
        // no se debe j¿hacer en redux
        localStorage.setItem('favorite-pokemons', JSON.stringify(state.favorites))
    }
  }
});

export const {toggleFavorite, setFavoritePokemons} = pokemonsSlice.actions

export default pokemonsSlice.reducer

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();