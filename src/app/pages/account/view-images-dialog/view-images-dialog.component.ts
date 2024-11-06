import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Web3storageService } from '../../../shared/services/web3storage.service';

@Component({
  selector: 'app-view-images-dialog',
  templateUrl: './view-images-dialog.component.html',
  styleUrl: './view-images-dialog.component.scss'
})
export class ViewImagesDialogComponent implements OnInit {
  imageUrls: string[] = [];

  constructor (
    public dialogRef: MatDialogRef<ViewImagesDialogComponent>,
    private web3storageService: Web3storageService,
    @Inject(MAT_DIALOG_DATA) public data: { images: string[] }
  ) {}
  
  ngOnInit(): void {
    for (const image of this.data.images) {
      const parsedCid = this.web3storageService.parseCID(image);
      this.imageUrls.push(`https://${parsedCid}.ipfs.w3s.link`);
    }
  }

  goBack() {
    this.dialogRef.close();
  }
}
