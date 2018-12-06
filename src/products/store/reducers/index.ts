import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromPizzas from './pizzas.reducer';
import * as fromToppings from './toppings.reducer';

export interface ProductsState {
  pizzas: fromPizzas.PizzaState;
  toppings: fromToppings.ToppingsState;
}

//register our reducers
// state is managed by a reducer
export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzas.reducer,
  toppings: fromToppings.reducer
};

export const getProductsState = createFeatureSelector<ProductsState>(
  'products'
); //
// this means everything will be nuder 'products'
