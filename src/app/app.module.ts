import { environment } from './../environments/environment';
// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule, GoogleMapsAPIWrapper, AgmMap } from '@agm/core';
import { PersistenceModule } from 'angular-persistence';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// State handle


// Components
import { AppComponent } from './app.component';
import { SearchPipe } from './pipes/search.pipe';
import { reducer } from './reducers/places.reducer';



@NgModule({
  declarations: [
    AppComponent,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDzUfBbEi4kaUSaOkTlWnDLYA7bJ6rVtBU'
    }),
    PersistenceModule,
    StoreModule.forRoot({
      _places: reducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    })

  ],
  providers: [GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
})
export class AppModule {
}
