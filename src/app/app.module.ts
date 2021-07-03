import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { CourseComponent } from './course/course.component';
import { ModuleComponent } from './course/module/module.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { AnnotationComponent } from './annotation/annotation.component';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { AngularMaterialModule } from './angular-material.module';
import { PostsModule } from './posts/posts.module';
import { AnalyticsComponent } from './analytics/analytics.component';
import { PostsService } from './posts/posts.service';
import { AuthService } from './auth/auth.service';
import { DocService } from './annotation/document.service';
import { AnalyticsService } from './analytics/analyitics.service';
import { PreTestComponent } from './pre-test/pre-test.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CourseComponent,
    ModuleComponent,
    AnnotationComponent,
    ErrorComponent,
    AnalyticsComponent,
    PreTestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    PostsModule,
  ],
  providers: [
    PostsService, AuthService, DocService, AnalyticsService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule {}
