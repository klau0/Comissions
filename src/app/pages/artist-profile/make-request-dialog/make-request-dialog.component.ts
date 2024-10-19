import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-make-request-dialog',
  templateUrl: './make-request-dialog.component.html',
  styleUrl: './make-request-dialog.component.scss'
})
export class MakeRequestDialogComponent {
  request = new FormControl('', Validators.required);

  constructor (
    public dialogRef: MatDialogRef<MakeRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { packageId: string, packageTitle: string, packagePrice: string },
    private snackBar: MatSnackBar
  ) {}

  buyPackage() {
    if (this.request.valid) {

    } else {
      this.snackBar.open('Kérem adjon leírást a kéréshez!', '', { duration: 3000 });
    }
  }

  goBack() {
    this.dialogRef.close();
  }
}
