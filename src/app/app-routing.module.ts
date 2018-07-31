import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';
import { ModuleComponent } from './course/module/module.component';
import { AuthGuard } from './auth/auth.guard';
import { AnnotationComponent } from './annotation/annotation.component';
import { HighlightComponent } from './highlight/highlight.component';
import { DefinitionComponent } from './highlight/definition/definition.component';



const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'course', component: CourseComponent, canActivate: [AuthGuard] },
  { path: 'module', component: ModuleComponent, canActivate: [AuthGuard]  },
  { path: 'edit/:postId', component: ModuleComponent, canActivate: [AuthGuard]  },
  // { path: 'annotation', component: AnnotationComponent, canActivate: [AuthGuard] },
  { path: 'annotation/:postId', component: AnnotationComponent, canActivate: [AuthGuard] },
  { path: 'highlight/:postId', component: HighlightComponent },
  { path: 'highlight/:postId/:word', component: DefinitionComponent },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule'}
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {}
