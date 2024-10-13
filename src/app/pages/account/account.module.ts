import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { PackageComponent } from './package/package.component';
import { CommissionComponent } from './commission/commission.component';
import { RequesterComponent } from './requester/requester.component';
import { OrderComponent } from './order/order.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [
    AccountComponent,
    PackageComponent,
    CommissionComponent,
    RequesterComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MatTabsModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatExpansionModule
  ]
})
export class AccountModule { }
