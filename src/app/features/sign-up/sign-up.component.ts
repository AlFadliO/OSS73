import { Component }           from '@angular/core';
import { FormControl,
         FormGroup,
         Validators }           from '@angular/forms';
import { InputValidators,
         MyErrorStateMatcher }  from 'src/app/shared/utils/match-validator';
import { Router }               from '@angular/router';
import { User }                 from 'src/app/core/models/user';
import { UserService }          from 'src/app/shared/services/user.service';
import { Responce } from 'src/app/core/models/responce';
import { State } from 'src/app/core/constants/state';

@Component({
  selector   : 'btf-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls  : ['./sign-up.component.css']
})
export class SignUpComponent {
  hide     = true;
  matcher  = new MyErrorStateMatcher();
  userForm = new FormGroup({
    email        : new FormControl('', [Validators.required, Validators.email]),
    organization : new FormControl('', [Validators.required]),
    passwordGroup: new FormGroup({
      password       : new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    }, [
      InputValidators.matchValidator("password","confirmPassword")
    ])
  });
  
  constructor(private router : Router, private userService : UserService) { }

  onSubmit(){
    if(this.userForm.valid){
      let user: User = new User(
        this.userForm.controls.email.value!,
        this.userForm.controls.organization.value!,
        this.userForm.controls.passwordGroup.controls.password.value!
      );
      this.userService.saveUser(user).subscribe(data => {
        console.log(data);
      if(data.state === State.WAITING_VALIDATION)
        this.userService.pushUser(user);
        this.router.navigateByUrl('otp-validation');  
      });
    }
    // call user service
  }

  get emailPatternError() {
    return this.userForm.getError('email','email');
  }

  get emailRequiredError() {
    return this.userForm.getError('required', 'email');
  }

  get organizationRequiredError() {
    return this.userForm.getError('required', 'organization');
  }

  get passwordRequiredError() {
    return this.userForm.getError('required','passwordGroup.password');
  }

  get confirmationRequiredError() {
    return this.userForm.getError('required','passwordGroup.confirmPassword');
  }

  get passwordMatchError() {
    return this.userForm.get('passwordGroup')?.getError('mismatch');
  }

  get submitState() {
    return this.userForm.valid;
  }
}