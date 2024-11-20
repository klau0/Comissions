import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Web3jsService } from '../../../shared/services/web3js.service';
import { Web3storageService } from '../../../shared/services/web3storage.service';

@Component({
  selector: 'app-commission-done-dialog',
  templateUrl: './commission-done-dialog.component.html',
  styleUrl: './commission-done-dialog.component.scss'
})
export class CommissionDoneDialogComponent {
  requestedImages: File[] = [];
  loading = false;

  constructor (
    public dialogRef: MatDialogRef<CommissionDoneDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      requestId: number, packageId: number
    },
    private snackBar: MatSnackBar,
    private web3jsService: Web3jsService,
    private web3storageService: Web3storageService
  ) {}

  onFilesSelected(event: any) {
    for (let file of event.target.files) {
      this.requestedImages.push(file);
    }
  }

  sendImagesToRequester() {
    if (this.requestedImages.length) {
      this.loading = true;
      const artistId = Number(sessionStorage.getItem("uid"));
      this.web3storageService.uploadFiles(this.requestedImages).then((serializedFiles) => {
        this.web3jsService.completeRequest(artistId, this.data.packageId, this.data.requestId, serializedFiles).then(() => {
          this.loading = false;
          this.dialogRef.close(true);

          this.web3jsService.getPackageRequestedNumber(artistId, this.data.packageId).then((amountOfRequests) => {
            // if there are no more requests on the package
            if (amountOfRequests === 0) {
              this.web3jsService.isPackageMarkedAsDeleted(artistId, this.data.packageId).then((isMarkedDeleted) => {
                // if it was marked deleted, we can actually delete it now
                if (isMarkedDeleted) {
                  this.web3jsService.deletePackage(artistId, this.data.packageId);
                } else {
                  this.web3jsService.resetPackageRequestNumber(artistId, this.data.packageId);
                }
              });
            }
          });
        });
      });
    } else {
      this.snackBar.open('Legalább 1 képet válasszon ki!', '', { duration: 3000 });
    }
  }
  
  goBack() {
    this.dialogRef.close(false);
    this.requestedImages = [];
  }
}
