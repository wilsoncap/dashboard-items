import { PokemonsGrid, PokemonsResponse, SimplePokemon } from "@/pokemons";

const getPokemons = async (limit = 20, offset = 0): Promise<SimplePokemon[]> => {
  const data:PokemonsResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
    .then(res => res.json());

  const pokemons = data.results.map(pokemon =>({
    id:pokemon.url.split('/').at(-2)!,
    name: pokemon.name
  }))

  return pokemons;
}

export default async function PokemonsPage() {
  const pokemons = await getPokemons(151);
  return (
    <div className="flex flex-col">
      <span className="text-5xl my-2">Listado de pokemn <small>estatico</small></span>
      <PokemonsGrid pokemons={pokemons} />
    </div>
  );
}