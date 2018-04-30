import { Component, Injectable, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MouseEvent, GoogleMapsAPIWrapper, MapTypeStyle } from '@agm/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('map', {read: ElementRef}) map: ElementRef;

  title = 'My first AGM project';
  lat = 59.329324;
  lng = 18.068581;

  places: Place[] = [
    {
      name: 'Rojans place',
      address: 'Duvgatan 21',
      lat: 51.678418,
      lng: 7.809007,
    },
    {
      name: 'Bredäng',
      address: '',
      lat: 59.309002,
      lng: 17.930565,
    },
    {
      name: 'Fittja',
      address: '',
      lat: 59.247547,
      lng: 17.861372,
    }
  ];

  constructor() {
  }

  ngAfterViewInit() {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
  }

  _onMapClick($event: MouseEvent) {
    this.places.push({
      name: 'some',
      address: 'add',
      lat: $event.coords.lat,
      lng: $event.coords.lng
    });
  }

  removePlace(place) {
    const i = this.places.indexOf(place);
    this.places.splice(i, 1);
  }
}

// For type safety
interface Place {
  name: string;
  address: string;
  lat: number;
  lng: number;
}
