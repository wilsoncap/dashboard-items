import { Pokemon } from "@/pokemons";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

type PokemonParams = {
  id: string;
}

// Modifica tu interfaz Props para aceptar que 'params' puede ser una Promise
interface Props {
  params: Promise<PokemonParams>; // Permite que sea el objeto o una promesa del objeto
}

// En build time, Next.js no puede generar rutas estáticas para parámetros dinámicos,
export async function generateStaticParams() {

  // Esta línea crea un array llamado 'static151Pokemons'.
  // El array tendrá 151 elementos.
  // Cada elemento será una cadena de texto que representa un número,
  // desde '1' hasta '151' (ej. ['1', '2', ..., '151']).
  const static151Pokemons = Array.from({ length: 151 }, (v, i) => `${i + 1}`);

  // Esta línea toma el array 'static151Pokemons' y lo transforma.
  // Para cada 'id' (que es una cadena de número) en 'static151Pokemons',
  // crea un nuevo objeto con la propiedad 'id' igual a ese número.
  // El resultado final es un array de objetos como:
  // [{ id: '1' }, { id: '2' }, ..., { id: '151' }]
  // Esto es típico de lo que necesita 'generateStaticParams' en Next.js.
  return static151Pokemons.map(id => ({
    id: id
  }));

}


export async function generateMetadata({params}: Props): Promise<Metadata> {
    try {
        const resolvedParams = await params;
        const { id, name } = await getPokemon(resolvedParams.id); // Asumiendo getPokemon es async
    
        return{
            title: `#${id} - ${name}`,
            description : `Información del Pokémon ${name}`,	
        }
      
    } catch {
      return {
        title: 'Pagina de pokemon',
        description: 'No encontrada'
      }
    }
}

const getPokemon = async (id: string): Promise<Pokemon> => {

  try {
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      next : {revalidate: 60 * 60 * 30 * 6}//revalidar esta pantalla cada 6 meses
      //cache: 'force-cache'//TODO cambia en un fituro
    }).then(res => res.json());
    console.log(pokemon);
    return pokemon;
    
  } catch {
    notFound();
  }
  
}

export default async function PokemonPage({params}: Props) {
  const resolvedParams = await params;
  const pokemon = await getPokemon(resolvedParams.id);
    return (
    <div className="flex mt-5 flex-col items-center text-slate-800">
      <div className="relative flex flex-col items-center rounded-[20px] w-[700px] mx-auto bg-white bg-clip-border  shadow-lg  p-3">
        <div className="mt-2 mb-8 w-full">
          <h1 className="px-2 text-xl font-bold text-slate-700 capitalize">
            #{pokemon.id} {pokemon.name}
          </h1>
          <div className="flex flex-col justify-center items-center">
            <Image
              src={pokemon.sprites.other?.dream_world.front_default ?? ''}
              width={150}
              height={150}
              alt={`Imagen del pokemon ${pokemon.name}`}
              className="mb-5"
            />


            <div className="flex flex-wrap">
              {
                pokemon.moves.map(move => (
                  <p key={move.move.name} className="mr-2 capitalize">{move.move.name}</p>
                ))
              }
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 px-2 w-full">

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm text-gray-600">Types</p>
            <div className="text-base font-medium text-navy-700 flex">
              {
                pokemon.types.map(type => (
                  <p key={type.slot} className="mr-2 capitalize">{type.type.name}</p>
                ))
              }
            </div>
          </div>

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm text-gray-600">Peso</p>
            <span className="text-base font-medium text-navy-700 flex">
              {
                pokemon.weight
              }
            </span>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
            <p className="text-sm text-gray-600">Regular Sprites</p>
            <div className="flex justify-center">

              <Image
                src={pokemon.sprites.front_default}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

              <Image
                src={pokemon.sprites.back_default}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

            </div>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
            <p className="text-sm text-gray-600">Shiny Sprites</p>
            <div className="flex justify-center">

              <Image
                src={pokemon.sprites.front_shiny}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

              <Image
                src={pokemon.sprites.back_shiny}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

            </div>
          </div>



        </div>
      </div>
    </div>
  );
}