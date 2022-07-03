import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actionsFiltro from 'src/app/filtro/filtro.actions';
import * as actionsTodo from 'src/app/todos/todo.actions';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css'],
})
export class TodoFooterComponent implements OnInit {
  filtroActual: actionsFiltro.filtrosValidos = 'todos';
  filtros: actionsFiltro.filtrosValidos[] = ['todos', 'pendientes', 'completados'];
  cantidadTareasPendientes: number = 0;
  cantidadCompletados: number = 0;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.subscribe(({todos, filtro}) => {
      this.filtroActual = filtro;
      this.cantidadTareasPendientes = todos.filter(
        (todo) => !todo.completado
      ).length;
      this.cantidadCompletados = todos.filter(
        (todo) => todo.completado
      ).length;
    });
  }

  setFiltro(filtro: actionsFiltro.filtrosValidos) {
    this.store.dispatch(actionsFiltro.setFiltro({ filtro }));
  }

  limpiarCompletados() {
    if(this.cantidadCompletados === 0) {
      return;
    }
    this.store.dispatch(actionsTodo.borrarCompletados());
  }
}
