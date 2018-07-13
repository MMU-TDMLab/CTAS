import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Post } from '../posts/post.model';
import { ComplexWord } from '../annotation/complex-word.model';
import { PostsService } from '../posts/posts.service';
import { AuthService } from '../auth/auth.service';
import { AnnotationService } from './annotation.service';

@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.css']
})
export class AnnotationComponent implements OnInit, OnDestroy {
  form: FormGroup;
  posts: Post[] = [];
  words: ComplexWord[] = [];
  public thewords: any;
  public role: string;
  public id: string;
  public setWord: string;
  public postIWant;
  public wordIWant: string;
  public filePreview = '';
  public highlighter = 'true';
  public annotation = '';
  public word = '';
  public theHardWords = [];
  public wordWithAnnotation = [];
  // public annotations = [];
  private postsSub: Subscription;
  private annotationSub: Subscription;
  private authStatus: Subscription;
  public userIsAuthenticated = false;

  constructor(
    // private router: Router,
    public postsService: PostsService,
    private authService: AuthService,
    public route: ActivatedRoute,
    private annotationService: AnnotationService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      annotation: new FormControl(null, {validators: [Validators.required, Validators.minLength(8), Validators.maxLength(250)]
      }),
    });
    this.id = this.route.snapshot.paramMap.get('postId');
    this.setWord = 'Lorem';
    this.annotationService.getWords();
    this.annotationSub = this.annotationService
      .getWordUpdateListener()
      .subscribe((thewords: ComplexWord[]) => {
        this.thewords = thewords;
        this.thewords.map(word => {
          if (word.word === this.setWord) {
            this.wordIWant = word.word;
          }
          this.theHardWords.push(word.word);
          this.wordWithAnnotation.push(word);
          // console.log(this.wordWithAnnotation);
          // console.log(this.theHardWords);
          // console.log(word);
        });
      });
    this.postsService.getPosts();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.posts.map(post => {
          if (post.id === this.id) {
            this.postIWant = post.fileText;
          }
        });
      });
    this.role = this.authService.getUserRole();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatus = this.authService
      .getAuthStatus()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.role = this.authService.getUserRole();
      });
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

    complexWordIdentification(text, words) {
    // list of "complex words"
    const complexWords = words;
    // array will be populated with results.
    const results = [];
    // loop through each complex word and see if it occurs in the text
    let match, regexp;

    for (let i = 0; i < complexWords.length; i++) {
      // the complex word we are checking in this iteration
      const complexWord = complexWords[i];
      // the complex word we are checking in this iteration
      regexp = new RegExp(complexWord, 'g');

      while ((match = regexp.exec(text)) !== null) {
        // the results object
        const result = {
          begin: (regexp.lastIndex - complexWords[i].length),
          end: regexp.lastIndex,
          text: complexWord
        };
        // add the object to the results array
        const index = results.length;
        results[index] = result;
        console.log(result);
      }
    }
    // return the results array when done
    return results;
  }

  viewAnnotation(newNode) {
    // console.log(newNode);
  }

  highlightSelection() {
    this.complexWordIdentification(this.postIWant, this.theHardWords);
      const userSelection = window.getSelection();
      if (userSelection.toString() === null) {
        return;
      } else {
        for (let i = 0; i < userSelection.rangeCount; i++) {
            this.highlightRange(userSelection.getRangeAt(i));
            this.word = userSelection.toString();
           }
      }
  }

  guidGenerator() {
    const S4 = () => {
       // tslint:disable-next-line:no-bitwise
       return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
}

  highlightRange(range) {
    const newNode = document.createElement('a');
    newNode.id = this.guidGenerator();
    newNode.className = 'annotation_class';
    newNode.setAttribute(
       'style',
       'background-color: yellow; display: inline;'
    ),
    // newNode.setAttribute(
    //   'onclick',
    //   'this.viewAnnotation(newNode.id);'
    // ),
    range.surroundContents(newNode);
    this.viewAnnotation(newNode.id);
    // onAnnotate();
}

// highlightWord() {
//   this.complexWordIdentification(this.postIWant, this.theHardWords);
//     const userSelection = window.getSelection();
//     if (userSelection.toString() === null) {
//       return;
//     } else {
//       for (let i = 0; i < userSelection.rangeCount; i++) {
//           this.highlightRange(userSelection.getRangeAt(i));
//           this.word = userSelection.toString();
//          }
//     }
// }

// highLighter(range) {
//   const newNode = document.createElement('a');
//   newNode.id = this.guidGenerator();
//     newNode.className = 'annotation_class';
//     newNode.setAttribute(
//        'style',
//        'background-color: yellow; display: inline;'
//     ),
//     range.surroundContents(newNode);
// }

// highlightSelectionRemove(newNode) {
//   const close = document.createElement('span');
//   close.id = 'close';
//   close.className = 'close_layer';
// }

// highlightSelectionRemove () {
//   const userSelection = window.getSelection();
//   for (let i = 0; i < userSelection.rangeCount; i++) {
//     this.removeHighLightRange(userSelection.getRangeAt(i));
//   }
// }

// removeHighLightRange(range) {
//   const element = document.getElementById('close');
//   // element.setAttribute(
//   //   'style',
//   //   'disabled;'
//   // );
//   element.parentNode.removeChild(element);
//   console.log(element);
// }

// removeHighLightRange(range) {
//   const element = document.getElementById('close');
//   element.setAttribute(
//     'style',
//     'disabled;'
//   );
//   let str = element;
//   str = str.replace(/<\/?span[^>]*>/g,'');
//   range.surroundContents(element);
//   console.log(element);
// }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatus.unsubscribe();
  }

  onAnnotate() {
    if (this.form.invalid) {
      return;
    }
    this.annotation = this.form.value.annotation;
    this.annotationService.addWord(this.word, this.annotation);
    this.form.reset();
  }

  resetAlertBox() {
    // this.complexWord = '';
    this.word = '';
    this.annotation = '';
  }
}
