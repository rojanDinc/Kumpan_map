import { AppState } from './models/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Place } from './models/place';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Component, Injectable, ViewChild, ElementRef, AfterViewInit, Renderer2, HostListener, OnInit, OnDestroy } from '@angular/core';

import {ErrorStateMatcher} from '@angular/material/core';
import { MouseEvent, GoogleMapsAPIWrapper, MapTypeStyle, AgmMap, AgmInfoWindow } from '@agm/core';
import * as PlacesActions from './actions/places.actions';
import { MatGridTile } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // Binding html elements to use in code
  @ViewChild('map', {read: AgmMap}) map: AgmMap;
  @ViewChild('infoWindow', {read: AgmInfoWindow}) infoWindow: AgmInfoWindow;
  @ViewChild('markerWindow') markerWindow: AgmInfoWindow;
  @ViewChild('placeInput') placeInput: ElementRef;
  @ViewChild('listGridTile') listGridTile: MatGridTile;
  @ViewChild('mapGridTile') mapGridTile: MatGridTile;

  // Coords for the position of Stockholm and helper variables
  private lat = 59.329324;
  private lng = 18.068581;
  // Form Validation
  private place_name: string;
  private matcher = new MyErrorStateMatcher();
  placeFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$'),
  ]);
  // Temp list for storing places from localstorage
  places: Observable<Place>;
  /**
   * @param renderer
   * @param storage
   */
  constructor(
    private renderer: Renderer2,
    private store: Store<AppState>
  ) {
    this.places = store.select('_places');
  }
  /**
   * On click event for map component and opens a small input window
   * @param $event
   */
  _onMapClick($event: MouseEvent) {
    this.infoWindow.open();
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
  }

  /**
   * Add new place in list and update localstorage
   * @param value
   */
  onInputAdd(value) {
    if (!this.placeFormControl.hasError('pattern') && !this.placeFormControl.hasError('required')) {
      this.renderer.setProperty(this.placeInput.nativeElement, 'value', '');
      this.infoWindow.close();

      this.store.dispatch(new PlacesActions.AddPlace({
        name: value,
        lat: this.lat,
        lng: this.lng
      }));
    }
  }

  /**
   * Centers map to desired position and shows marker
   * @param place Object
   */
  goToPlace(place) {
    this.map.latitude = place.lat;
    this.map.longitude = place.lng;
    this.map.triggerResize();
    this.lat = place.lat;
    this.lng = place.lng;
    this.place_name = place.name;

    this.markerWindow.open();
  }

  /**
   * Remove a place from list
   * @param place Object
   */
  removePlace(i) {
    this.markerWindow.close();
    this.store.dispatch(new PlacesActions.RemovePlace(i));
  }

}
