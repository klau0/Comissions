import { Component, Input, OnInit, numberAttribute  } from '@angular/core';

@Component({
  selector: 'app-artist-profile',
  templateUrl: './artist-profile.component.html',
  styleUrl: './artist-profile.component.scss'
})
export class ArtistProfileComponent implements OnInit {
  @Input({transform: numberAttribute}) artistId = 0;

  ngOnInit(): void {
    console.log(this.artistId);
  }
}
