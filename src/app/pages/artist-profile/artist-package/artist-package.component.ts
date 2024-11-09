import { Component, Input, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MakeRequestDialogComponent } from '../make-request-dialog/make-request-dialog.component';
import { Web3jsService } from '../../../shared/services/web3js.service';

@Component({
  selector: 'app-artist-package',
  templateUrl: './artist-package.component.html',
  styleUrl: './artist-package.component.scss'
})
export class ArtistPackageComponent implements OnInit {
  @Input() artistId = 0;
  @Input() id = 0;
  title = '';
  price = 0;
  desc = '';
  readonly dialog = inject(MatDialog);

  constructor(
    private web3jsService: Web3jsService
  ) {}

  ngOnInit(): void {
    console.log(this.artistId);

    this.web3jsService.getPackageInfo(this.artistId, this.id).then((result) => {
      this.title = result[0];
      this.price = result[1];
      this.desc = result[2];
    });
  }

  openRequestDialog() {
    this.dialog.open(MakeRequestDialogComponent, {
      maxWidth: '80vw',
      minWidth: '30vw',
      backdropClass: 'grey-bg',
      autoFocus: 'dialog',
      data: {
        packageId: this.id,
        packageTitle: this.title,
        packagePrice: this.price,
        artistId: this.artistId
      }
    });
  }
}
