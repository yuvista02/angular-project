import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlComponent } from './components/form-control/form-control.component';
import { TwoDigitDecimalNumberDirective } from './directives/twoDigitDecimalNumber';
import { CurrencyMaskService } from './directives/currency-mask.service';
import { CurrencyMaskDirective } from './directives/currency-mask.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderByPipe } from './pipes/order-by/order-by.pipe';
import { UserListPageComponent } from '../domain/user/user-list-page/user-list-page.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AngularIbanModule } from 'angular-iban';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  declarations: [
    FormControlComponent,
    TwoDigitDecimalNumberDirective,
    CurrencyMaskDirective,
    OrderByPipe,
    ConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    AngularIbanModule,
    Ng2OrderModule,
    MatButtonModule,
    CurrencyMaskModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    FormControlComponent,
    TwoDigitDecimalNumberDirective,
    CurrencyMaskDirective,
    OrderByPipe,
    ConfirmationDialogComponent,
    AngularIbanModule,
    Ng2OrderModule,
    MatButtonModule,
    CurrencyMaskModule,
  ],
  providers: [CurrencyMaskService],
  entryComponents: [MatDialogModule],
})
export class SharedModule {}
