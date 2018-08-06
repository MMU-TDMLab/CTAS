import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

/**
 * These are the two routes which are loaded when the application is loaded. By only loading these two,
 * it then gives the advantage of lazy loading, increases performance. Only load required pages.
 */
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class AuthRoutingModule {}
