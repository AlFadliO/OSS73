import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { UserService } from "src/app/shared/services/user.service";

@Injectable({
    providedIn: 'root'
  })
export class OTPValidation implements CanActivate {
  constructor(private userService: UserService, private router : Router) {}

  canActivate(): Promise<boolean>| boolean {
    if (!this.userService.shouldValidateEmail) {
        return this.router.navigate([""]);
    } 
    return true;
  }
}