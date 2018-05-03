import { Place } from './../models/place';
import { Action } from '@ngrx/store';
import * as PlacesActions from './../actions/places.actions';

// Initial places for demo purpose
const initialState: Place[] = [
  {
    name: 'Anna',
    lat: 59.274438,
    lng: 17.901997
  },
  {
    name: 'Anders',
    lat: 59.255532,
    lng: 18.178067
  },
  {
    name: 'Bob',
    lat: 59.339783,
    lng: 17.939713
  },
  {
    name: 'Cecilia',
    lat: 59.359052,
    lng: 17.669494
  },
  {
    name: 'Karl',
    lat: 59.51961,
    lng: 17.92834
  },
];

// Reducer function
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
