import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommissionDoneDialogComponent } from '../commission-done-dialog/commission-done-dialog.component';

@Component({
  selector: 'app-requester',
  templateUrl: './requester.component.html',
  styleUrl: './requester.component.scss'
})
export class RequesterComponent {
  readonly dialog = inject(MatDialog);

  markCommissionAsDone() {
    this.dialog.open(CommissionDoneDialogComponent, {
      backdropClass: 'grey-bg',
      autoFocus : 'dialog',
      data: { name: 'Kis Antal' }
    });
  }
}
