'use client'

import { useAppSelector } from "@/store/pokemons/pokemons";
import { PokemonsGrid } from "./PokemonsGrid";



export const PokemonsGridFavorites = () => {

 const pokemonsFavorite = useAppSelector(state => Object.values(state.pokemons))
  return (
    <div className="flex flex-wrap gap-10 items-center justify-center">
        {
          <div className="flex flex-col">
                <PokemonsGrid pokemons={pokemonsFavorite} />
          </div>
        }
    </div>
  )
}
