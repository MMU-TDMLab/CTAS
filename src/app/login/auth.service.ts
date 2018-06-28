import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from './auth-data.model';

@Injectable({ providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient) {}

  createUser(email: string, password: string, role: string) {
    const authData: AuthData = {email: email, password: password, role: role};
    this.http.post('http://localhost:3000/api/user/signup', authData)
      .subscribe(response => {
        console.log(response);
      });
  }
}
