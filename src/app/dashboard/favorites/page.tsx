import { PokemonsGrid, PokemonsResponse, SimplePokemon } from "@/pokemons";


export const metadata = {
  title: 'Pókemon - Favoritos',
  description: 'Listado de Pókemon favoritos',
}


export default async function FavoritesPage() {
  return (
    <div className="flex flex-col">
      <span className="text-5xl my-2">Pókemon Favoritos <small className="text-blue-700">Global State</small></span>
      <PokemonsGrid pokemons={[]} />
    </div>
  );
}