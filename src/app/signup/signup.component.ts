import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from '../../../node_modules/rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

/**
 * Signup Component handles the user signup, subscriptions and form validation.
 */
export class SignupComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isLoading = false;
  private authStatusSub: Subscription;

  constructor(public authService: AuthService, private fb: FormBuilder) { }

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
      })
    });
  }

  /**
  * When Signup button is clicked, this method is called. If the form is invalid then return. If form is valid then
   * values for the email, password and role will be pushed to the Auth Service, passing it through the CreateUser.
   */
  onSignup() {
    if (this.form.invalid || this.form.value.role !== 'student') {
      return;
    }
    this.authService.createUser(this.form.value.email, this.form.value.password, this.form.value.role);
  }

  /**
   * When user navigates away from the signup.html it will unsubscribe the subscription so we don't get a memory leak.
   */
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
