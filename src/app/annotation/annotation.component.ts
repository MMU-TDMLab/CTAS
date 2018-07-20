import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Observable } from 'rxjs/Observable';
import { map, switchMap } from '../../../node_modules/rxjs/operators';
import 'rxjs/add/observable/forkJoin';

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
  public isLoading = true;
  public wordsLoaded: boolean;
  public postLoaded: boolean;
  public thewords: any;
  public role: string;
  public id: string;
  public setWord: string;
  public postIWant: string;
  public filePreview: string;
  public annotation: string;
  public editAnnotation: string;
  public word;
  public showingAnnotation: string;
  public theHardWords = [];
  public wordWithAnnotation = [];
  private postsSub: Subscription;
  private annotationSub: Subscription;
  private authStatus: Subscription;
  public userIsAuthenticated = false;
  public editing: boolean;
  // public messageId: string;

  constructor(
    // private router: Router,
    public postsService: PostsService,
    private authService: AuthService,
    public route: ActivatedRoute,
    private annotationService: AnnotationService
  ) {}

  ngOnInit() {
    this.editing = false;
    this.filePreview = '';
    this.annotation = '';
    this.editAnnotation = '';
    this.form = new FormGroup({
      annotation: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(250)
        ]
      }),
      // editAnnotation: new FormControl(null, {
      //   validators: [
      //     Validators.required,
      //     Validators.minLength(8),
      //     Validators.maxLength(250)
      //   ]
      // }),
    });
    this.id = this.route.snapshot.paramMap.get('postId');
    this.annotationService.getWords();
    this.postsService.getPosts();

    ////////////////
    // Observable.
    // forkJoin(
    //   this.annotationService.getWordUpdateListener(),
    //   this.postsService.getPostUpdateListener()
    // ).subscribe(
    //   data => {
    //     // console.log(data);
    //     // data[0] result from getWordUpdateListener
    //     const words = data[0].words;
    //     // console.log(data[0].words);
    //     // this.thewords = data[0];
    //     words.map(word => {
    //       this.theHardWords.push(word.word);
    //       this.wordWithAnnotation.push(word);
    //     });
    //     // data[1] result from getPostUpdateListener
    //     // this.posts = data2;
    //     // const posts: Post[] = [] = data[1].posts;
    //     // console.log(posts);
    //     const posts = data[1].posts;
    //     posts.map(post => {
    //       if (post._id === this.id) {
    //         this.postIWant = post.fileText;
    //         // console.log(this.postIWant);
    //       }
    //     });
    //     this.isLoading = false;
    //     this.complexWordIdentification(this.postIWant, this.theHardWords);
    //   },
    //   err => {
    //     console.log(err);
    //     // error handling
    //   }
    // );
    // **************

    this.annotationSub = this.annotationService
      .getWordUpdateListenerTwo()
      .subscribe((thewords: ComplexWord[]) => {
        this.thewords = thewords;
        this.thewords.map(word => {
          this.theHardWords.push(word.word);
          this.wordWithAnnotation.push(word);
        });
      });
    this.postsService.getPosts();

    this.postsSub = this.postsService
      .getPostUpdateListenerTwo()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.posts.map(post => {
          if (post.id === this.id) {
            this.postIWant = post.fileText;
          }
        });
      });
      this.isLoading = false;

    ////
    // this.annotationService.getWordUpdateListenerTwo().pipe(
    //   switchMap(thewords => {
    //     // console.log(thewords);
    //     return this.postsService.getPostUpdateListenerTwo().pipe(
    //       map(posts => ({ thewords, posts }))
    //     );
    //   }),
    // ).subscribe(({ thewords, posts }) => {
    //   this.posts.map(post => {
    //     if (post.id === this.id) {
    //       this.postIWant = post.fileText;
    //     }
    //     console.log(post);
    //   },
    //     this.thewords.map(word => {
    //       this.theHardWords.push(word.word);
    //       this.wordWithAnnotation.push(word);
    //     }
    //     ));
    //       this.complexWordIdentification(this.postIWant, this.theHardWords);
    //     });
    // .subscribe(({ thewords, posts }) => {
    //   this.theHardWords = thewords.word;
    //   this.theHardWords.push(thewords.word);
    //   this.wordWithAnnotation.push(thewords);
    //   console.log(post.id);
    //     if (posts.id === this.id) {
    //       this.postIWant = posts.fileText;
    //     }
    //   // console.log(this.theHardWords);
    //   // this.complexWordIdentification(this.postIWant, this.theHardWords);
    //   this.isLoading = false;
    // });

    this.role = this.authService.getUserRole();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatus = this.authService
      .getAuthStatus()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.role = this.authService.getUserRole();
      });
  }

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
    // this.highlight(words);
    // return the results array when done
    return results;
  }

  getWords = words => {
    //   // Use API calls here or simply pass in Constants
    //  this.highlight(words);
     const high = document.getElementById('scrollable');
     if (high.innerHTML === null) {
     } else {
      this.highlight(words);
     }
  }

  // getWords(words) {
    // this.highlight(words);
  // }


  highlight = words => {

  //   if (document.getElementById('scrollable') != null) {
  //     let high = document.getElementById('scrollable').innerHTML;
  // } else {
  //   let high = document.getElementById('scrollable');
  // }

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
  }

  highlightSelection() {
    this.showingAnnotation = '';
    const userSelection = window.getSelection();
    if (userSelection.toString() === null) {
      return;
    } else {
      for (let i = 0; i < userSelection.rangeCount; i++) {
        this.highlightRange(userSelection.getRangeAt(i));
        this.word = userSelection.toString();
        ////////
        const node = this.highlightRange(
          userSelection.getRangeAt(i) /*.toString()*/
        );
        // Make the range into a variable so we can replace it
        const range = userSelection.getRangeAt(i);
        console.log(range);

        // Delete the current selection
        range.deleteContents();
        // Insert the copy
        range.insertNode(node);
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
    newNode.setAttribute(
      'style',
      'background-color: yellow; display: inline; text-decoration: underline;'
    );
    // const elementsToMakeClickable = document.getElementsByClassName(
    //   'clickable'
    // );
    // const elementsToMakeClickableArray = Array.from(elementsToMakeClickable);
    // elementsToMakeClickableArray.map(element => {
    //   // element.addEventListener('click', this.viewAnnotation.bind(this, theWord), false);
    //   element.addEventListener('click', this.viewAnnotation.bind(this));
    // });
    // range.surroundContents(newNode);

    // this.viewAnnotation(newNode.id);

    ///////////
    newNode.onclick = () => {
      if (confirm('Are you sure you want to delete ' + range + '?')) {
        this.deletenode(newNode);
      } else {
        alert(range + ' has not been deleted.');
      }
    };
    // Add Text for replacement (for multiple nodes only)
    // newNode.innerHTML += range;
    newNode.appendChild(range.cloneContents());

    // Apply Node around selection (used for individual nodes only)
    // range.surroundContents(newNode);
    return newNode;
    //////////
  }

  deletenode(node) {
    const contents = document.createTextNode(node.innerText);
    node.parentNode.replaceChild(contents, node);
    this.resetAlertBox();
    this.complexWordIdentification(this.postIWant, this.theHardWords);
  }

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
    // if (this.form.get('annotation').valid) {
      if (!this.form.valid) {
      return;
    }
    // console.log(this.setWord);
    // this.thewords.map(word => {
    //   if (word.word === this.setWord) {
    //     console.log('yes man');
    //     // return;
    //   } else if (word.word === !this.setWord) {
    //     console.log('boy oh boy');

    // this.messageId = '';
    // , this.messageId
    this.annotation = this.form.value.annotation;
    this.annotationService.addWord(this.word, this.annotation);
    this.form.reset();
    this.word = '';
    //   }
    // });
    this.complexWordIdentification(this.postIWant, this.theHardWords);
    this.highlight(this.theHardWords);
  }
  // document.getElementById('postbtn').style.visibility = 'hidden';

  onEditWord() {
    this.editing = true;
    document.getElementById('editBtn').style.visibility = 'hidden';
    document.getElementById('deleteBtn').style.visibility = 'hidden';
  }

  onEditSub() {
    this.editing = false;
    document.getElementById('editBtn').style.visibility = 'visible';
    document.getElementById('deleteBtn').style.visibility = 'visible';
    let theWord: string;
    let theAnnotation: string;
    theWord = this.word;
    theAnnotation = this.annotation;
    // theAnnotation = this.editAnnotation;
    this.annotationService.editWord(theWord, theAnnotation);
  }

  resetAlertBox() {
    this.word = '';
    this.annotation = '';
    // this.editAnnotation = '';
    this.editing = false;
  }

  onDelete() {
    let deleteWord: string;
    deleteWord = this.word;
    // this.isLoading = true;
    this.annotationService.deleteWord(deleteWord);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatus.unsubscribe();
  }

  // get annotationFromForm() { return this.form.get('annotation'); }
}
