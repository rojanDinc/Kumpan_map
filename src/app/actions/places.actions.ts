import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Place } from './../models/place';


export const ADD_PLACE = 'ADD_PLACE';
export const ADD_PLACES = 'ADD_PLACES';
export const REMOVE_PLACE = 'REMOVE_PLACE';
export const GET_PLACES = 'GET_PLACES';

export class AddPlace implements Action {
  readonly type = ADD_PLACE;

  constructor(public payload: Place) {}
}

export class AddPlaces implements Action {
  readonly type = ADD_PLACES;

  constructor(public payload: Place[]) {}
}

export class RemovePlace implements Action {
  readonly type = REMOVE_PLACE;

  constructor(public payload: number) {}
}

export class GetPlaces implements Action {
  readonly type = GET_PLACES;

  constructor() {}
}

export type Actions = AddPlace | AddPlaces | RemovePlace | GetPlaces;
