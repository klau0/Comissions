import { Component, Input, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MakeRequestDialogComponent } from '../make-request-dialog/make-request-dialog.component';

@Component({
  selector: 'app-artist-package',
  templateUrl: './artist-package.component.html',
  styleUrl: './artist-package.component.scss'
})
export class ArtistPackageComponent {
  @Input() name = '';
  @Input() price = 0;
  @Input() desc = '';
  readonly dialog = inject(MatDialog);

  openRequestDialog() {
    this.dialog.open(MakeRequestDialogComponent, {
      maxWidth: '80vw',
      minWidth: '30vw',
      backdropClass: 'grey-bg',
      autoFocus: 'dialog',
      data: { packageId: '10', packageTitle: this.name, packagePrice: this.price }
    });
  }
}
