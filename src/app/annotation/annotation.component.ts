import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Post } from '../posts/post.model';
import { PostsService } from '../posts/posts.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.css']
})
export class AnnotationComponent implements OnInit, OnDestroy {
  form: FormGroup;
  posts: Post[] = [];
  public role: string;
  public id: string;
  public postIWant;
  public highlighter = 'true';
  public annotation = '';
  public complexWord = '';
  // public annotations = [];
  // public fileName = this.id;
  // private fileExtention: string;
  public filePreview = '';
  private postsSub: Subscription;
  private authStatus: Subscription;
  public userIsAuthenticated = false;

  constructor(
    public postsService: PostsService,
    // private router: Router,
    private authService: AuthService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.role = this.authService.getUserRole();
    this.form = new FormGroup({
      annotation: new FormControl(null, {validators: [Validators.required, Validators.minLength(8), Validators.maxLength(250)]
      }),
    });
    this.id = this.route.snapshot.paramMap.get('postId');
    // const fileExtention = this.fileName;
    // const str = this.fileName;
    // const nameWithoutExtension = str.replace(/\.[^/.]+$/, '');
    // const res = nameWithoutExtension.replace(/http:localhost:3000\documents/g, 'red');
    // this.fileName = this.fileExtention.split('.').pop();
    // console.log('file ext ', nameWithoutExtension);
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


  viewAnnotation(newNode) {
    // console.log('hello');
    console.log(newNode);
  }

  highlightSelection() {
      const userSelection = window.getSelection();
      if (userSelection.toString() === null) {
        return;
      } else {
        for (let i = 0; i < userSelection.rangeCount; i++) {
            this.highlightRange(userSelection.getRangeAt(i));
            this.complexWord = userSelection.toString();
            // this.annotation = this.complexWord;
            // console.log(this.complexWord);
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


// var str = // your string here
// str = str.replace(/<\/?span[^>]*>/g,"");

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatus.unsubscribe();
  }

  onAnnotate() {
    if (this.form.invalid) {
      return;
    }
    this.annotation = this.form.value.annotation;
    // this.authService.userLogin(this.form.value.annotation, this.form.value.password); // , this.form.value.role
    this.form.reset();
  }

  resetAlertBox() {
    this.complexWord = '';
    this.annotation = '';
  }
}
