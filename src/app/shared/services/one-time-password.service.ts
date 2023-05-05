import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, of, throwError } from 'rxjs';
import { Responce } from 'src/app/core/models/responce';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OTPService {
  private informationToVerify: string[] = [];

  constructor(private http: HttpClient) {}

  sendOTP(): Observable<boolean> {
    console.log('sending new OTP to user!');
    return of(true).pipe(delay(5000));
  }

  validateOTP(otpCode: string): Observable<Responce> {
    console.log('validating OTP of user!', otpCode);
    const header = {
      headers: { 'content-type': 'application/json' },
    };
    const body = { otp: otpCode };
    let obs: Observable<Responce> = this.http.post<Responce>(
      environment.server.concat('/otp/validate'),
      body,
      header
    );
    obs.pipe(catchError(this.handleError));
    return obs;
  }

  pushVerification(information: string) {
    this.informationToVerify.push(information);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
