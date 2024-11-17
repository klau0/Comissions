import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Web3jsService } from '../../../shared/services/web3js.service';
import { PackageDeleteDialogComponent } from '../package-delete-dialog/package-delete-dialog.component';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrl: './package.component.scss'
})
export class PackageComponent implements OnInit {
  @Input() id = -1;
  artistId = 0;
  title = '';
  price = 0;
  desc = '';
  newTitle = new FormControl('', Validators.required);
  newPrice = new FormControl(0, [Validators.required, Validators.min(0)]);
  newDesc = new FormControl('', Validators.required);
  @Input() editMode = false;
  @Output() newPackageDone: EventEmitter<number> = new EventEmitter();
  @Output() wentBack: EventEmitter<boolean> = new EventEmitter();
  @Output() packageDeleted: EventEmitter<number> = new EventEmitter();
  readonly dialog = inject(MatDialog);
  isMarkedDeleted = false;

  constructor(
    private snackBar: MatSnackBar,
    private web3jsService: Web3jsService
  ) {}

  ngOnInit(): void {
    this.artistId = Number(sessionStorage.getItem("uid"));
    if (this.id !== -1) {
      this.web3jsService.getPackageInfo(this.artistId, this.id).then((result) => {
        this.title = result[0];
        this.price = result[1];
        this.desc = result[2];
        this.isMarkedDeleted = result[3];
      });
    }
  }

  editPackage() {
    this.newTitle.setValue(this.title);
    this.newPrice.setValue(this.price);
    this.newDesc.setValue(this.desc);
    this.editMode = true;
  }

  updatePackage() {
    const newTitle = this.newTitle.value;
    const newPrice = this.newPrice.value;
    const newDesc = this.newDesc.value;

    if (this.newTitle.valid && newPrice !== null && this.newDesc.valid) {
      if (!this.newPrice.valid) {
        this.snackBar.open('Az ár nem lehet negatív szám!', '', { duration: 3000 });
        return;
      }
    
      if (this.id === -1) {
        // create new package
        this.web3jsService.addPackage(this.artistId, newTitle!, newPrice, newDesc!).then(() => {
          this.web3jsService.getPackagesLenght(this.artistId).then((length) => {
            this.newPackageDone.emit(length - 1);
          });
        });
      } else {
        // update an existing one
        this.web3jsService.updatePackage(this.artistId, this.id, newTitle!, newPrice, newDesc!);
        this.title = newTitle!;
        this.price = newPrice;
        this.desc = newDesc!;
      }
      this.editMode = false;
    } else {
      this.snackBar.open('Az összes mezőt ki kell tölteni!', '', { duration: 3000 });
    }
  }

  async deletePackage() {
    const amountOfRequests = await this.web3jsService.getPackageRequestedNumber(this.artistId, this.id);

    if (amountOfRequests === 0) {
      await this.web3jsService.deletePackage(this.artistId, this.id);
      this.packageDeleted.emit(this.id);
    } else {
      const dialogRef = this.dialog.open(PackageDeleteDialogComponent, {
        backdropClass: 'grey-bg',
        autoFocus : 'dialog',
        role: 'alertdialog'
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.web3jsService.markPackageAsDeleted(this.artistId, this.id);
          this.isMarkedDeleted = true;
        }
      });
    }
  }

  goBack() {
    this.editMode = false;
    this.wentBack.emit(true);
  }
}
