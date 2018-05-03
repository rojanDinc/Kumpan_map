// Interface for application state object used by ngrx
import { Place } from './place';
export interface AppState {
  readonly _places: Place;
}
