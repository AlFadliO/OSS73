import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { State } from 'src/app/core/constants/state';
import { OTPService } from 'src/app/shared/services/one-time-password.service';
import { NamedColor } from 'src/app/shared/utils/css-named-color';

interface Options {
  title         : string;
  otpSize       : number;
  otpPattern    : RegExp;
  otpCharWidthPx: number;
  type          : 'phone' | 'email';
}

@Component({
  selector: 'app-otp-validator',
  templateUrl: './otp-validator.component.html',
  styleUrls: ['./otp-validator.component.css'],
})
export class OTPValidatorComponent implements OnInit {
  private _otpOptions: Options = {
    type: 'email',
    title: 'One time password validation',
    otpSize: 8,
    otpPattern: /[^a-zA-Z0-9]*/g,
    otpCharWidthPx: 30,
  };
  //
  otp: string = '';
  waiting: boolean = false;
  isErrorState: boolean = false;
  spinnerColor: NamedColor = NamedColor.wingorange;
  dynamicWidth: number =this._otpOptions.otpSize * this._otpOptions.otpCharWidthPx;

  constructor(private otpService: OTPService, private router: Router) {}

  ngOnInit(): void {
    this.dynamicWidth = this._otpOptions.otpSize * this._otpOptions.otpCharWidthPx;
  }
  //
  @Input()
  set otpOptions(o: Options) {
    this._otpOptions = o;
  }

  get isConfirmationAllowed(): boolean {
    return this.otp.length === this._otpOptions.otpSize && !this.isErrorState;
  }

  get title(): string {
    return this._otpOptions.title;
  }

  get otpSize(): number {
    return this._otpOptions.otpSize;
  }

  onCodeInput(event: Event) {
    let element = event.target as HTMLInputElement;
    element.value = element.value
      .toUpperCase()
      .replace(this._otpOptions.otpPattern, '');
    this.otp = element.value;
    this.isErrorState = false;
  }

  sendOTP() {
    this.waiting = true;
    this.otpService.sendOTP().subscribe((result) => {
      this.otp = '';
      this.isErrorState = false;
      this.waiting = false;
    });
  }

  validateOTP() {
    this.waiting = true;
    this.otpService.validateOTP(this.otp).subscribe(data => {
      console.log(data);
      this.waiting = false;
      if (data.state === State.SUCCESS) {
        this.router.navigate(['']);
      } else {
        this.isErrorState = true;
      }
    });
  }
}
