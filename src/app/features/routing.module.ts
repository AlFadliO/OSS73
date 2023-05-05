import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { SignUpComponent } from 'src/app/features/sign-up/sign-up.component';
import { OTPValidation } from '../core/guards/otp-validation.guard';
import { OTPValidatorComponent } from '../shared/components/otp-validator/otp-validator.component';

const routes : Routes = [
  { path: 'new-user'         , component: SignUpComponent },
  { path: 'otp-validation'   , component: OTPValidatorComponent },
  { path: ''                 , redirectTo: '/new-user', pathMatch: 'full' }
];

@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})
export class RoutingModule { }
