import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Post } from '../posts/post.model';
import { ComplexWord } from '../annotation/complex-word.model';
import { DocWord } from './document-word.model';
import { PostsService } from '../posts/posts.service';
import { AuthService } from '../auth/auth.service';
import { AnnotationService } from './annotation.service';
import { DocService } from './document.service';

@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.css']
})
export class AnnotationComponent
  implements OnInit, OnDestroy, AfterViewChecked {
  form: FormGroup;
  posts: Post[] = [];
  words: ComplexWord[] = [];
  docWord: DocWord[] = [];
  public isLoading = true;
  public thewords: string[];
  public role: string;
  public id: string;
  public setWord: string;
  public postIWant: string;
  public annotation: string;
  public editAnnotation: string;
  public word;
  public showingAnnotation: string;
  public docWords = [];
  public theHardWords = [];
  public wordWithAnnotation = [];
  private postsSub: Subscription;
  private annotationSub: Subscription;
  private authStatus: Subscription;
  private docSub: Subscription;
  public userIsAuthenticated = false;
  public editing: boolean;
  public reference = '';
  public wordReference = '';
  public docTrue: boolean;
  public wordId;

  constructor(
    public postsService: PostsService,
    private authService: AuthService,
    public route: ActivatedRoute,
    private annotationService: AnnotationService,
    private docService: DocService
  ) {} // private cdRef: ChangeDetectorRef
  // private elRef: ElementRef

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('postId');
    this.editing = false;
    this.annotation = '';
    this.editAnnotation = '';
    this.form = new FormGroup({
      annotation: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(250)
        ]
      })
    });
    this.annotationService.getWords();
    this.postsService.getPosts();

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

    this.docService.getWords();
    this.docSub = this.docService
      .getWordUpdateListenerTwo()
      .subscribe((docWord: DocWord[]) => {
        this.docWords = docWord;
        this.docWords.map(doc => {
          if (doc.document_id === this.id) {
            this.docWords.push(doc.word);
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
    this.isLoading = false;
  }

  highlight(words) {
    try {
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
        element.addEventListener('click', this.viewAnnotation.bind(this));
      });
      document.getElementById('btnHighLight').style.visibility = 'visible';
    } catch (e) {
      // console.log(e);
    }
  }

  documentSpecificWords = words => {
    try {
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
        element.addEventListener('click', this.viewAnnotation.bind(this));
      });
      document.getElementById('btnHighLight').style.visibility = 'visible';
    } catch (e) {
      // console.log(e);
    }
  }

  viewAnnotation(e) {
    const word = e.target.textContent;
    this.findAnnotation(word);
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
        const node = this.highlightRange(
          userSelection.getRangeAt(i) /*.toString()*/
        );
        // Make the range into a variable so we can replace it
        const range = userSelection.getRangeAt(i);
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
    newNode.onclick = () => {
      if (confirm('Are you sure you want to delete ' + range + '?')) {
        this.deletenode(newNode);
      } else {
        alert(range + ' has not been deleted.');
      }
    };
    // Add Text for replacement (for multiple nodes only)
    newNode.appendChild(range.cloneContents());
    // Apply Node around selection (used for individual nodes only)
    return newNode;
  }

  deletenode(node) {
    const contents = document.createTextNode(node.innerText);
    node.parentNode.replaceChild(contents, node);
    this.resetAlertBox();
  }

  findAnnotation(e) {
    this.setWord = e;
    this.word = e;
    this.docService.getWords();
    this.annotationService.getWords();

    this.theHardWords.map(word => {
      if (word.word === this.setWord) {
        this.wordReference = 'Global Word';
        this.docTrue = true;
        this.showingAnnotation = word.annotation;
      }
    });

    this.docWords.map(word => {
      if (word.word === this.setWord) {
        this.wordReference = 'Document Specific Word';
        this.docTrue = false;
        this.wordId = word.document_id;
        this.showingAnnotation = word.annotation;
      }
    });
  }

  onAnnotate() {
    if (!this.form.valid) {
      return;
    }
    if (
      confirm(
        'Are you sure you want to save ' + this.word + ' to all documents?'
      )
    ) {
      this.annotation = this.form.value.annotation;
      this.annotationService.addWord(this.word, this.annotation);
      this.form.reset();
      this.word = '';
      this.ngOnInit();
      this.docService.getWords();
      this.annotationService.getWords();
      this.theHardWords.map(word => {
        this.thewords = word.word;
      });
      this.ngOnInit();
    } else {
      alert(this.word + ' has not been saved.');
    }
  }

  addToDoc() {
    if (!this.form.valid) {
      return;
    }
    if (
      confirm(
        'Are you sure you want to save ' + this.word + ' to this document?'
      )
    ) {
    this.annotation = this.form.value.annotation;
    this.docService.addWord(this.word, this.annotation, this.id);
    this.form.reset();
    this.word = '';
    this.ngOnInit();
    this.docService.getWords();
    this.annotationService.getWords();
    this.docWords.map(word => {
      this.docWords = word.word;
    });
    this.ngOnInit();
  } else {
    alert(this.word + ' has not been saved.');
  }
  }

  onEditWord() {
    this.editing = true;
    document.getElementById('editBtn').style.visibility = 'hidden';
    document.getElementById('deleteBtn').style.visibility = 'hidden';
  }

  onEditSub() {
    if (
      confirm(
        'Are you sure you want to edit ' + this.word + ' off all documents?'
      )
    ) {
    this.editing = false;
    let theWord: string;
    let theAnnotation: string;
    theWord = this.word;
    theAnnotation = this.form.value.annotation;
    this.annotationService.editWord(theWord, theAnnotation);
    this.resetAlertBox();
  } else {
    alert(this.word + ' has not been edited.');
  }
  }

  onDocEditWord() {
    this.editing = true;
    document.getElementById('editDocBtn').style.visibility = 'hidden';
    document.getElementById('deleteDocBtn').style.visibility = 'hidden';
  }

  onDocEditSub() {
    if (
      confirm(
        'Are you sure you want to edit ' + this.word + ' off this document?'
      )
    ) {
    this.editing = false;
    let theWord: string;
    let theAnnotation: string;
    let wordId: string;
    theWord = this.word;
    theAnnotation = this.form.value.annotation;
    wordId = this.wordId;
    this.docService.editWord(theWord, theAnnotation, wordId);
    this.resetAlertBox();
  } else {
    alert(this.word + ' has not been edited.');
  }
  }

  resetAlertBox() {
    this.word = '';
    this.annotation = '';
    this.wordReference = '';
    this.form.reset();
    this.editing = false;
    this.ngOnInit();
  }

  onDelete() {
    if (
      confirm(
        'Are you sure you want to DELETE ' + this.word + ' off all documents?'
      )
    ) {
    let deleteWord: string;
    deleteWord = this.word;
    this.annotationService.deleteWord(deleteWord);
    this.docService.getWords();
    this.annotationService.getWords();
    const index = this.thewords.indexOf(deleteWord);
    this.thewords.splice(index);
    this.word = '';
    this.wordReference = '';
    this.ngOnInit();
  } else {
    alert(this.word + ' has not been deleted.');
  }
  }

  onDocDelete() {
    if (
      confirm(
        'Are you sure you want to DELETE ' + this.word + ' off this specific document?'
      )
    ) {
    let deleteWord: string;
    deleteWord = this.word;
    this.docService.deleteWord(deleteWord);
    this.docService.getWords();
    this.annotationService.getWords();
    const index = this.docWords.indexOf(deleteWord);
    this.docWords.splice(index);
    this.word = '';
    this.wordReference = '';
    this.ngOnInit();
  } else {
    alert(this.word + ' has not been deleted.');
  }
  }

  urlify(reference) {
    const text = reference;
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    // const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, url => {
      return '<a href="' + url + '">' + url + '</a>';
    });
  }

  ngAfterViewChecked() {
    this.highlight(this.thewords);
    this.documentSpecificWords(this.docWords);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatus.unsubscribe();
    this.annotationSub.unsubscribe();
    this.docSub.unsubscribe();
  }
}
