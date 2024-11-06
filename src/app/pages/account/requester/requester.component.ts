import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommissionDoneDialogComponent } from '../commission-done-dialog/commission-done-dialog.component';

@Component({
  selector: 'app-requester',
  templateUrl: './requester.component.html',
  styleUrl: './requester.component.scss'
})
export class RequesterComponent {
  @Input() requestData: any = {};
  readonly dialog = inject(MatDialog);
  @Output() commissionCompleted: EventEmitter<number> = new EventEmitter();

  markCommissionAsDone() {
    const dialogRef = this.dialog.open(CommissionDoneDialogComponent, {
      backdropClass: 'grey-bg',
      autoFocus : 'dialog',
      data: {
        requestId: this.requestData['requestId'],
        packageId: this.requestData['packageId']
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.commissionCompleted.emit(this.requestData['requestId']);
      }
    });
  }
}
