import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  login(username: string, password: string): boolean {
    this.isAuthenticated = true;
    return this.isAuthenticated;
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('auth_token');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
