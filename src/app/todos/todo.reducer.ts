import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { borrar, borrarCompletados, crear, editar, toogle, toogleAll } from './todo.actions';

export const estadoInicial: Todo[] = [new Todo('Salvar el mundo')];

export const todoReducer = createReducer(
  estadoInicial,
  on(crear, (state, { texto }) => [...state, new Todo(texto)]),
  on(toogle, (state, { id }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado,
        };
      } else {
        return { ...todo };
      }
    });
  }),
  on(editar, (state, { id, texto }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          texto,
        };
      } else {
        return { ...todo };
      }
    });
  }),
  on(borrar, (state, { id }) => {
    return state.filter((todo) => todo.id !== id);
  }),
  on(borrarCompletados, (state) => {
    return state.filter((todo) => !todo.completado);
  }),
  on(toogleAll, (state, { completado }) => {
    return state.map((todo) => {
      return {
        ...todo,
        completado,
      };
    });
  })
);
