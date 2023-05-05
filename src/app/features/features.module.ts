import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RoutingModule } from './routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';



@NgModule({
  declarations: [ SignUpComponent ],
  imports     : [
    SharedModule,
    RoutingModule
  ],
  exports : [SignUpComponent]
})
export class FeaturesModule { }
