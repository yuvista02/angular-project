import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlComponent } from './components/form-control/form-control.component';

@NgModule({
  declarations: [FormControlComponent],
  imports: [CommonModule],
  exports: [FormControlComponent],
})
export class SharedModule {}
