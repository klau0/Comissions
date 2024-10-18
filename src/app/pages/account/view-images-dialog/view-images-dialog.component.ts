import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-images-dialog',
  templateUrl: './view-images-dialog.component.html',
  styleUrl: './view-images-dialog.component.scss'
})
export class ViewImagesDialogComponent {

  constructor (
    public dialogRef: MatDialogRef<ViewImagesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { images: string[] }
  ) {}

  goBack() {
    this.dialogRef.close();
  }
}
