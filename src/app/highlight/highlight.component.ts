import { Component, ViewChild, HostListener, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, delay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Post } from '../posts/post.model';
import { ComplexWord } from '../annotation/complex-word.model';
import { PostsService } from '../posts/posts.service';
import { AnnotationService } from '../annotation/annotation.service';
import { HighlightService } from './highlight.service';
import { DefinitionComponent } from './definition/definition.component';
@Component({
  selector: 'app-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.scss']
})
export class HighlightComponent implements OnInit, OnDestroy {
  // ****
  private postsSub: Subscription;
  private annotationSub: Subscription;
  posts: Post[] = [];
  words: ComplexWord[] = [];
  public id: string;
  public postIWant: string;
  public thewords: string[];
  public theHardWords = [];
  public wordWithAnnotation = [];
  public reference = '';
  // ****

  // Words that will be sent to the directive. They're updated from the service (see below)
  hardWords: {
    word: string,
    definition: string
  }[];

  @ViewChild(DefinitionComponent) definitionComponent: DefinitionComponent;

  // Boolean used to show the spinner. This is required to refresh the directive.
  loading = false;

  // Getter used to get the user selection (faster to use)
  get selectedText() {
    return window.getSelection().toString();
  }

  constructor(
    public service: HighlightService, private router: Router,
    public postsService: PostsService, public route: ActivatedRoute,
    public annotationService: AnnotationService) {
    // Get the first definitions
    this.service.getDefinitions()
      // Pipe the Observable (= do something before treating it)
      .pipe(
        // simulate an HTTP call lasting one second
        map(words => {
        this.loading = true;
        return words;
      }), delay(1))
      // Treat the observable : show the paragraph and store the words to send to the directive
      .subscribe(words => {
        this.hardWords = words;
        this.loading = false;
      });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('postId');
    this.annotationService.getWords();
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

      this.annotationSub = this.annotationService
      .getWordUpdateListenerTwo()
      .subscribe((theHardWords: ComplexWord[]) => {
        this.thewords = [];
        this.theHardWords = theHardWords;
        this.theHardWords.map(word => {
          this.thewords.push(word.word);
          this.wordWithAnnotation.push(word);
        });
      });
  }

  /**
   * Creates a new definition and navigate to the word to be able to edit the definition
   */
  createDefinition() {
    this.service.createDefinition(this.selectedText);
    this.service.wordChange.next(this.selectedText);
  }

  /**
   * Angular hack : this allows us to check if the user has selected text everytime a click is performed.
   * The button to create a definition will then appear, because the getter will be ran during the change detection.
   */
  @HostListener('document:click')
  checkSelection() {}

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.annotationSub.unsubscribe();
  }
}
