import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://reqres.in/api/login';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('authToken');
    this.isAuthenticatedSubject.next(!!token);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { email, password }).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          this.isAuthenticatedSubject.next(true);
        } else {
          this.isAuthenticatedSubject.next(false);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    const authState = this.isAuthenticatedSubject.value;
    return authState;
  }
}
