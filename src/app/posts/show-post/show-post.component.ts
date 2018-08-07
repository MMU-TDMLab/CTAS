import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})

/**
 * Show Post Component, this component reterives all the posts from the database.
 * They can then be edited through this component. The loading spinner turns true
 * until the posts have all been reterived.
 */
export class ShowPostComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading = false;
  userId: string;
  role: string;
  private postsSub: Subscription;
  private editClicked = false;
  private annoClicked = false;
  private authStatus: Subscription;
  public userIsAuthenticated = false;

  constructor(
    public postsService: PostsService,
    private router: Router,
    private authService: AuthService,
    public route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.role = this.authService.getUserRole();
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService
      .getPostUpdateListenerTwo()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
        this.posts.reverse();
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatus = this.authService
      .getAuthStatus()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
        this.role = this.authService.getUserRole();
      });
  }

  /**
   * When clicking the edit post it sets it to true and then navigates you to /edit with
   * the post ID that you wish to edit.
   * @param postId The ID of the post you wish to edit.
   */
  onEdit(postId: string) {
    if (this.editClicked === false) {
      this.editClicked = true;
      this.router.navigate(['/edit', postId]);
    } else {
      this.editClicked = false;
      this.router.navigate(['/module']);
    }
  }

  /**
   * When clicking the document icon/button on the Post, you can then view the annotation,
   * it will redirect you to '/annotation' and passes the postId.
   * @param postId The ID of the post you want to view.
   */
  onAnnotation(postId: string) {
    if (this.annoClicked === false) {
      this.annoClicked = true;
      this.router.navigate(['/annotation', postId]);
    }
    this.annoClicked = false;
  }

  /**
   * When onDelete method will delete the Post ID you have passed through by clicking the
   * delete on the post.
   * @param postId The ID of the post you wish to delete.
   */
  onDelete(postId: string) {
    // this.isLoading = true;
    this.postsService.deletePost(postId);
  }

  /**
   * If you navigate of this HTML page it will then unsubscribe from the subscription to avoid
   * memory leakage.
   */
  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatus.unsubscribe();
  }
}
