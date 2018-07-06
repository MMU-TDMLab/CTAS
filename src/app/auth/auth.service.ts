import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';

@Injectable({ providedIn: 'root'})
export class AuthService {
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private role: string;
  private isAuthenticated = false;
  private authStatus = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatus() {
    return this.authStatus.asObservable();
  }

  getUserId() {
    return this.userId;
  }

  getUserRole() {
    return this.role;
  }

  createUser(email: string, password: string, role: string) {
    const authData: AuthData = {email: email, password: password, role: role};
    this.http.post('http://localhost:3000/api/user/signup', authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  userLogin(email: string, password: string, role: string) {
    const authData: AuthData = {email: email, password: password, role: role};
    // tslint:disable-next-line:max-line-length
    this.http.post<{ token: string, expiresIn: number, userId: string, role: string }>('http://localhost:3000/api/user/login', authData) // , role: string
    .subscribe(response => {
      const token = response.token;
      this.token = token;
      if (token) {
        const expiresDuration = response.expiresIn;
        this.authTimer(expiresDuration);
        this.isAuthenticated = true;
        this.role = response.role;
        this.userId = response.userId;
        this.authStatus.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresDuration * 1000);
        this.saveAuthData(token, expirationDate, this.userId, this.role); // , this.userRole
        this.router.navigate(['/']);
      }
    });
  }

  authUser() {    // Checks if the token is in the past if not it then sets the token timer
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInfo.token;
      this.isAuthenticated = true;
      this.userId = authInfo.userId;
      this.role = authInfo.role;
      this.authTimer(expiresIn / 1000);
      this.authStatus.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false; // Sets Auth to false
    this.authStatus.next(false);
    clearTimeout(this.tokenTimer); // Clear token timer
    this.clearAuthData();
    this.userId = null;
    this.role = null;
    this.router.navigate(['/login']);
  }

  // tslint:disable-next-line:max-line-length
  private saveAuthData(token: string, expirationDate: Date, userId: string, role: string) { // Saves token and expiration date to local storage
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('role', role);
  }

  private clearAuthData() { // Clears the token and the expiration date of token
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      role: role
    };
  }

  private authTimer(duration: number) {     // Sets Token Timer
    console.log('setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

}
