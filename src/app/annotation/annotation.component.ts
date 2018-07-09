import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
// import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { Post } from '../posts/post.model';
import { PostsService } from '../posts/posts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.css']
})
export class AnnotationComponent implements OnInit, OnDestroy {
  @Input() name: string;
  posts: Post[] = [];
  public id: string;
  // public fileName = this.id;
  // private fileExtention: string;
  public filePreview = '';
  private postsSub: Subscription;
  private authStatus: Subscription;
  public userIsAuthenticated = false;

  constructor(public postsService: PostsService,
    private router: Router,
    private authService: AuthService,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('postId');
    // const fileExtention = this.fileName;
    // const str = this.fileName;
    // const nameWithoutExtension = str.replace(/\.[^/.]+$/, '');
    // const res = nameWithoutExtension.replace(/http:localhost:3000\documents/g, 'red');
    // this.fileName = this.fileExtention.split('.').pop();
    // console.log('file ext ', nameWithoutExtension);
    this.postsService.getPosts();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        // this.posts.reverse();
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatus = this.authService
      .getAuthStatus()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onFilePicked(event: Event) {
    const filePicked = (event.target as HTMLInputElement).files[0];
    // this.form.patchValue({ file: filePicked });
    // this.form.get('file').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.filePreview = reader.result;
    };
    reader.readAsText(filePicked);
  }

//   isAnyPartOfElementInViewport(el) {

//     const rect = el.getBoundingClientRect();
//     DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }
//     const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
//     const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

//     // http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
//     const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
//     const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

//     return (vertInView && horInView);
// }

ngOnDestroy() {
  this.postsSub.unsubscribe();
  this.authStatus.unsubscribe();
}

}
