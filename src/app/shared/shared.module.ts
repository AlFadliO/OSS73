import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from './material.module';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { OTPValidatorComponent } from './components/otp-validator/otp-validator.component';
import { UserService } from './services/user.service';
import { OTPService } from './services/one-time-password.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [OTPValidatorComponent, SpinnerComponent],
  imports     : [CoreModule, MaterialModule],
  providers   : [UserService, OTPService],
  exports     : [
    CoreModule,
    MaterialModule,
    HttpClientModule,
    SpinnerComponent,
    OTPValidatorComponent,
  ],
})
export class SharedModule {}
