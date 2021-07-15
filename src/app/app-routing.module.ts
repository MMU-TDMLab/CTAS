import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CourseComponent } from './course/course.component';
import { ModuleComponent } from './course/module/module.component';
import { AuthGuard } from './auth/auth.guard';
import { AnnotationComponent } from './annotation/annotation.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { PreTestComponent } from './test/pre-test/pre-test.component';
import { BuildTestComponent } from './test/build-test/build-test.component';
import { TestAnswersComponent } from './test/test-answers/test-answers.component'
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
  { path: 'annotation/:postId/test', component: AnnotationComponent, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  { path: 'pre-test', component: PreTestComponent}, //AuthGuard?
  { path: 'pre-test/:postId', component: PreTestComponent},
  { path: 'build-test', component: BuildTestComponent, canActivate: [AuthGuard]},
  { path: 'build-test/:postId', component: BuildTestComponent, canActivate: [AuthGuard] },
  { path: 'add-answers', component: TestAnswersComponent, canActivate: [AuthGuard]}, //AuthGuard?
  { path: 'add-answers/:postId', component: TestAnswersComponent, canActivate: [AuthGuard] }
  // { path: 'module', component: ModuleComponent, canActivate: [AuthGuard]  },
  // { path: 'edit/:postId', component: ModuleComponent, canActivate: [AuthGuard] },›
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {}
