import { Component, Injectable, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { MouseEvent, GoogleMapsAPIWrapper, MapTypeStyle, AgmMap, AgmInfoWindow } from '@agm/core';
import { ValueTransformer } from '@angular/compiler/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('map', {read: AgmMap}) map: AgmMap;
  @ViewChild('infoWindow', {read: AgmInfoWindow}) infoWindow: AgmInfoWindow;
  @ViewChild('placeInput') placeInput: ElementRef;
  lat = 59.329324;
  lng = 18.068581;

  places: Place[] = [
    {
      name: 'Rojans place',
      lat: 59.329324,
      lng: 18.068581,
    },
    {
      name: 'Bredäng',
      lat: 59.309002,
      lng: 17.930565,
    },
    {
      name: 'Fittja',
      lat: 59.247547,
      lng: 17.861372,
    }
  ];

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
  }

  _onMapClick($event: MouseEvent) {
    this.infoWindow.open();
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
  }

  onInputAdd(value) {
    this.places.push({
      name: value,
      lat: this.lat,
      lng: this.lng,
    });
    this.renderer.setProperty(this.placeInput.nativeElement, 'value', '');
    this.infoWindow.close();
  }

  goToPlace(place) {
    this.map.latitude = place.lat;
    this.map.longitude = place.lng;
    this.map.triggerResize();
  }

  removePlace(place) {
    const i = this.places.indexOf(place);
    this.places.splice(i, 1);
  }

}

// For type safety
interface Place {
  name: string;
  lat: number;
  lng: number;
}
