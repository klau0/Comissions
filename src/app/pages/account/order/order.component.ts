import { Component, Input, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewImagesDialogComponent } from '../view-images-dialog/view-images-dialog.component';
import { Web3jsService } from '../../../shared/services/web3js.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  readonly dialog = inject(MatDialog);
  @Input() order: any = {};

  constructor(private web3jsService: Web3jsService) {}

  openImageViewDialog() {
    const userId = Number(sessionStorage.getItem("uid"));
    const isArtist = Boolean(sessionStorage.getItem("isArtist"));

    this.web3jsService.getRequestedImages(userId, this.order['id'], isArtist).then((result) => {
      this.dialog.open(ViewImagesDialogComponent, {
        maxWidth: '80vw',
        backdropClass: 'grey-bg',
        autoFocus: 'dialog',
        data: { images: result }
      });
    });
  }
}
