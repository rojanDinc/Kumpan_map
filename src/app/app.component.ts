import { AppState } from './models/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Place } from './models/place';
import { Component, Injectable, ViewChild, ElementRef, AfterViewInit, Renderer2, HostListener, OnInit, OnDestroy } from '@angular/core';
import { MouseEvent, GoogleMapsAPIWrapper, MapTypeStyle, AgmMap, AgmInfoWindow } from '@agm/core';
import * as PlacesActions from './actions/places.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // Binding html elements to use in code
  @ViewChild('map', {read: AgmMap}) map: AgmMap;
  @ViewChild('infoWindow', {read: AgmInfoWindow}) infoWindow: AgmInfoWindow;
  @ViewChild('markerWindow') markerWindow: AgmInfoWindow;
  @ViewChild('placeInput') placeInput: ElementRef;

  // Coords for the position of Stockholm and helper variables
  private lat = 59.329324;
  private lng = 18.068581;
  private place_name: string;

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

  ngOnInit(): void {
    // this.store.dispatch(new PlacesActions.AddPlaces(this.storage.getListItems()));
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

    this.renderer.setProperty(this.placeInput.nativeElement, 'value', '');
    this.infoWindow.close();

    this.store.dispatch(new PlacesActions.AddPlace({
      name: value,
      lat: this.lat,
      lng: this.lng
    }));
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
  async removePlace(place) {
    const i = this.places.findIndex(place);
    i.subscribe((index: number) => this.store.dispatch(new PlacesActions.RemovePlace(index)));
  }

  /**
   * Save places on exit or reload of application
   * @param event
   */
  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    // this.storage.updateStorage(this.places);
  }

}

