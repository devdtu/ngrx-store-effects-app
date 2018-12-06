import * as fromRouter from '@ngrx/router-store';
import {
  createFeatureSelector,
  createSelector,
  ActionReducerMap
} from '@ngrx/store';
import { Params } from '@angular/router';

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