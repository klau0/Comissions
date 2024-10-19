import { Component, Input, OnInit, numberAttribute  } from '@angular/core';

@Component({
  selector: 'app-artist-profile',
  templateUrl: './artist-profile.component.html',
  styleUrl: './artist-profile.component.scss'
})
export class ArtistProfileComponent implements OnInit {
  @Input({transform: numberAttribute}) artistId = 0;
  // TODO: kivenni majd
  pName = "Családi kép háziállattal";
  pPrice = 5000;
  pDesc ='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at consectetur odio. Ut tortor ante, pellentesque non convallis ut, vulputate nec metus. Aliquam erat volutpat. Praesent lobortis ligula sit amet ultricies pretium. Integer ac turpis pulvinar, volutpat tellus ornare, lobortis ipsum. Phasellus tincidunt enim id ante euismod pretium. Fusce tincidunt iaculis ultricies. Etiam sollicitudin, massa at viverra posuere, mi mauris cursus nibh, vitae molestie tortor erat in urna.'

  ngOnInit(): void {
    console.log(this.artistId);
  }
}
