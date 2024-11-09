import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Web3jsService } from '../../../shared/services/web3js.service';

@Component({
  selector: 'app-make-request-dialog',
  templateUrl: './make-request-dialog.component.html',
  styleUrl: './make-request-dialog.component.scss'
})
export class MakeRequestDialogComponent {
  request = new FormControl('', Validators.required);

  constructor (
    public dialogRef: MatDialogRef<MakeRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      packageId: number,
      packageTitle: string,
      packagePrice: number,
      artistId: number
    },
    private snackBar: MatSnackBar,
    private web3jsService: Web3jsService
  ) {}

  buyPackage() {
    if (this.request.valid) {
      const userId = Number(sessionStorage.getItem("uid"));
      const isArtist = sessionStorage.getItem("isArtist") === "1";

      this.web3jsService.requestPackage(userId, this.data.artistId, this.data.packageId, this.request.value!, isArtist).then(() => {
        this.snackBar.open('Sikeres vásárlás!', '', { duration: 3000 });
        this.dialogRef.close();
      });
    } else {
      this.snackBar.open('Kérem adjon leírást a kéréshez!', '', { duration: 3000 });
    }
  }

  goBack() {
    this.dialogRef.close();
  }
}
