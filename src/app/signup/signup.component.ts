import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from '../../../node_modules/rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isLoading = false;
  private authStatusSub: Subscription;

  constructor(private router: Router, public authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatus().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
    // this.createForm();
    this.form = new FormGroup({
      email: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]
      }),
      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]
      }),
      role: new FormControl('', {validators: [Validators.required]
      })
    });
  }

  onSignup() {
    // console.log(this.form.value);
    if (this.form.invalid) {
      return;
    }
    this.authService.createUser(this.form.value.email, this.form.value.password, this.form.value.role);
    // this.router.navigate(['/login']);
  //   if (this.notLoggedIn === true) {
  //     this.router.navigate(['/']);
  //   }
  //   this.form.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
