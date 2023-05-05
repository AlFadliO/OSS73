import { AbstractControl, 
         FormControl,
         FormGroupDirective,
         NgForm,
         ValidationErrors,
         ValidatorFn} from '@angular/forms'
import { ErrorStateMatcher } from '@angular/material/core';

/**
 * Helper Class containing custom form validator functions.
 */
export class InputValidators{

    /**
     * Validate if two controls have the same value.
     * 
     * @param source: AbstractControl
     * @param target: AbstractControl
     * @returns null if no errors or an object '{ mismatch: true }' in case of error.
     */
    static matchValidator(source : string, target : string) : ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const sourceCtrl = control.get(source);
            const targetCtrl = control.get(target);
            //
            return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value ? { mismatch: true } : null;
        }
    }
}

/**
 * Material error state matcher when control or parent are invalid and control is dirty, touched, or submitted.
 * Used in conjustion with custom validator functions.
 */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && (control.invalid || control.parent?.invalid ) && (control.dirty || control.touched || isSubmitted));
    }
}