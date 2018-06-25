import { Component, OnInit, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, NgModel } from '@angular/forms';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';
// | orderBy: reverse

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading = false;
  private postsSub: Subscription;
  private isExpanded = true;
  private editClicked = false;

  constructor(public postsService: PostsService, private router: Router) {}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  onExpand() {
    if (this.isExpanded === false) {
          this.isExpanded = true;
        } else {
          this.isExpanded = false;
        }
  }

  onEdit(postId: string) {
    if (this.editClicked === false) {
      this.editClicked = true;
      this.router.navigate(['/edit', postId]);
      // [routerLink]="['/edit', post.id]";
    } else {
      this.editClicked = false;
      this.router.navigate(['/module']);
    }
  }

  // sortingArray() {
  //    let sort = this.posts.sort((a, b) => {
  //     return b.title - a.title;
  // }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
