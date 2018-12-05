import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/Observable/of';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as pizzaActions from '../actions/pizzas.action';
import * as fromServices from '../../services';
// effects is a class which contains a few properties which happens to be an observable
@Injectable()
export class PizzasEffects {
  constructor(
    private actions$: Actions,
    private pizzaService: fromServices.PizzasService
  ) {}

  // we are bascally listening to load_pizzas event 
  @Effect() // an effect always dispatch an action
  loadPizzas$ = this.actions$.ofType(pizzaActions.LOAD_PIZZAS).pipe(
    // switchmap because we want return a brand new observable using
    // which we can do things like mapover and return new action
    switchMap(() => {
      return this.pizzaService
        .getPizzas()
        .pipe(
          map(
            pizzas => new pizzaActions.LoadPizzasSuccess(pizzas),
            catchError(error => of(new pizzaActions.LoadPizzasFail(error)))
          )
        );
    })
  );
}
