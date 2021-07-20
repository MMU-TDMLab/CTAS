import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { testEntry } from '../test.model';
import { CTpair } from '../test.model';

import { TestService } from '../test.service';
import { Post } from '../../posts/post.model';
import { DocWord } from '../../annotation/document-word.model';
import { PostsService } from '../../posts/posts.service';
import { AuthService } from '../../auth/auth.service';
import { DocService } from '../../annotation/document.service';
import { highlightManager } from '../../highlighter/txt2JSON';
import { highlightWords } from '../../highlighter/jsFunctionManager';

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
  public autoAnnotations: testEntry[] = [];
  private CTpairs: CTpair[] = [];

  public showDelete: Boolean = false;
  public hardWords: string[];
  public mode: string; //teacher, teacher+assist
  public annotationForm:FormGroup;

  public description: [string, string, string] = ['','',''];
  public contextTarget: string;
  public CTpair: {'query':'','string':''};

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
  private readTextSub: Subscription;
  private testSub: Subscription;

  constructor(
    public route: ActivatedRoute,
    public postsService: PostsService,
    public testService: TestService,
    private docService: DocService, //?
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.startTime = Date.now();
    this.id = this.route.snapshot.paramMap.get('postId');
    this.editing = false;
    this.annotation = '';
    this.editAnnotation = '';

    this.mode = 'teacher';
    this.annotationForm = this.createFormAnnotation();

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

  createFormAnnotation(): FormGroup {
    return new FormGroup({
      annotationInput: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(450)
        ]
      })
    });
  }

  setAnnotationInput(a_input: string){
	  this.annotationForm.get('annotationInput').setValue(a_input);
	  this.annotationForm.get('annotationInput').markAsTouched();
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

  changeMode(mode:string){
    if(!this.docManager){
      const high = document.getElementById('scrollable');
      this.docManager = new highlightManager(high); 
      this.docManager.buildDoc();
    }
    if(mode === 'assist'){
      this.mode = 'assist';
    }else if(mode === 'teacher'){
      this.mode = 'teacher';
    }else alert('Error changing mode');
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
        teacher:true,
        word: this.word,
        annotation: this.annotation,
        document_id: this.id
      }
      this.annotations.push(entry);
    }
    this.showDelete = true;
    this.highlightDocumentSpecificWords([this.word]);
  }

  processHardWords(){
    let theDoc = this.docManager.docUncased;
    let sentences = theDoc.split(/[.;!?]/); //add more comprehensive parsing
    sentences.forEach((el:string) => {
      if(el.trim().split(' ').length > 3){
        this.hardWords.forEach((CW:string)=>{
          if(el.includes(CW)){ //also check CW is not a substring!!!!!
            let item = this.CTpairs.find(pair=>pair.string === CW)
            if(item) item.query.push(el);
            else this.CTpairs.push({'query':[el], 'string':CW});
          }
        });
      }
    });
    console.log(this.CTpairs);
    document.getElementById('infoBox').innerHTML = `
      Processing and saving test, please wait this may take a while! <br>
      Loading Definitions...
    `;

    this.testService.postCTpairs(this.CTpairs);
    this.testSub = this.testService.getProgressListener().subscribe((prog:boolean)=>{
      if(prog === true){
        document.getElementById('infoBox').innerHTML = `Saving Test!`;
        this.testService.saveTest(this.id, this.annotations).then(rslt=>{
          console.log(rslt);
          this.router.navigate(['add-answers', this.id]);
        }).catch(error=>{
          alert('Unable to save test...');
          console.error(error);
        });
      }else{
        alert('Issue Loading Definitions')
      }
    });
  }

  submitTest(){
    if(this.role === 'teacher' || this.role === 'admin'){
      if(confirm('Are you sure?')){
        console.log(this.annotations)
        if(!this.docManager)this.highlightDocumentSpecificWords([]);
        document.getElementById('infoBox').innerHTML = `
          Processing and saving test, please wait this may take a while! <br>
          Loading Complex Words...
        `;
        this.resetAlertBox(false);
        this.isLoading = true;
        this.readTextSub = this.docService.readText(this.id).subscribe(data=>{
          this.hardWords = data[1] //0:beginner 1:intermediate 2:hard //Maybe add option to set this??
          this.processHardWords();
        });
        
      }
    }
  }

  viewAnnotation(e) {
    this.showDelete = true;
    const word = e.target.textContent.toLowerCase().trim();
    let entry = this.annotations.find(el =>el.word == word);   
    if(entry) this.form.patchValue({annotation:entry.annotation});
    this.word = word
  }

  addToDoc(){
    this.form.patchValue({annotation:this.annotationForm.value.annotationInput});
    this.addToTest();
  }

  deleteAnnotation() {
    this.annotations = this.annotations.filter(entry => entry.word != this.word);
    this.resetAlertBox(true);
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

  openModalBox(box:string){$("#"+box).modal('show');}

  highlightSelection() {
    
    this.form.reset();
    this.resetAlertBox(false);
    const userSelection = window.getSelection();
    if (userSelection.toString() === null || userSelection.toString().trim() == "") {
      return;
    } 
    else {
      this.showingAnnotation = '';
      for (let i = 0; i < userSelection.rangeCount; i++) { //eh??
        this.word = userSelection.toString().trim().toLowerCase();
      }
      if(this.mode === 'assist'){
        console.log(userSelection.toString())
        this.annotationForm.get('annotationInput').setValue(null);
        
        let startOffset = this.getCaretCharacterOffsetWithin(this.docManager.element) - userSelection.toString().length; 
        console.log(this.docManager.element);
        this.CTpair = this.docManager.getItemIndex(startOffset,userSelection.toString());
        
        this.contextTarget = `<q>${this.CTpair.string.replace(this.CTpair.query.trim(), `<u><b>${this.CTpair.query.trim()}</b></u>`).trim()}</q>`; //Need to sanitize this in HTML maybe?
        console.log(this.CTpair);
        this.docService.lookupDef(this.CTpair).then((rslt: [string, string, string])=>{
          console.log(rslt);
        
          this.description = rslt;
          this.openModalBox('annotationModal');
        });
      }
      
    }
  }

  resetAlertBox(callNgOnInit: boolean) {
    this.word = '';
    this.form.reset();
    this.showDelete = false;
    this.editing = false;
    if (callNgOnInit) {
      this.reInit();
    }
  }

  reInit(){ 
    if(this.docManager){
      this.docManager.reset();
      this.highlightDocumentSpecificWords(this.annotations.map(el=> el.word));
    }
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
    this.authStatus.unsubscribe();
    if(this.hardWords) this.readTextSub.unsubscribe();
    if(this.testSub) this.testSub.unsubscribe();
  }

}
