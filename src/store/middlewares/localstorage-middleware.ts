// Importamos el tipo Middleware desde Redux Toolkit
// Este nos permite tipar correctamente la estructura del middleware
import { Middleware } from '@reduxjs/toolkit'

// Creamos un tipo local para el estado de pokemons
// Esto evita importar RootState directamente (que puede romper por referencia circular)
type PokemonsState = {
  favoritePokemons: string[]
  // otros campos que tengas
}

// Creamos un tipo que representa todo el estado del store (solo usamos pokemons aquí)
type State = {
  pokemons: PokemonsState
}

// Declaramos nuestro middleware
// ---------------------------------------------
// Middleware<unknown, State>
//   ↳ unknown: indica que no estamos tipando las acciones (pueden ser cualquiera)
//   ↳ State: le estamos diciendo cuál es la forma del estado global del store
// ---------------------------------------------
export const localStorageMiddleware: Middleware<unknown, State> = (store) => (next) => (action) => {
  // Ejecutamos la acción normalmente antes de hacer cualquier otra cosa
  // Si no llamás a `next(action)`, la acción no llega a los reducers
  const result = next(action)

  // TypeScript no sabe qué es "action", entonces le validamos manualmente
  // Esto es una "type guard": nos aseguramos de que el action tenga una propiedad "type"
  if (
    typeof action === 'object' && // aseguramos que action no sea null o un número, etc
    action !== null &&
    'type' in action &&           // verificamos que tenga la propiedad "type"
    action.type === 'pokemons/toggleFavorite' // esta es la acción que queremos interceptar
  ) {
    // Obtenemos el estado actualizado desde el store
    const { pokemons } = store.getState()

    // Guardamos los pokemons favoritos en localStorage
    localStorage.setItem('favorite-pokemons', JSON.stringify(pokemons))
  }

  // Retornamos el resultado de next(action) como exige el contrato de un middleware
  return result
}

/*
forma del video
import { Action, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { RootState } from "..";


export const localStorageMiddleware = ( state: MiddlewareAPI ) => { 
  return (next: Dispatch ) => (action: Action) => {

    next(action);

    if ( action.type === 'pokemons/toggleFavorite' ) {
      const { pokemons } = state.getState() as RootState;
      localStorage.setItem('favorite-pokemons', JSON.stringify( pokemons ));
      return;
    }  



  }
}

*/