import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistProfileRoutingModule } from './artist-profile-routing.module';
import { ArtistProfileComponent } from './artist-profile.component';
import { ArtistPackageComponent } from './artist-package/artist-package.component';
import { MakeRequestDialogComponent } from './make-request-dialog/make-request-dialog.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    ArtistProfileComponent,
    ArtistPackageComponent,
    MakeRequestDialogComponent
  ],
  imports: [
    CommonModule,
    ArtistProfileRoutingModule,
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class ArtistProfileModule { }
