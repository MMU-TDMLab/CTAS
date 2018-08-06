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
export class LoginComponent implements OnInit, OnDestroy {
  private authStatusSub: Subscription;
  form: FormGroup;
  isLoading = false;

  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatus().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );

    this.form = new FormGroup({
      email: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]
      }),
      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]
      }),
      role: new FormControl('', {validators: [Validators.required]
      }),
    });
  }

  onLogin() {
    if (this.form.invalid) {
      return;
    }
    this.authService.userLogin(this.form.value.email, this.form.value.password, this.form.value.role);
    this.router.navigate(['/course']);
  //   this.form.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
