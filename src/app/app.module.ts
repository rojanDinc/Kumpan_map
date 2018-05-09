import { environment } from './../environments/environment';
// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule, GoogleMapsAPIWrapper, AgmMap } from '@agm/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StoreModule, ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// State handle
import { reducer } from './reducers/places.reducer';

// Components
import { AppComponent } from './app.component';

// Pipes
import { SearchPipe } from './pipes/search.pipe';
import { ReversePipe } from './pipes/reverse.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SearchPipe,
    ReversePipe,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR KEY HERE'
    }),
    StoreModule.forRoot({
      _places: reducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
