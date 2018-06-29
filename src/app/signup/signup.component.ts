import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;

  constructor(private router: Router, public authService: AuthService, private fb: FormBuilder) { }

  ngOnInit() {

    this.createForm();

    // this.form = new FormGroup({
    //   email: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]
    //   }),
    //   password: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]
    //   }),
    //   role: new FormControl(null, {validators: [Validators.required]
    //   })
    // });
  }

  public createForm() {
    this.form = this.fb.group({
      email: [ null,
        [ Validators.required, Validators.minLength(3)]
      ],
      password: [null,
        [Validators.required, Validators.minLength(3)]
      ],
      role: ['',
        [Validators.required]
      ]
    });
  }

  onSignup() {
    // console.log(this.form.value);
    if (this.form.invalid) {
      return;
    }
    this.authService.createUser(this.form.value.email, this.form.value.password);
    this.router.navigate(['/login']);
  //   if (this.notLoggedIn === true) {
  //     this.router.navigate(['/']);
  //   }
  //   this.form.reset();
  }
}
