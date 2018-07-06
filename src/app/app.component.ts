import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Subscription } from 'rxjs';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  // role: string;
  // private authStatus: Subscription;
  // public userIsAuthenticated = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // this.role = this.authService.getUserRole();
    this.authService.authUser();

    // this.userIsAuthenticated = this.authService.getIsAuth();
    //   this.authStatus = this.authService.getAuthStatus().subscribe(isAuthenticated => {
    //     this.userIsAuthenticated = isAuthenticated;
    //     this.role = this.authService.getUserRole();
    //   });
  }

  ngOnDestroy() {
    // this.authStatus.unsubscribe();
  }
}
