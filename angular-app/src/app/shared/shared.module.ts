import { NgModule }                           from '@angular/core';
import { CommonModule }                       from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { MatDialogModule }                    from '@angular/material/dialog';
import { AngularIbanModule }                  from 'angular-iban';
import { Ng2OrderModule }                     from 'ng2-order-pipe';
import { MatButtonModule }                    from '@angular/material/button';
import { CurrencyMaskModule }                 from 'ng2-currency-mask';
import { BrowserAnimationsModule }            from '@angular/platform-browser/animations';
import { BrowserModule }                      from '@angular/platform-browser';

import { TwoDigitDecimalNumberDirective }     from 'src/app/shared/directives/twoDigitDecimalNumber';
import { CurrencyMaskDirective }              from 'src/app/shared/directives/currency-mask.directive';
import { CurrencyMaskService }                from 'src/app/shared/services/currency-mask.service';

import { OrderByPipe }                        from 'src/app/shared/pipes/order-by/order-by.pipe';

import { ConfirmationDialogComponent }        from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { FormControlComponent }               from 'src/app/shared/components/form-control/form-control.component';

@NgModule({
  declarations: [
    TwoDigitDecimalNumberDirective,
    CurrencyMaskDirective,

    OrderByPipe,

    FormControlComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
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
    AngularIbanModule,
    Ng2OrderModule,
    MatButtonModule,
    CurrencyMaskModule,

    TwoDigitDecimalNumberDirective,
    CurrencyMaskDirective,

    OrderByPipe,

    FormControlComponent,
    ConfirmationDialogComponent,
  ],
  providers: [CurrencyMaskService],
  entryComponents: [MatDialogModule],
})
export class SharedModule {}
