import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CreatePostComponent } from './create-post/create-post.component';
import { ShowPostComponent } from './show-post/show-post.component';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  declarations: [CreatePostComponent, ShowPostComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
  ],
  exports: [
    CreatePostComponent,
    ShowPostComponent
  ]
})

export class PostsModule {}
