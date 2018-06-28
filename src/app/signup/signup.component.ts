import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;

  constructor(private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]
      }),
      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]
      }),
    });
  }

  onSignup() {
  //   if (this.form.invalid) {
  //     return;
  //   }
  //   if (this.notLoggedIn === true) {
  //     this.router.navigate(['/']);
  //   }
  //   this.form.reset();
  }
}
