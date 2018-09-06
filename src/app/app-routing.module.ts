import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CourseComponent } from './course/course.component';
import { ModuleComponent } from './course/module/module.component';
import { AuthGuard } from './auth/auth.guard';
import { AnnotationComponent } from './annotation/annotation.component';
import { AnalyticsComponent } from './analytics/analytics.component';

/**
 * This takes care of the routes. The 'canActivate: [AuthGuard]' checks if the
 * user is authenticated before accessing that route.
 */
const appRoutes: Routes = [
  { path: '', redirectTo: '/course', pathMatch: 'full' },
  { path: 'course', component: CourseComponent, canActivate: [AuthGuard] },
  { path: 'analytics', component: AnalyticsComponent, canActivate: [AuthGuard] },
  { path: 'module/:text', component: ModuleComponent, canActivate: [AuthGuard] },
  { path: 'module/:text/edit/:postId', component: ModuleComponent, canActivate: [AuthGuard] },
  { path: 'annotation', component: AnnotationComponent, canActivate: [AuthGuard] },
  { path: 'annotation/:postId', component: AnnotationComponent, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule'}
  // { path: 'module', component: ModuleComponent, canActivate: [AuthGuard]  },
  // { path: 'edit/:postId', component: ModuleComponent, canActivate: [AuthGuard] },›
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {}
