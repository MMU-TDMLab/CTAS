import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  notLoggedIn = true;
  loggingIn: String = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      user: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]
      }),
      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]
      }),
    });
  }

  onLogin() {
    if (this.form.invalid) {
      return;
    }
    if (this.notLoggedIn === true) {
      this.router.navigate(['/']);
    }
    this.form.reset();
  }

}
