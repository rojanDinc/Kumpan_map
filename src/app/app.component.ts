import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;

  places: any = [
    "Stockholm",
    "Göterborg",
    "Malmö",
    "Helsingborg",
  ];

  _onMapClick(coords){
    console.log(coords);
  }

  removePlace(place){
    let i = this.places.indexOf(place);
    this.places.splice(i, 1);
  }
}
