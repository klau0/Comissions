import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-commission-done-dialog',
  templateUrl: './commission-done-dialog.component.html',
  styleUrl: './commission-done-dialog.component.scss'
})
export class CommissionDoneDialogComponent {
  requestedImages: File[] = [];

  constructor (
    public dialogRef: MatDialogRef<CommissionDoneDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) {}

  onFilesSelected(event: any) {
    for (let file of event.target.files) {
      this.requestedImages.push(file);
    }
  }

  sendImagesToRequester() {
    // todo: - küldés megvalósítása
    //       - requests mappingből törölni az adott requestet ?? (kell a megrendelések lekéréséhez is)
    //console.log(this.data.name);
  }
  
  goBack() {
    this.dialogRef.close();
    this.requestedImages = [];
  }

}
