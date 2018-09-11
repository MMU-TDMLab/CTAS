import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PostsService } from '../posts.service';
import { Post } from '../post.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})

/**
 * Create Post Component handles the creation of Posts. It also takes care of editing posts.
 * Checks if user is authenticated before allowing user to view particular buttons and restricts
 * user with a limited amount of features depending on authorisation level.
 */
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
  private theModuleName;
  public moduleNameWithoutPunc;

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute,
    private authService: AuthService,
    public router: Router
  ) {}

  /**
   * This runs when this component is loaded. Checks if the user is authenticted and what
   * role the user is in order to be able to use extra features. It checks the Post ID which
   * is set in the URL.
   */
  ngOnInit() {
    this.theModuleName = this.route.snapshot.paramMap.get('text');
    const withoutPunct = this.theModuleName.replace(/[.,\/#!$%\^&\*;:{}=\-_`'~()]/g, ' ');
    this.moduleNameWithoutPunc = withoutPunct;
    this.form = this.createForm();
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
            poster: postData.poster,
            moduleName: postData.moduleName,
            abstract: postData.abstract,
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
    this.authStatus = this.authService
      .getAuthStatus()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.role = this.authService.getUserRole();
        this.isLoading = false;
      });
  }

  /**
   * CreateForm handles the form validation for the Post creation.
   */
  createForm(): FormGroup {
    return new FormGroup({
      header: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50)
        ]
      }),
      message: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(250)
        ]
      }),
      body: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(15000)
        ]
      }),
      references: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(2000)
        ]
      }),
      abstract: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(2000)
        ]
      })
    });
  }

  /**
   * When onSavePost is called then, it checks if the form is valid if not it will return.
   * The spinner is set to true until the process is complete.
   * If the mode is on create it will call a different method from the Post Service.
   * You will then get redirected once its complete to the '/module' followed by setting the
   * spinner to false and reseting the form. Reseting the form is not required, but we have it
   * just incase any issues arrise.
   */
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
        this.postId,
        this.moduleNameWithoutPunc,
        this.form.value.abstract
      );
    } else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.header,
        this.form.value.message,
        this.form.value.body,
        this.form.value.references,
        this.form.value.abstract
      );
      this.router.navigate(['/module', this.theModuleName]);
    }
    this.isLoading = false;
    this.form.reset();
  }

  /**
   * If you navigate of this HTML page it will then unsubscribe from the subscription to avoid
   * memory leakage.
   */
  ngOnDestroy() {
    this.authStatus.unsubscribe();
  }
}
