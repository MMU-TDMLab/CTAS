import { Component, ViewChild, HostListener, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HighlightService } from './highlight.service';
import { map, delay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { Post } from '../posts/post.model';
import { PostsService } from '../posts/posts.service';
@Component({
  selector: 'app-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.scss']
})
export class HighlightComponent implements OnInit, OnDestroy {
  public reference = '';
  private postsSub: Subscription;
  posts: Post[] = [];
  public id: string;
  public postIWant: string;

  // Words that will be sent to the directive. They're updated from the service (see below)
  hardWords: {
    word: string,
    definition: string
  }[];

  // Boolean used to show the spinner. This is required to refresh the directive.
  loading = false;

  // Getter used to get the user selection (faster to use)
  get selectedText() {
    return window.getSelection().toString();
  }

  constructor(
    private service: HighlightService, private router: Router,
    public postsService: PostsService, public route: ActivatedRoute) {
    // Get the first definitions
    this.service.getDefinitions()
      // Pipe the Observable (= do something before treating it)
      .pipe(
        // simulate an HTTP call lasting one second
        map(words => {
        this.loading = true;
        return words;
      }), delay(400))
      // Treat the observable : show the paragraph and store the words to send to the directive
      .subscribe(words => {
        this.hardWords = words;
        this.loading = false;
      });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('postId');
    this.postsService.getPosts();
    this.postsSub = this.postsService
    .getPostUpdateListenerTwo()
    .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.posts.map(post => {
          if (post.id === this.id) {
            this.postIWant = post.body;
            this.reference = post.references;
          }
        });
      });
  }

  /**
   * Creates a new definition and navigate to the word to be able to edit the definition
   */
  createDefinition() {
    this.service.createDefinition(this.selectedText);
    this.router.navigate(['highlight/', this.id , this.selectedText]);
  }

  /**
   * Angular hack : this allows us to check if the user has selected text everytime a click is performed.
   * The button to create a definition will then appear, because the getter will be ran during the change detection.
   * As said, this is a hack, if you don't get it, just forget it for now
   */
  @HostListener('document:click')
  checkSelection() {}

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
