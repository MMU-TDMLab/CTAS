import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  notLoggedIn = true;
  loggingIn: String = '';

  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]
      }),
      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]
      }),
    });
  }

  onLogin() {
    if (this.form.invalid) {
      return;
    }
    this.authService.userLogin(this.form.value.email, this.form.value.password); // , this.form.value.role
    this.router.navigate(['/']);
    //   if (this.notLoggedIn === true) {
  //     this.router.navigate(['/']);
  //   }
  //   this.form.reset();

  }
}
