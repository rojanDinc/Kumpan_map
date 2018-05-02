import { Place } from './../models/place';
import { Action } from '@ngrx/store';
import * as PlacesActions from './../actions/places.actions';

// Initial places for demo purpose
const initialState: Place[] = [
  {
    name: 'Anna',
    lat: 59,
    lng: 59
  },
  {
    name: 'Anders',
    lat: 59,
    lng: 59
  },
  {
    name: 'Bob',
    lat: 59,
    lng: 59
  },
  {
    name: 'Cecilia',
    lat: 59,
    lng: 59
  },
  {
    name: 'Karl',
    lat: 59,
    lng: 59
  },
];

export function reducer(state: Place[] = initialState, action: PlacesActions.Actions) {
  switch (action.type) {
    case PlacesActions.ADD_PLACE:
      return [...state, action.payload];
    case PlacesActions.REMOVE_PLACE:
      state.splice(action.payload, 1);
      return state;
    default:
      return state;
  }
}
