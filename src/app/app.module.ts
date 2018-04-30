// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule, GoogleMapsAPIWrapper, AgmMap } from '@agm/core';
import { PersistenceModule } from 'angular-persistence';

// Services
import { StorageService } from './storage.service';

// Components
import { AppComponent } from './app.component';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDzUfBbEi4kaUSaOkTlWnDLYA7bJ6rVtBU'
    }),
    PersistenceModule,
  ],
  providers: [GoogleMapsAPIWrapper, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
