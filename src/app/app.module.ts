import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule, MatProgressSpinnerModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CourseComponent } from './course/course.component';
import { ModuleComponent } from './course/module/module.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { ShowPostComponent } from './posts/show-post/show-post.component';
import { PostsService } from './posts/posts.service';
import { AuthService } from './auth/auth.service';
import { SignupComponent } from './signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { AnnotationComponent } from './annotation/annotation.component';
import { AnnotationService } from './annotation/annotation.service';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CourseComponent,
    LoginComponent,
    ModuleComponent,
    CreatePostComponent,
    ShowPostComponent,
    SignupComponent,
    AnnotationComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  providers: [PostsService, AnnotationService, AuthService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
