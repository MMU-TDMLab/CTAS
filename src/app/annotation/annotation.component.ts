import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Post } from '../posts/post.model';
import { ComplexWord } from '../annotation/complex-word.model';
import { PostsService } from '../posts/posts.service';
import { AuthService } from '../auth/auth.service';
import { AnnotationService } from './annotation.service';
// import { nodeChildrenAsMap } from '../../../node_modules/@angular/router/src/utils/tree';

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
  // public showingWord = '';
  public showingAnnotation: string;
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
      annotation: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(250)
        ]
      })
    });
    this.id = this.route.snapshot.paramMap.get('postId');
    // this.setWord = '';
    this.annotationService.getWords();
    this.annotationSub = this.annotationService
      .getWordUpdateListener()
      .subscribe((thewords: ComplexWord[]) => {
        this.thewords = thewords;
        this.thewords.map(word => {

            // if (word.word === this.setWord) {
            //   console.log(word.annotation);
            // }

          // if (word.word === this.setWord) {
          //   this.wordIWant = word.word;
          //   console.log(this.wordIWant);
          // }
          this.theHardWords.push(word.word);
          // console.log(word.word);
          this.wordWithAnnotation.push(word);
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
    // this.complexWordIdentification = async (this.postIWant, this.theHardWords) => {

    // }
  }

  // callComplexWordAsync = async () => {
  //   this.complexWordIdentification(this.postIWant, this.theHardWords);
  // }

  //   isAnyPartOfElementInViewport(el) {

  //     const rect = el.getBoundingClientRect();
  //     DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }
  //     const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
  //     const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

  //     const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
  //     const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

  //     return (vertInView && horInView);
  // }

  complexWordIdentification = async (text, words) => {
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
          begin: regexp.lastIndex - complexWords[i].length,
          end: regexp.lastIndex,
          text: complexWord
        };
        // add the object to the results array
        const index = results.length;
        results[index] = result;

        // console.log(this.theText);
      }
    }
    this.getWords(words);
    // return the results array when done
    return results;
  }

  getWords(words) {
    this.highlight(words);
  }
  //  getWords = async (words) => {
  //   // Use API calls here or simply pass in Constants
  //  this.highlight(words);
  //  }

  highlight = words => {
    const high = document.getElementById('scrollable');
    const paragraph = high.innerHTML.split(' ');
    const res = [];

    paragraph.map(word => {
      let t = word;
      if (words.indexOf(word) > -1) {
        t =
          '<a class="clickable" style="background-color: yellow; text-decoration: underline;">' +
          word +
          '</a>';
      }
      res.push(t);
    });
    high.innerHTML = res.join(' ');
    const elementsToMakeClickable = document.getElementsByClassName(
      'clickable'
    );
    const elementsToMakeClickableArray = Array.from(elementsToMakeClickable);
    elementsToMakeClickableArray.map(element => {
      // element.addEventListener('click', this.viewAnnotation.bind(this, theWord), false);
      element.addEventListener('click', this.viewAnnotation.bind(this));
    });
    document.getElementById('btnHighLight').style.visibility = 'visible';
  }

  viewAnnotation(e) {
    const word = e.target.textContent;
    this.findAnnotation(word);

    // this.annotationService.getAnnotation(word);
    // console.log('hey', this.theHardWords);
    // if (this.theHardWords === word) {
    //   console.log('hey');
    // }
    // SHOW ANNOTATION** need to fix this later

    // const userSelection = window.getSelection();
    // for (let i = 0; i < userSelection.rangeCount; i++) {
    //   this.highlightRange(userSelection.getRangeAt(i));
    //   theWord = userSelection.toString();
    //   // console.log(theWord);
    // }
  }

  highlightSelection() {
    // this.highlightText(this.postIWant, this.theHardWords);
    this.showingAnnotation = '';
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
    return (
      S4() +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      '-' +
      S4() +
      S4() +
      S4()
    );
  }

  highlightRange(range) {
    const newNode = document.createElement('a');
    newNode.id = this.guidGenerator();
    newNode.className = 'clickable';
    newNode.setAttribute('style', 'background-color: yellow; display: inline; text-decoration: underline;');
    const elementsToMakeClickable = document.getElementsByClassName(
      'clickable'
    );
    const elementsToMakeClickableArray = Array.from(elementsToMakeClickable);
    elementsToMakeClickableArray.map(element => {
      // element.addEventListener('click', this.viewAnnotation.bind(this, theWord), false);
      element.addEventListener('click', this.viewAnnotation.bind(this));
    });
    range.surroundContents(newNode);
    // this.viewAnnotation(newNode.id);
  }

  // removeHighlightSelection() {
  //   // this.highlightText(this.postIWant, this.theHardWords);
  //     const userSelection = window.getSelection();
  //     if (userSelection.toString() === null) {
  //       return;
  //     } else {
  //       for (let i = 0; i < userSelection.rangeCount; i++) {
  //           this.removeHighlightRange(userSelection.getRangeAt(i));
  //           this.word = userSelection.toString();
  //          }
  //     }
  // }

  // removeHighlightRange(range) {
  //   // node.remove();
  //   // const newNode = document.createElement('a');
  //   // newNode.id = this.guidGenerator();
  //   // newNode.className = 'clickable';
  //   // newNode.setAttribute(
  //   //    'style',
  //   //    'background-color: yellow; display: inline;'
  //   // );
  //   console.log('hello');

  //   const elementsToMakeClickable = document.getElementsByClassName('clickable');
  //   const elementsToMakeClickableArray = Array.from(elementsToMakeClickable);
  //    elementsToMakeClickableArray.map( (element) => {
  //     document.getElementById("my-element").remove();
  //     element.removeEventListener('click', this.viewAnnotation.bind(false));
  //     // element.addEventListener('click', this.viewAnnotation.bind(this));
  //   });
  //   // range.surroundContents(node);
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

  // deHighlightSelection(id) {
  //   // this.removeHighlightSelection();
  //   console.log(id);
  //   // document.getElementById().remove();
  //   this.word = '';
  // }

  onShowHighlights() {
    document.getElementById('btnShow').style.visibility = 'hidden';
    this.complexWordIdentification(this.postIWant, this.theHardWords);
  }

  findAnnotation(e) {
    this.setWord = e;
    // this.showingWord = e;
    this.word = e;
    this.thewords.map(word => {
      if (word.word === this.setWord) {
        this.showingAnnotation = word.annotation;
        // document.getElementById('postbtn').style.visibility = 'hidden';
      }
    });
  }

  onAnnotate() {
    if (this.form.invalid) {
      return;
    }
    // console.log(this.setWord);
    // this.thewords.map(word => {
    //   if (word.word === this.setWord) {
    //     console.log('yes man');
    //     // return;
    //   } else if (word.word === !this.setWord) {
    //     console.log('boy oh boy');
        this.annotation = this.form.value.annotation;
        this.annotationService.addWord(this.word, this.annotation);
        this.form.reset();
        this.word = '';
    //   }
    // });

  }
  // document.getElementById('postbtn').style.visibility = 'hidden';

  resetAlertBox() {
    this.word = '';
    this.annotation = '';
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatus.unsubscribe();
  }
}
