import { Component, OnInit, Sanitizer, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
// import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

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
  // @ViewChild('fileInput') fileInput: ElementRef;
  post: Post;
  form: FormGroup;
  private postId: string;
  private mode = 'create';
  public filePreview = '';
  private authStatus: Subscription;
  public userIsAuthenticated = false;
  public btnText = 'Create Post';
  // public test1: any;
  // trustTwo = null;

  constructor(public postsService: PostsService, public route: ActivatedRoute, private authService: AuthService, public router: Router ) {}
    // public sanitizer: DomSanitizer
    // this.trustTwo = sanitizer.bypassSecurityTrustResourceUrl(this.filePreview);
    // this.trustedUrl = sanitizer.bypassSecurityTrustUrl(this.filePreview);

  ngOnInit() {
    this.form = new FormGroup({
      header: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(15)]
      }),
      message: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(200)]
      }),
      file: new FormControl(null, {
        validators: [Validators.required]
      }),
      // test1: new FormControl('', {
      //   validators: [Validators.required]
      // })
      // asyncValidators: [fileType]
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.btnText = 'Modify Post';
        this.postId = paramMap.get('postId');
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.post = {
            id: postData._id,
            header: postData.header,
            message: postData.message,
            filePath: postData.filePath,
            poster: postData.poster
          };
          this.form.setValue({
            header: this.post.header,
            message: this.post.message,
            file: this.post.filePath
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
      });
  }

  onFilePicked(event: Event) {
    const filePicked = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ file: filePicked });
    this.form.get('file').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.filePreview = reader.result;
    };
    reader.readAsDataURL(filePicked);
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postsService.addPost(
        this.form.value.header,
        this.form.value.message,
        this.form.value.file,
        this.postId
      );
    } else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.header,
        this.form.value.message,
        this.form.value.file
      );
      this.router.navigate(['/module']);
    }
    this.form.reset();
    // this.fileInput.nativeElement.value = undefined;
    // this.fileInput.nativeElement.updateValue('');
    // this.form.nativeElement.reset();
    // this.myInputVariable.nativeElement.value = '';
    // this.form.value.file.nativeElement.value = '';
  }
  ngOnDestroy() {
    this.authStatus.unsubscribe();
  }
}
