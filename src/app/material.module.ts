/**
 * UI module
 * Handles all modules from "angular-material" plugin
 */
import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule,
  MatGridListModule,
  MatListModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatGridListModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatGridListModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class MaterialModule {}
