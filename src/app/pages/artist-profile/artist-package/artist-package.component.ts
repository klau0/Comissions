import { Component, Input, inject, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MakeRequestDialogComponent } from '../make-request-dialog/make-request-dialog.component';
import { Web3jsService } from '../../../shared/services/web3js.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  isNotAvailable = false;
  @Output() packageDeleted: EventEmitter<number> = new EventEmitter();

  constructor(
    private web3jsService: Web3jsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.web3jsService.getPackageInfo(this.artistId, this.id).then((result) => {
      this.title = result[0];
      this.price = result[1];
      this.desc = result[2];
      this.isNotAvailable = result[3];
    });
  }

  openRequestDialog() {
    this.checkIfPackageIsStillAvailable().then((isAvailable) => {
      if (isAvailable) {
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
      } else {
        this.snackBar.open('A csomagot nemrég törölték, már nem lehet megrendelni', '', { duration: 3000 });
      }
    });
  }

  async checkIfPackageIsStillAvailable(): Promise<boolean> {
    const isDeleted = await this.web3jsService.isPackageDeleted(this.artistId, this.id);
    if (isDeleted) {
      this.packageDeleted.emit(this.id);
      return false;
    }

    const isMarkedDeleted = await this.web3jsService.isPackageMarkedAsDeleted(this.artistId, this.id);
    if (isMarkedDeleted) {
      this.isNotAvailable = true;
      return false;
    }

    return true;
  }
}
