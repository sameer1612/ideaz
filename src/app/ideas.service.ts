import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Idea } from './home/home.component';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IdeasService {
  constructor(private http: HttpClient) {}

  getIdeas(): Observable<Idea[]> {
    return this.http.get<Idea[]>('http://localhost:3000/ideas');
  }

  createIdea(idea: Idea): Observable<Idea> {
    return this.http
      .post<Idea>('http://localhost:3000/ideas', idea)
      .pipe(catchError(this.handleError));
  }

  updateIdea(idea: Idea): Observable<Idea> {
    return this.http
      .put<Idea>('http://localhost:3000/ideas/' + idea.id, idea)
      .pipe(catchError(this.handleError));
  }

  deleteIdea(idea: Idea): Observable<unknown> {
    return this.http
      .delete<Idea>('http://localhost:3000/ideas/' + idea.id)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
