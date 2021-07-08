import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { testEntry } from './test-edit.model';

import { Post } from '../posts/post.model';
import { DocWord } from '../annotation/document-word.model';
import { PostsService } from '../posts/posts.service';
import { AuthService } from '../auth/auth.service';
import { DocService } from '../annotation/document.service';
import { highlightManager } from '../highlighter/txt2JSON';
import { highlightWords } from '../highlighter/jsFunctionManager';

declare var $: any;

/**
 *  To-Do: Remove redundent code features i.e showingannotation among others.
 */

@Component({
  selector: 'app-build-test',
  templateUrl: './build-test.component.html',
  styleUrls: ['./build-test.component.css']
})
export class BuildTestComponent implements OnInit, OnDestroy {
  public docManager;
  public form: FormGroup;

  public annotations: testEntry[] = []; 

  public posts: Post[] = [];
  public docWord: DocWord[] = [];
  public isLoading = true;
  public thewords: string[];
  public role: string;
  public id: string;
  public selectedPost: string;
  public annotation: string;
  public editAnnotation: string;
  public word;
  public showingAnnotation: string;
  public userIsAuthenticated = false;
  public editing: boolean;
  private startTime;
  private endTime;
  private date;
  private modifiedTime;
  private postsSub: Subscription;
  private authStatus: Subscription;
 

  constructor(
    public route: ActivatedRoute,
    public postsService: PostsService,
    private docService: DocService, //?
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.startTime = Date.now();
    this.id = this.route.snapshot.paramMap.get('postId');
    this.editing = false;
    this.annotation = '';
    this.editAnnotation = '';

    this.form = this.createForm();
    this.postsService.getPosts();
    this.postsSub = this.postsService
      .getPostUpdateListenerTwo()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.posts.map(post => {
          if (post.id === this.id) {
            this.selectedPost = post.body;
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

  createForm(): FormGroup {
    return new FormGroup({
      annotation: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(450)
        ]
      })
    });
  }

  highlightDocumentSpecificWords(words: string[]) {
    try {
      const high = document.getElementById('scrollable');
      if(!this.docManager)this.docManager = new highlightManager(high); //add in post //also or check if element is the same as high....
	    new highlightWords(this.docManager, words).apply('clickable');

      const elementsToMakeClickable = document.getElementsByClassName(
        'clickable'
      );
      const elementsToMakeClickableArray = Array.from(elementsToMakeClickable);
      elementsToMakeClickableArray.map(element => {
        element.addEventListener('click', this.viewAnnotation.bind(this));
      });
      document.getElementById('btnHighLight').style.visibility = 'visible';
    } catch (e) {} 
  }

  addToTest() {
    if(!this.form.valid) return;
    this.word = this.word
    this.annotation = this.form.value.annotation;
    
    let found = false;
    this.annotations = this.annotations.map((el, i) => {
      if(el.word == this.word){
        el.annotation = this.annotation
        found = true;
      }
      return el;
    });
    if(!found){
      let entry: testEntry = {
        word: this.word,
        annotation: this.annotation,
        document_id: this.id
      }
      this.annotations.push(entry);
    }
    this.highlightDocumentSpecificWords([this.word]);
  }

  submitTest(){
    if(confirm('Are you sure?')){
      console.log(this.annotations);
    }
  }

  viewAnnotation(e) {
    const word = e.target.textContent.toLowerCase().trim();
    let entry = this.annotations.find(el =>el.word == word);   
    if(entry) this.form.patchValue({annotation:entry.annotation});
    this.word = word
  }

	getCaretCharacterOffsetWithin(element) {
		var caretOffset = 0;
		var doc = element.ownerDocument || element.document;
		var win = doc.defaultView || doc.parentWindow;
		var sel;
		if (typeof win.getSelection != "undefined") {
			sel = win.getSelection();
			if (sel.rangeCount > 0) {
				var range = win.getSelection().getRangeAt(0);
				var preCaretRange = range.cloneRange();
				preCaretRange.selectNodeContents(element);
				preCaretRange.setEnd(range.endContainer, range.endOffset);
				caretOffset = preCaretRange.toString().length;
			}
		} else if ( (sel = doc.selection) && sel.type != "Control") {
			var textRange = sel.createRange();
			var preCaretTextRange = doc.body.createTextRange();
			preCaretTextRange.moveToElementText(element);
			preCaretTextRange.setEndPoint("EndToEnd", textRange);
			caretOffset = preCaretTextRange.text.length;
		}
		return caretOffset;
	}

  highlightSelection() {
    this.form.reset();
    const userSelection = window.getSelection();
    if (userSelection.toString() === null || userSelection.toString().trim() == "") {
      return;
    } 
    else {
      this.showingAnnotation = '';
      for (let i = 0; i < userSelection.rangeCount; i++) { //eh??
        this.word = userSelection.toString().trim().toLowerCase();
      }
      
    }
  }

  resetAlertBox(callNgOnInit: boolean) {
    this.word = '';
    this.form.reset();
    this.editing = false;
    if (callNgOnInit) {
      this.reInit();
    }
  }

  reInit(){ // Needed??
    console.log('Not Implemented')
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
    this.authStatus.unsubscribe();
  }

}
