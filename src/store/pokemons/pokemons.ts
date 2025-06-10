

import { SimplePokemon } from '@/pokemons';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../index'

interface pokemonState{
    [key:string]: SimplePokemon
}

const initialState:pokemonState = {
    '1': {id: '1', name:'bulbasor'},
    '3': {id: '3', name:'venasaur'},
    '5': {id: '5', name:'charmaleon'}
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

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();