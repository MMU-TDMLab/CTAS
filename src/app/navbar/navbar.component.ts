import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

/**
 * Navbar Component handles the navigation pane and at the same time, checks if the user is authenticated.
 */
export class NavbarComponent implements OnInit, OnDestroy {
  private authListener: Subscription;
  private authStatus: Subscription;
  public isLoading = true;
  public role: string;
  userIsAuthenticated = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListener = this.authService.getAuthStatus().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });

    this.role = this.authService.getUserRole();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatus = this.authService
      .getAuthStatus()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.role = this.authService.getUserRole();
      });
    this.isLoading = false;
  }

  /**
   * When clicked logout, then it will call the authentication service, which will trigger more actions such as: Clearing
   * tokens and other informtion.
   */
  onLogout() {
    this.authService.logout();
  }

  /**
   * When the naviation is navigated away from, which only happens on reloads then unsubscribe and create new subscription.
   */
  ngOnDestroy() {
    this.authListener.unsubscribe();
    this.authStatus.unsubscribe();
  }

}
