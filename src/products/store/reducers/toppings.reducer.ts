import * as fromToppings from '../actions/toppings.action';
import { Topping } from '../../models/topping.model';
import { Action } from 'rxjs/scheduler/Action';

export interface ToppingsState {
  entities: { [id: number]: Topping };
  loaded: boolean;
  loading: boolean;
  selectedToppings: number[]
}

export const intitialState: ToppingsState = {
  entities: {},
  loaded: false,
  loading: false,
  selectedToppings: []
};

export function reducer(
  state = intitialState,
  action: fromToppings.ToppingsAction
): ToppingsState {
  switch (action.type) {

    case fromToppings.VISUALISE_TOPPINGS: {
      const selectedToppings = action.payload;
      return {
        ...state,
        selectedToppings
      }
    }

    case fromToppings.LOAD_TOPPINGS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromToppings.LOAD_TOPPINGS_SUCCESS: {
      const toppings = action.payload;
      const entities = toppings.reduce(
        (entities: { [id: number]: Topping }, topping: Topping) => {
          return {
            ...entities,
            [topping.id]: topping
          };
        },
        {
          ...state.entities
        }
      );

      return {
        ...state,
        loaded: true,
        loading: false,
        entities
      };
    }

    case fromToppings.LOAD_TOPPINGS_SUCCESS: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
  }
  return state;
}


export const getToppingEntities = (state: ToppingsState) => state.entities;
export const getToppingsLoaded = (state: ToppingsState) => state.loaded;
export const getToppingsLoading = (state: ToppingsState) => state.loading;
export const getSelectedToppings = (state: ToppingsState) => state.selectedToppings;