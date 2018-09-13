import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Post } from '../posts/post.model';
import { DocWord } from './document-word.model';
import { PostsService } from '../posts/posts.service';
import { AuthService } from '../auth/auth.service';
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
  public secondForm: FormGroup;
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
  public docWords = [];
  public theHardWords = [];
  public wordWithAnnotation = [];
  public userIsAuthenticated = false;
  public editing: boolean;
  public docTrue: boolean;
  public wordId;
  public referencedText;
  public theWordId: string;
  private fileText;
  private startTime;
  private endTime;
  private date;
  private modifiedTime;
  private postsSub: Subscription;
  private authStatus: Subscription;
  private docSub: Subscription;
  private readTextSub: Subscription;

  constructor(
    public postsService: PostsService,
    private authService: AuthService,
    public route: ActivatedRoute,
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
    this.startTime = Date.now();
    this.id = this.route.snapshot.paramMap.get('postId');
    this.editing = false;
    this.annotation = '';
    this.editAnnotation = '';
    this.form = this.createForm();
    this.secondForm = this.createSecondForm();

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

  /**
   * Validation for the form when creating the annotations using FormGroup/FormControl.
   */
  createForm(): FormGroup {
    return new FormGroup({
      annotation: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(450)
        ]
      })
    });
  }

  createSecondForm(): FormGroup {
    return new FormGroup({
      difficulty: new FormControl(null, {
        validators: [
          Validators.required
        ]
      })
    });
  }

  /**
   * documentSpecificWords method gets the (Per document words) from the database, passing them through this method which gets
   * the #id of the element of the HTML which shows the post. The same pretty much as the Highlight method. Runs the text from
   * that element through a map where if any (document word) match any word from the post or better said the text inside the
   * (#scrollable) div. It will then wrap it in an <a> tag and give it different styles and click listner.
   */
  highlightDocumentSpecificWords(words: string[]) {
    try {
      const high = document.getElementById('scrollable');
      const paragraph = high.innerHTML.split(' ');
      const res = [];

      paragraph.map(word => {
        let t = word;
        const withoutPunct = t.replace(/[.,\/#!$%?\^&\*;:{}=\-_—`'‘’~()\n\t]/g, '');
        // const withoutPunct = t.replace(/[.,\/#!$%\^&\*;:{}=\_`'~()]/g, '');
        // const wordWithoutPunch = word.replace(/[.,\/#!$%\^&\*;:{}=\_~()]/g, '');
        if (words.indexOf(withoutPunct) > -1) {
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
    if (this.role === 'student') {
      const currentDate = new Date();
      this.date = currentDate;
      this.docService.annotationClick(word, this.date, this.id);
    }
    this.findAnnotation(word);
  }

  /**
   * findAnnotation sets the setWord to e, the word to e, then maps the complex words and document specific words to find out which
   * word matches and then stores the annotation of the current word that has been clicked to the showingAnnotation. This also will
   * let the user know if the word is a 'Global Word' or if the word is a 'Document Specific Word'.
   * @param e - e is the word that the user has clicked.
   */
  findAnnotation(e) {
    // this.setWord = e;
    this.word = e;
    this.docService.getWords();

    this.docWords.map(word => {
      if (word.word === this.word && word.document_id === this.id) {
        this.docTrue = false;
        this.wordId = word.document_id;
        this.showingAnnotation = word.annotation;
        this.theWordId = word._id;
      }
      const withoutPunct = this.word.replace(/[.,\/#!$%?\^&\*;:{}=\-_—`'‘’~()\n]/g, '');
      this.word = withoutPunct;
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
              theWord +
                ' has previously been annotated as ' +
                theAnnotation +
                ' would you like to use this annotation?'
            )
          ) {
            this.docService.addWord(theWord, theAnnotation, this.id);
            this.word = '';
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

    // Add Text for replacement (for multiple nodes only)
    newNode.appendChild(range.cloneContents());
    // Apply Node around selection (used for individual nodes only)
    return newNode;
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
      this.word = this.word.replace(/[.,\/#!$%?\^&\*;:{}=\-_—`'‘’~()\n\t]/g, '');
      // this.word = this.word
      //   .split('.')
      //   .join('')
      //   .split(',')
      //   .join('')
      //   .split('\'')
      //   .join('')
      //   .split(' ');
      this.docService.addWord(this.word, this.annotation, this.id);
      this.form.reset();
      this.word = '';
      setTimeout(() => {
        this.ngOnInit();
      }, 400);
    } else {
      alert(this.word + ' has not been saved.');
    }
  }

  /**
   * onDocEditWord method gets called when the edit button has been clicked, this then sets editing to true, hides the edit
   * button & delete button. Editing boolean hides button on the HTML page.
   */
  onDocEditWord() {
    this.editing = true;
    try {
      document.getElementById('#editDocBtn').style.visibility = 'hidden';
      document.getElementById('#deleteDocBtn').style.visibility = 'hidden';
    } catch (e) {}
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
      let theAnnotation: string;
      let wordID: string;
      theAnnotation = this.form.value.annotation;
      wordID = this.theWordId;
      this.docService.editWord(wordID, theAnnotation);
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
    this.form.reset();
    this.editing = false;
    if (callNgOnInit) {
      this.ngOnInit();
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
      let wordID: string;
      wordID = this.theWordId;
      this.docService.deleteWord(wordID);
      // const index = this.docWords.indexOf(deleteWord);
      // this.docWords.splice(index);
      this.word = '';
      setTimeout(() => {
        this.ngOnInit();
      }, 400);
    } else {
      alert(this.word + ' has not been deleted.');
    }
  }

  /**
   * After View is checked, run the highlight method passing the (complex words from the database through).
   * Run the documentSpecificWords method passing the document specific words.
   * Run the urlify method which gets hold of all the references in the post and checks which ones are a link.
   */
  ngAfterViewChecked() {
    // console.clear();
    this.highlightDocumentSpecificWords(this.docWords);
  }

  possibleWords() {
    this.readTextSub = this.docService.readText(this.id).subscribe(data => {
      this.fileText = data;
      this.highlightPossibleWords(this.fileText, this.secondForm.value.difficulty);
    });
  }

  highlightPossibleWords(words: string[], diff: string) {
    try {
      if (this.role === 'student') {
        return;
      } else {
        const high = document.getElementById('scrollable');
        const paragraph = high.innerHTML.split(' ');
        const res = [];

        paragraph.map(word => {
          let wordsInParagraph = word;
          // const withoutPunct = wordsInParagraph.replace(/[.,\/#!$%?\^&\*;:{}=\_—`'‘’~()]/g, '');
          const withoutPunct = wordsInParagraph.replace(/[.,\/#!$%?\^&\*;:{}=\-_—`'‘’~()\n\t]/g, '');
          if (diff === 'beginner') {
            if (words[0].indexOf(withoutPunct) > -1) {
              wordsInParagraph =
                '<a class="optional" style="background-color:#dcdfe5; text-decoration: underline;">' +
                word +
                '</a>';
            }
          } else if (diff === 'intermediate') {
            if (words[1].indexOf(withoutPunct) > -1) {
              wordsInParagraph =
                '<a class="optional" style="background-color:#dcdfe5; text-decoration: underline;">' +
                word +
                '</a>';
            }
          } else if (diff === 'advanced') {
            if (words[2].indexOf(withoutPunct) > -1) {
              wordsInParagraph =
                '<a class="optional" style="background-color:#dcdfe5; text-decoration: underline;">' +
                word +
                '</a>';
            }
          }
          res.push(wordsInParagraph);
        });
        high.innerHTML = res.join(' ');
        const elementsToMakeClickable = document.getElementsByClassName(
          'clickable'
        );
        const elementsToMakeClickableArray = Array.from(
          elementsToMakeClickable
        );
        elementsToMakeClickableArray.map(element => {
          element.addEventListener('click', this.viewAnnotation.bind(this));
        });
        document.getElementById('btnHighLight').style.visibility = 'visible';
      }
    } catch (e) {}
  }

  modalClosed() {
    this.secondForm.reset();
  }

  /**
   * When the user closes the page or navigates away from the page, all the subscriptions get unsubscribed so we do not have issues
   * or any unnessasary waste of memory.
   */
  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatus.unsubscribe();
    this.docSub.unsubscribe();
    if (this.fileText) {
      this.readTextSub.unsubscribe();
    }
    if (this.role === 'student') {
      const currentDate = new Date();
      this.date = currentDate;
      this.endTime = Date.now();
      const totalTime = this.endTime - this.startTime;
      let seconds;
      seconds = Math.floor(totalTime / 1000);
      seconds = seconds % 60;
      this.modifiedTime = seconds;
      if (seconds >= 5) {
        this.docService.userActiveDate(this.date, this.modifiedTime, this.id);
        return {
          seconds: seconds
      };
      }
    }
  }
}
