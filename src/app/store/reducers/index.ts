import * as fromRouter from '@ngrx/router-store';
import {
  createFeatureSelector,
  createSelector,
  ActionReducerMap
} from '@ngrx/store';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Params
} from '@angular/router';

// this defines what the router state will look like
export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

//routerReducer - this is a keyword

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer // THIS IS BASICALLY ROUTERREDUCER THAT WE HAVE DEFINED ABOVE
};

export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('routerReducer');

// the above statement means  - we are telling createFeatureSelector that you can access
// this property - "fromRouter.RouterReducerState<RouterStateUrl>" on 'routerReducer'

export class CustomSerializer
  implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  // ****************
  // If something changes in the url THIS WHOLE FUNCTIONS WILL BE CALLED
  // ***********

  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState; // const url = routerState.url
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      // this is the state tree of angular router
      // state.firstChild means we have child routes -- /product/1 in url
      state = state.firstChild;
    }
    const { params } = state;
    return { url, queryParams, params }; // this returned object is What will bound to ngrx store state tree
  }
}
