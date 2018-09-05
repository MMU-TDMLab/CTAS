import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/user/';

@Injectable({ providedIn: 'root'})

/**
 * This class is the Authentication Service class. It will create tokens, token timers, check if authenticated
 * and it will show the users role/ID.
 */
export class AuthService {
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private role: string;
  private isAuthenticated = false;
  private authStatus = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Returns token if request from outside this component.
   */
  getToken() {
    return this.token;
  }

  /**
   * Returns if user is authenticated from outside this component when requested.
   */
  getIsAuth() {
    return this.isAuthenticated;
  }

  /**
   * Returns the authentication status as an Observable.
   */
  getAuthStatus() {
    return this.authStatus.asObservable();
  }

  /**
   * Returns the current user ID.
   */
  getUserId() {
    return this.userId;
  }

  /**
   * Returns the users role, provided by this service.
   */
  getUserRole() {
    return this.role;
  }

  /**
   * This is the Post query to create a user, currently it is enabled but probably will be disabled so users
   * can not create fake accounts. Maybe implement this so only Admins can create accounts.
   * @param email Email of the user being created.
   * @param password Password of the user being created(Gets Hashed).
   * @param role Role of the user when creating account.
   */
  createUser(email: string, password: string, role: string) {
    const authData: AuthData = {email: email, password: password, role: role};
    this.http
      .post(BACKEND_URL + '/signup', authData)
      .subscribe(() => {
        this.router.navigate(['/auth/login']);
      }, error => {
        this.authStatus.next(false);
      });
  }

  /**
   * These are the login details which get passed to the backend and get checked if they match the records
   * in the database.
   * @param email Email the user has entered to login.
   * @param password Password the user has entered to login.
   * @param role Role the user has entered to login.
   */
  userLogin(email: string, password: string, role: string) {
    const authData: AuthData = {email: email, password: password, role: role};
    this.http.post<{ token: string, expiresIn: number, userId: string, role: string }>(
      BACKEND_URL + '/login', authData)
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
        this.saveAuthData(token, expirationDate, this.userId, this.role);
        this.router.navigate(['/course']);
      }
    }, error => {
      this.authStatus.next(false);
    });
  }

  /**
   * This will check if the user is in the past, if the user is in the past it will return, if not in the past
   * then it will set a token timer.
   */
  authUser() {
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

  /**
   * This would be the logout method that gets called when a user logs out. So it sets the token to null, clears token,
   * sets authentication to false, clears authentication data, resets all the fields below as can be seen. Then redirects
   * user to the '/auth/login' page.
   */
  logout() {
    this.token = null;
    this.isAuthenticated = false; // Sets Auth to false
    this.authStatus.next(false);
    clearTimeout(this.tokenTimer); // Clear token timer
    this.clearAuthData();
    this.userId = null;
    this.role = null;
    this.router.navigate(['/auth/login']);
  }

  /**
   * Saves token, expiration date, user ID and role to local storage.
   * @param token This would be the token that the user stores in the local storage.
   * @param expirationDate The expiration date of the token that gets stored.
   * @param userId The user ID gets stored of the user in the local storage.
   * @param role The role of the user gets stored in the local storage too.
   */
  private saveAuthData(token: string, expirationDate: Date, userId: string, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('role', role);
  }

  /**
   * Clears the token, removes the expiration date of token, the user ID and the role of the user.
   */
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
  }

  /**
   * This gets the authentication data such as the token, the expiration date of the token, the user ID
   * and the user role. If there is no token and expirationData then simply return.
   */
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

  /**
   * Auth Timer sets the authantication token timer, when the time is up it will simply call the logout method.
   * @param duration The duration of the token, gets sent to console so it can be seen.
   */
  private authTimer(duration: number) {
    console.log('setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

}
