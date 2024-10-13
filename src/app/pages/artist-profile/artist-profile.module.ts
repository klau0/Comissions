import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistProfileRoutingModule } from './artist-profile-routing.module';
import { ArtistProfileComponent } from './artist-profile.component';


@NgModule({
  declarations: [
    ArtistProfileComponent
  ],
  imports: [
    CommonModule,
    ArtistProfileRoutingModule
  ]
})
export class ArtistProfileModule { }
