import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PostsService } from '../posts.service';
import { Post } from '../post.model';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})

export class CreatePostComponent implements OnInit {
  post: Post;
  form: FormGroup;
  private postId: string;
  private mode = 'create';
  private addPostBtn = true;

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      header: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]
      }),
      message: new FormControl(null, {validators: [Validators.required]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.post = {
            id: postData._id,
            header: postData.header,
            message: postData.message
          };
          this.form.setValue({
            header: this.post.header,
            message: this.post.message
        });
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onAddPostBtn () {
    if (this.addPostBtn === false) {
      this.addPostBtn = true;
    } else {
      this.addPostBtn = false;
    }
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postsService.addPost(this.form.value.header, this.form.value.message);
    } else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.header,
        this.form.value.message
      );
    }
    this.form.reset();
  }
}
