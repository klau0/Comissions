import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrl: './package.component.scss'
})
export class PackageComponent {
  @Input() name = '';
  @Input() price = 0;
  @Input() desc = '';
  newName = new FormControl('', Validators.required);
  newPrice = new FormControl(0, [Validators.required, Validators.min(0)]);
  newDesc = new FormControl('', Validators.required);
  @Input() editMode = false;
  @Output() newPackageDone: EventEmitter<boolean> = new EventEmitter();

  constructor(private snackBar: MatSnackBar) {}

  editPackage() {
    this.newName.setValue(this.name);
    this.newPrice.setValue(this.price);
    this.newDesc.setValue(this.desc);
    this.editMode = true;
  }

  updatePackage() {
    const newName = this.newName.value;
    const newPrice = this.newPrice.value;
    const newDesc = this.newDesc.value;

    if (newName?.trim() && newPrice !== null && newDesc?.trim()) {
      if (!this.newPrice.valid) {
        this.snackBar.open('Az ár nem lehet negatív szám!', '', { duration: 3000 });
        return;
      }
      this.editMode = false;
      this.newPackageDone.emit(true);
    } else {
      this.snackBar.open('Az összes mezőt ki kell tölteni!', '', { duration: 3000 });
    }
  }

  deletePackage() {
    
  }

  goBack() {
    this.editMode = false;
    this.newPackageDone.emit(true);
  }
}
