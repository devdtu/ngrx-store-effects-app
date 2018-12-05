import { ActionReducerMap } from '@ngrx/store';
import * as fromPizzas from './pizzas.reducer';

export interface ProductState {
    pizzas: fromPizzas.PizzaState
}

//register our reducers
// state is managed by a reducer 
export const reducers: ActionReducerMap<ProductState> = {
    pizzas: fromPizzas.reducer
}