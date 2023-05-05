import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OTPValidation } from './guards/otp-validation.guard';

@NgModule({
  imports  : [FormsModule, CommonModule, ReactiveFormsModule],
  exports  : [FormsModule, CommonModule, ReactiveFormsModule],
  providers: [OTPValidation]
})
export class CoreModule {}
