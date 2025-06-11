'use client'

import { useAppSelector } from "@/store/pokemons/pokemons";
import { PokemonsGrid } from "./PokemonsGrid";
import { useState } from "react";
import { IoHeartOutline } from "react-icons/io5";



export const PokemonsGridFavorites = () => {

 const pokemonsFavorite = useAppSelector(state => Object.values(state.pokemons))
 const [pokemons] = useState(pokemonsFavorite)
  return (
    <div className="flex flex-wrap gap-10 items-center justify-center">
        {
          <div className="flex flex-col">
                {
                  pokemons.length
                  ? (<PokemonsGrid pokemons={pokemons} />) 
                  : (<NoFavorites />)
                }
                {/* <PokemonsGrid pokemons={pokemonsFavorite} /> */}
                
          </div>
        }
    </div>
  )
}

export const NoFavorites = () => {
  return(
    <div className="flex flex-col h-[50vh] items-center justify-center">
      <IoHeartOutline size={100} className="text-red-500" />
      <span>No hay favoritos</span>

    </div>
  )
}
