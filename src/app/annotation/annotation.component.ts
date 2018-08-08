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

/**
 * Annotation Component is the component which creates the annotations.
 * It currently creates the annotations automatically which have previously been stored in the database.
 * This component also allows Teachers/Admins to create annotations on the fly with the highlight method.
 * Delete and edit annotations.
 */
export class AnnotationComponent
  implements OnInit, OnDestroy, AfterViewChecked {
  public form: FormGroup;
  public posts: Post[] = [];
  public words: ComplexWord[] = [];
  public docWord: DocWord[] = [];
  public isLoading = true;
  public thewords: string[];
  public role: string;
  public id: string;
  public setWord: string;
  public selectedPost: string;
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
  public referencedText;

  constructor(
    public postsService: PostsService,
    private authService: AuthService,
    public route: ActivatedRoute,
    private annotationService: AnnotationService,
    private docService: DocService
  ) {}

  /**
   * This function runs at the start when you load this component.
   * Contains the form validation.
   * This function gets the complex words, posts and document specific words from the database and passes them to the component.
   * This function also checks if the user is authenticated and check what role the user is in order to allow a user to create a
   * post or view a post.
   * When everything has gone through the loading spinner gets set to false.
   */
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('postId');
    this.editing = false;
    this.annotation = '';
    this.editAnnotation = '';

    this.form = this.createForm();

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
            this.selectedPost = post.body;
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
          // console.log('doc id ', doc.document_id);
          // console.log(this.docWords);
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

  /**
   * Validation for the form when creating the annotations using FormGroup/FormControl.
   */
  createForm(): FormGroup {
    return new FormGroup({
      annotation: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(250)
        ]
      })
    });
  }

  /**
   * Highlight method gets the (complex words) from the database, passing them through this method which gets the #id of the
   * element of the HTML which shows the post. Runs the text from that element through a map where if any (complex word) match
   * any word from the post or better said the text inside the (#scrollable) div. It will then wrap it in an <a> tag and give
   * it different styles and click listner.
   */
  highlight(words: string[]) {
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
    } catch (e) {}
  }

  /**
   * documentSpecificWords method gets the (Per document words) from the database, passing them through this method which gets
   * the #id of the element of the HTML which shows the post. The same pretty much as the Highlight method. Runs the text from
   * that element through a map where if any (document word) match any word from the post or better said the text inside the
   * (#scrollable) div. It will then wrap it in an <a> tag and give it different styles and click listner.
   */
  documentSpecificWords(words: string[]) {
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
    } catch (e) {}
  }

  /**
   * ViewAnnotation Method gets called when you click on an annotation (yellow highlighted word in the text). When it has been
   * clicked it pushes that word through to here, either from the highlight/documentSpecificWords method and calls findAnnotation.
   * @param e Contains the word of which you have clicked on.
   */
  viewAnnotation(e) {
    this.resetAlertBox(false);
    const word = e.target.textContent;
    this.findAnnotation(word);
  }

  /**
   * findAnnotation sets the setWord to e, the word to e, then maps the complex words and document specific words to find out which
   * word matches and then stores the annotation of the current word that has been clicked to the showingAnnotation. This also will
   * let the user know if the word is a 'Global Word' or if the word is a 'Document Specific Word'.
   * @param e - e is the word that the user has clicked.
   */
  findAnnotation(e) {
    this.setWord = e;
    this.word = e;
    this.docService.getWords();
    this.annotationService.getWords();

    // this.theHardWords.map(word => {
    //   if (word.word === this.setWord) {
    //     this.wordReference = 'Global Word';
    //     this.docTrue = true;
    //     this.showingAnnotation = word.annotation;
    //   }
    // });

    this.docWords.map(word => {
      if (word.word === this.setWord) {
        this.wordReference = 'Document Specific Word';
        this.docTrue = false;
        this.wordId = word.document_id;
        this.showingAnnotation = word.annotation;
      }
    });
  }

  /**
   * highlightSelection sets the showingAnnotation to '', followed by getting the window.getSelection which is the selection
   * of which the user has highlighted. If the user has not highlighted anything but triggered this in any way it will then
   * return. Else it will get the range count from the text begining of text being 0 end of text being possibibly 5000. It then
   * get the range of which the user has highlighted. Then follows by calling the highlightRange and passing the range over.
   */
  highlightSelection() {
    this.showingAnnotation = '';
    const userSelection = window.getSelection();
    if (userSelection.toString() === null) {
      return;
    } else {
      for (let i = 0; i < userSelection.rangeCount; i++) {
        this.highlightRange(userSelection.getRangeAt(i));
        this.word = userSelection.toString();
        let theWord: string;
        let theAnnotation: string;

        this.docWords.map(word => {
          if (word.word === this.word) {
            theWord = this.word;
            theAnnotation = word.annotation;
          }
        });
        if (theWord && theAnnotation) {
          if (
            confirm(
              theWord + ' has previously been annotated as ' + theAnnotation + ' would you like to use this annotation?'
            )
          ) {
              this.docService.addWord(theWord, theAnnotation, this.id);
              this.word = '';
              // this.ngOnInit();
              setTimeout(() => {
                this.ngOnInit();
              }, 400);
            } else {
              alert('You can create you\'re own annotation for this word.');
            }
        }

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

  /**
   * guidGenerator generates a random ID for the node ID. Currently not very useful unless you want to
   * modify specific nodes.
   */
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

  /**
   * Using the range passed on from highlightSelection method, it then puts that text into an <a> tag followed by
   * giving it a unique ID, with a class named 'clickable' and sets style to the text.
   * @param range Range is the range between the highlighted word from x to y. An example would be this is the text:
   * Today I went to the market. If you highlighted 'went' it would be 9 to 12 would be the range.
   */
  highlightRange(range) {
    const newNode = document.createElement('a');
    newNode.id = this.guidGenerator();
    newNode.className = 'clickable';
    newNode.setAttribute(
      'style',
      'background-color: yellow; display: inline; text-decoration: underline;'
    );
    // newNode.onclick = () => {
    //   if (confirm('Are you sure you want to delete ' + range + '?')) {
    //     this.deletenode(newNode);
    //   } else {
    //     alert(range + ' has not been deleted.');
    //   }
    // };

    // Add Text for replacement (for multiple nodes only)
    newNode.appendChild(range.cloneContents());
    // Apply Node around selection (used for individual nodes only)
    return newNode;
  }

  /**
   * This deletes the annotation if you click the word two times and it will ask you before deleting it.
   * Currently this is not used but could always be added.
   */
  // deletenode(node) {
  //   const contents = document.createTextNode(node.innerText);
  //   node.parentNode.replaceChild(contents, node);
  //   this.resetAlertBox(true);
  // }

  /**
   * onAnnotation will be the method which stores the global words. It will check if the form is valid and if not
   * then it will return. If the form is valid it will then ask the user if they are sure they want to save the word
   * that they have highlighted to *All Documents*. The annotation recieves the value from the form.value.annotation.
   * It then passes the value from the front end and calls the service 'addWord' passing the word that needs to be stored
   * and the annotation associated with it. Then following by reseting the form. Else it will alert the user that the
   * selected word has not been saved.
   */
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
    } else {
      alert(this.word + ' has not been saved.');
    }
  }

  /**
   * addToDoc will be the method which stores the document specific words. It will check if the form is valid and if not
   * then it will return. If the form is valid it will then ask the user if they are sure they want to save the word
   * that they have highlighted to *This Document Only*. The annotation recieves the value from the form.value.annotation.
   * It then passes the value from the front end and calls the service 'addWord' passing the word that needs to be stored,
   * the annotation associated with it and the post ID. Then following by reseting the form. Else it will alert the user
   * that the selected word has not been saved.
   */
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
      // this.showingAnnotation = '';
      // this.ngOnInit();
      setTimeout(() => {
        this.ngOnInit();
      }, 400);
    } else {
      alert(this.word + ' has not been saved.');
    }
  }

  /**
   * onEditWord method gets called when the edit button has been clicked, this then sets editing to true, hides the edit
   * button & delete button. Editing boolean hides button on the HTML page.
   */
  onEditWord() {
    this.editing = true;
    document.getElementById('editBtn').style.visibility = 'hidden';
    document.getElementById('deleteBtn').style.visibility = 'hidden';
  }

  /**
   * onEditSub handles the submission of an edit made to a Global Word. It will first ask for confimation, it will display
   * a message asking if the user is sure that they want to edit this word on all documents. Editing then become false
   * followed by grabbing the word and the form value of annotation and passing it through to the Annotation Service. Then
   * the reset will happen in order to refresh the changes on the page. If the user does not confirm the change then it will
   * return an alert saying the word has not been edited.
   */
  onEditSub() {
    if (
      confirm(
        'Are you sure you want to edit ' + this.word + ' on all documents?'
      )
    ) {
      this.editing = false;
      let theWord: string;
      let theAnnotation: string;
      theWord = this.word;
      theAnnotation = this.form.value.annotation;
      this.annotationService.editWord(theWord, theAnnotation);
      this.resetAlertBox(true);
    } else {
      alert(this.word + ' has not been edited.');
    }
  }

  /**
   * onDocEditWord method gets called when the edit button has been clicked, this then sets editing to true, hides the edit
   * button & delete button. Editing boolean hides button on the HTML page.
   */
  onDocEditWord() {
    this.editing = true;
    document.getElementById('editDocBtn').style.visibility = 'hidden';
    document.getElementById('deleteDocBtn').style.visibility = 'hidden';
  }

  /**
   * onDocEditSub handles the submission of an edit made to a Document Specific Word. It will first ask for confimation,
   * it will display a message asking if the user is sure that they want to edit this word on this document. Editing then
   * become false followed by grabbing the word, the form value of annotation and the word ID then passing it through to the
   * Doc Service. Then the reset will happen in order to refresh the changes on the page. If the user does not confirm the
   * change then it will return an alert saying the word has not been edited.
   */
  onDocEditSub() {
    if (
      confirm(
        'Are you sure you want to edit ' + this.word + ' on this document?'
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
      this.resetAlertBox(true);
    } else {
      alert(this.word + ' has not been edited.');
    }
  }

  /**
   * ResetAlertBox method is used when you click close on an annotation. It resets everything so the user can
   * experience a new fresh start on any other word or in order to view different words that the user clicks.
   * @param callNgOnInit If this is true then it will run the ngOnInit function, this has been made in such a way
   * because this resetAlertBox method gets run regularly but we do not want to call ngOnInit everytime.
   */
  resetAlertBox(callNgOnInit: boolean) {
    this.word = '';
    this.annotation = '';
    this.wordReference = '';
    this.form.reset();
    this.editing = false;
    if (callNgOnInit) {
      this.ngOnInit();
    }
  }

  /**
   * onDelete method handles the deletion of the Global words. It will ask for confimation before deleting the selected
   * word if so then it will run the following function. This will call the Annotation Service and it will pass the
   * selected word that you want to delete. find all the words and make a refresh and set everything back to ''. If the
   * user decides to cancel when the confimation is promted then no effect will be made to the page/word.
   */
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

  /**
   * onDocDelete method handles the deletion of the Document specific words. It will ask for confimation before deleting
   * the selected word if so then it will run the following function. This will call the Doc Service and it will pass the
   * selected word that you want to delete. find all the words and make a refresh and set everything back to ''. If the
   * user decides to cancel when the confimation is promted then no effect will be made to the page/word.
   */
  onDocDelete() {
    if (
      confirm(
        'Are you sure you want to DELETE ' +
          this.word +
          ' off this specific document?'
      )
    ) {
      let deleteWord: string;
      deleteWord = this.word;
      let annotation: string;
      annotation = this.showingAnnotation;
      this.docService.deleteWord(deleteWord, annotation, this.id);
      // const index = this.docWords.indexOf(deleteWord);
      // this.docWords.splice(index);
      this.word = '';
      this.wordReference = '';
      setTimeout(() => {
          this.ngOnInit();
        }, 400);
    } else {
      alert(this.word + ' has not been deleted.');
    }
  }

  /**
   * Urlify method gets hold of all the references in the post and checks which ones are a link and puts them
   * into the HTML element on the html page.
   */
  urlify(reference) {
    try {
      const text = reference;
      const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
      // const urlRegex = /(https?:\/\/[^\s]+)/g;
      const high = document.getElementById('reference');
      // const paragraph = high.innerHTML.split(' ');
      const res = [];
      text.replace(urlRegex, url => {
        let t = url;
        t = '<a href="' + url + '"></a>';
        res.push(t);
      });
      high.innerHTML = res.join(' ');
    } catch (e) {
    }
  }

  /**
   * After View is checked, run the highlight method passing the (complex words from the database through).
   * Run the documentSpecificWords method passing the document specific words.
   * Run the urlify method which gets hold of all the references in the post and checks which ones are a link.
   */
  ngAfterViewChecked() {
    this.highlight(this.thewords);
    this.documentSpecificWords(this.docWords);
    this.urlify(this.reference);
  }

  // Determine if an element is in the visible viewport
  isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const html = document.documentElement;
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || html.clientHeight) &&
    rect.right <= (window.innerWidth || html.clientWidth)
  );
  }

  /**
   * When the user closes the page or navigates away from the page, all the subscriptions get unsubscribed so we do not have issues
   * or any unnessasary waste of memory.
   */
  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatus.unsubscribe();
    this.annotationSub.unsubscribe();
    this.docSub.unsubscribe();
  }
}
