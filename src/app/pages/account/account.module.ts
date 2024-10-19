import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { PackageComponent } from './package/package.component';
import { CommissionComponent } from './commission/commission.component';
import { RequesterComponent } from './requester/requester.component';
import { OrderComponent } from './order/order.component';
import { CommissionDoneDialogComponent } from './commission-done-dialog/commission-done-dialog.component';
import { ViewImagesDialogComponent } from './view-images-dialog/view-images-dialog.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AccountComponent,
    PackageComponent,
    CommissionComponent,
    RequesterComponent,
    OrderComponent,
    CommissionDoneDialogComponent,
    ViewImagesDialogComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatDialogModule
  ]
})
export class AccountModule { }
