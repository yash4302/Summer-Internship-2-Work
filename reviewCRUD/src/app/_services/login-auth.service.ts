import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {
  isAuthenticated = false;
  link = 'http://localhost:5000/api'

  constructor(private http: HttpClient) { }

  authenticateUser(username: string, password: string) {
    this.isAuthenticated = false
    if(username == 'yash4302' && password == 'Miteswati@9') {
      this.isAuthenticated = true
    }
    this.storeAuth();
  }

  deAuthenticate() {
    this.isAuthenticated = false;
    this.storeAuth();
  }

  getAuthStatus() {
    return window.localStorage.getItem('isAuthenticated');
  }

  private storeAuth() {
    window.localStorage.setItem('isAuthenticated', this.isAuthenticated.toString());
  }
}
