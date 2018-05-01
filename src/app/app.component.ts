import { StorageService } from './storage.service';
import { Place } from './place';
import { Component, Injectable, ViewChild, ElementRef, AfterViewInit, Renderer2, HostListener } from '@angular/core';
import { MouseEvent, GoogleMapsAPIWrapper, MapTypeStyle, AgmMap, AgmInfoWindow } from '@agm/core';
import { ValueTransformer } from '@angular/compiler/src/util';

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

  // Coords for the position of Stockholm and helper variables
  private lat = 59.329324;
  private lng = 18.068581;
  private place_name: string;
  // Temp list for storing places from localstorage
  private places: Place[];

  /**
   * @param renderer
   * @param storage
   */
  constructor(private renderer: Renderer2, private storage: StorageService) {
    if (storage.getListItems() == null) {
      this.places = [];
    } else {
      this.places = storage.getListItems();
    }
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
    this.places.push({
      name: value,
      lat: this.lat,
      lng: this.lng,
    });
    this.storage.updateStorage(this.places);
    this.renderer.setProperty(this.placeInput.nativeElement, 'value', '');
    this.infoWindow.close();
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
  removePlace(place) {
    const i = this.places.indexOf(place);
    this.places.splice(i, 1);

    this.storage.updateStorage(this.places); // Update localstorage on removal of list item
  }

  /**
   * Save places on exit or reload of application
   * @param event
   */
  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    this.storage.updateStorage(this.places); // Update localstorage on exit
  }

}

