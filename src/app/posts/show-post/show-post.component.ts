import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
// import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading = false;
  userId: string;
  role: string;
  private postsSub: Subscription;
  private editClicked = false;
  private authStatus: Subscription;
  public userIsAuthenticated = false;
  // trustTwo = null;
  // trustedUrl = null;

  constructor(
    public postsService: PostsService,
    private router: Router,
    private authService: AuthService,
    // public sanitizer: DomSanitizer,
    public route: ActivatedRoute) {
    // this.trustTwo = sanitizer.bypassSecurityTrustResourceUrl(this.posts.filePath);
    // this.trustedUrl = sanitizer.bypassSecurityTrustUrl(this.);
  }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.role = this.authService.getUserRole();
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
        this.posts.reverse();
      });
      this.userIsAuthenticated = this.authService.getIsAuth();
      this.authStatus = this.authService.getAuthStatus().subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
        this.role = this.authService.getUserRole();
      });
  }

  onEdit(postId: string) {
    if (this.editClicked === false) {
      this.editClicked = true;
      this.router.navigate(['/edit', postId]);
    } else {
      this.editClicked = false;
      this.router.navigate(['/module']);
    }
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatus.unsubscribe();
  }
}
