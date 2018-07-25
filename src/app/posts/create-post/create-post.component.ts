import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PostsService } from '../posts.service';
import { Post } from '../post.model';
import { AuthService } from '../../auth/auth.service';
// import { fileType } from './file-type.validator';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit, OnDestroy {
  post: Post;
  form: FormGroup;
  role: string;
  isLoading = false;
  private postId: string;
  private mode = 'create';
  private authStatus: Subscription;
  public userIsAuthenticated = false;
  public btnText = 'Create Post';

  constructor(public postsService: PostsService, public route: ActivatedRoute, private authService: AuthService, public router: Router ) {}

  ngOnInit() {
    this.form = new FormGroup({
      header: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(15)]
      }),
      message: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(250)]
      }),
      body: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10000)]
      }),
      references: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(250)]
      }),
      // file: new FormControl(null, {
      //   // validators: [Validators.required]
      // }),
      // fileContent: new FormControl(null, {
      //   // validators: [Validators.required]
      // })
      // test1: new FormControl('', {
      //   validators: [Validators.required]
      // })
      // asyncValidators: [fileType]
    });
    this.role = this.authService.getUserRole();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.btnText = 'Modify Post';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            header: postData.header,
            message: postData.message,
            body: postData.body,
            references: postData.references,
            poster: postData.poster
          };
          this.form.setValue({
            header: this.post.header,
            message: this.post.message,
            body: this.post.body,
            references: this.post.references
          });
        });
      } else {
        this.mode = 'create';
        this.btnText = 'Create Post';
        this.postId = null;
      }
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
      this.authStatus = this.authService.getAuthStatus().subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.role = this.authService.getUserRole();
        this.isLoading = false;
      });
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(
        this.form.value.header,
        this.form.value.message,
        this.form.value.body,
        this.form.value.references,
        this.postId
      );
    } else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.header,
        this.form.value.message,
        this.form.value.body,
        this.form.value.references
      );
      this.router.navigate(['/module']);
    }
    this.isLoading = false;
    this.form.reset();
  }
  ngOnDestroy() {
    this.authStatus.unsubscribe();
  }
}
