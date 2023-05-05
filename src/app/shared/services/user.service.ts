import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError} from 'rxjs';
import { Responce } from 'src/app/core/models/responce';
import { environment } from 'src/environments/environment';
import { User       } from '../../core/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private CurrentUser: User | undefined;
  //
  constructor(private http: HttpClient) {}
  //
  saveUser(user: User): Observable<Responce> {
    const header = {
      headers: { 'content-type': 'application/json' },
    };
    const body = { user: user };
    const obs: Observable<Responce> = this.http.post<Responce>(
      environment.server.concat("/user"),
      body,
      header
    );
    obs.pipe(
      catchError(this.handleError));
    return obs;
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
