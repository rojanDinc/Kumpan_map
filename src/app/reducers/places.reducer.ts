import { Place } from './../models/place';
import { Action } from '@ngrx/store';
import * as PlacesActions from './../actions/places.actions';

const initialState: Place[] = [];

export function reducer(state: Place[] = initialState, action: PlacesActions.Actions) {
  switch (action.type) {
    case PlacesActions.ADD_PLACE:
      return [...state, action.payload];
    case PlacesActions.ADD_PLACES:
      return [...state, action.payload];
    case PlacesActions.GET_PLACES:
      return state;
    case PlacesActions.REMOVE_PLACE:
      state.splice(action.payload, 1);
      return state;
    default:
      return state;
  }
}
