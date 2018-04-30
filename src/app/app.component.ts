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
  @ViewChild('map', {read: AgmMap}) map: AgmMap;
  @ViewChild('infoWindow', {read: AgmInfoWindow}) infoWindow: AgmInfoWindow;
  @ViewChild('placeInput') placeInput: ElementRef;

  private lat = 59.329324;
  private lng = 18.068581;
  private places: Place[];
  
  // Renderer for direct DOM manipulation
  constructor(private renderer: Renderer2, private storage: StorageService) {
    if (storage.getListItems() == null) {
      this.places = [];
    } else {
      this.places = storage.getListItems();
    }
  }

  // On click event for map component and opens a input marker
  _onMapClick($event: MouseEvent) {
    this.infoWindow.open();
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
  }

  // Add new place in list
  onInputAdd(value) {
    this.places.push({
      name: value,
      lat: this.lat,
      lng: this.lng,
    });
    this.renderer.setProperty(this.placeInput.nativeElement, 'value', '');
    this.infoWindow.close();
  }

  // Centers map to desired position
  goToPlace(place) {
    this.map.latitude = place.lat;
    this.map.longitude = place.lng;
    this.map.triggerResize();
  }

  // Remove a place from list
  removePlace(place) {
    const i = this.places.indexOf(place);
    this.places.splice(i, 1);
  }

  // Save places on exit or reload
  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    this.storage.addListItem(this.places);
  }

}

