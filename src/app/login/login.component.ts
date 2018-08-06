import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { Subscription } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

/**
 * Login Component handles the user login, subscriptions and form validation.
 */
export class LoginComponent implements OnInit, OnDestroy {
  private authStatusSub: Subscription;
  form: FormGroup;
  isLoading = false;

  constructor(private router: Router, public authService: AuthService) { }

  /**
   * When it gets the authentication status, the spinner becomes false.
   */
  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatus().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );

    /**
     * Email, Password and Role validation.
     */
    this.form = new FormGroup({
      email: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]
      }),
      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]
      }),
      role: new FormControl('', {validators: [Validators.required]
      }),
    });
  }

  /**
   * When login button is clicked, this method is called. If the form is invalid then return. If form is valid then
   * values for the email, password and role will be pushed to the Auth Service, passing it through the UserLogin.
   * Then navigating you to the course.
   */
  onLogin() {
    if (this.form.invalid) {
      return;
    }
    this.authService.userLogin(this.form.value.email, this.form.value.password, this.form.value.role);
    this.router.navigate(['/course']);
  }

  /**
   * When user navigates away from the login.html it will unsubscribe the subscription so we don't get a memory leak.
   */
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
