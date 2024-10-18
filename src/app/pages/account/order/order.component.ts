import { Component, Input, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewImagesDialogComponent } from '../view-images-dialog/view-images-dialog.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  @Input() isDone = false;
  readonly dialog = inject(MatDialog);

  openImageViewDialog() {
    this.dialog.open(ViewImagesDialogComponent, {
      maxWidth: '80vw',
      backdropClass: 'grey-bg',
      autoFocus: 'dialog',
      data: { images: ['../../../assets/fall.jpg'] }
    });
  }
}
