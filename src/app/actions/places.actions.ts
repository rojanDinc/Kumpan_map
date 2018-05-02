import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Place } from './../models/place';


export const ADD_PLACE = 'ADD_PLACE';
export const REMOVE_PLACE = 'REMOVE_PLACE';

export class AddPlace implements Action {
  readonly type = ADD_PLACE;

  constructor(public payload: Place) {}
}

export class RemovePlace implements Action {
  readonly type = REMOVE_PLACE;

  constructor(public payload: number) {}
}


export type Actions = AddPlace | RemovePlace;
