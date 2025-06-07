import { SimplePokemon } from "../interfaces/simple-pokemon";
import { CardPokemont } from "./CardPokemont"

interface Props{ // es obligatorio, me lo tienen que manda
    pokemons: SimplePokemon[];
}

export const PokemonsGrid = ({pokemons}: Props) => {
  return (
    <div className="flex flex-wrap gap-10 items-center justify-center">
        {
          pokemons.map(pokemon => (
            <CardPokemont key={pokemon.id} pokemon={pokemon}/>
          ))
        }
    </div>
  )
}
