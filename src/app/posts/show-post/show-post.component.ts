import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { TestService } from '../../test/test.service';
import { testIdEntry } from '../../test/test.model'

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})

/**
 * Show Post Component, this component reterives all the posts from the database.
 * They can then be edited through this component. The loading spinner turns true
 * until the posts have all been reterived.
 */
export class ShowPostComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  public testIDs: string[];
  public noAnswerIDs: string[];
  isLoading: boolean;
  userId: string;
  role: string;
  private postsSub: Subscription;
  private testIDsub: Subscription;
  private editClicked = false;
  private annoClicked = false;
  private authStatus: Subscription;
  private theModuleName;
  public userIsAuthenticated = false;
  public moduleNameWithoutPunc;
  public completedTests:string[] = [];

  constructor(
    public postsService: PostsService,
    private router: Router,
    private authService: AuthService,
    public route: ActivatedRoute,
    public testService: TestService
  ) {}

  ngOnInit() {
    this.theModuleName = this.route.snapshot.paramMap.get('text');
    const withoutPunct = this.theModuleName.replace(/[.,\/#!$%\^&\*;:{}=\-_`'~()]/g, ' ');
    this.moduleNameWithoutPunc = withoutPunct;

    this.isLoading = true; 

    this.postsService.getPosts();
    this.testService.getTests();

    this.role = this.authService.getUserRole();
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService
      .getPostUpdateListenerTwo()
      .subscribe((posts: Post[]) => {
        const thePosts = posts;
        this.isLoading = false;
        thePosts.map(post => {
          if (post.moduleName === this.moduleNameWithoutPunc) {
            this.posts = posts;
          }
        });
        this.posts.reverse();
      });

    this.testIDsub = this.testService.getTestIDlistener().subscribe((ids:testIdEntry[])=>{
      this.noAnswerIDs = Array.from(new Set( //gets unique ids from tests entries that don't have an answer
        ids.filter((el:testIdEntry)=>el.answered === false).map((el:testIdEntry)=>el.doc_id)
      ));
      this.testIDs = Array.from(new Set(ids.map((el:testIdEntry)=>el.doc_id))); //unique ids
    });

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatus = this.authService
      .getAuthStatus()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
        this.role = this.authService.getUserRole();
      });

    this.testService.getAnsweredTests(this.userId).then((response)=>{
      this.completedTests = response['completed_tests'];
      console.log(this.completedTests);
    });
  }

  /**
   * When clicking the edit post it sets it to true and then navigates you to /edit with
   * the post ID that you wish to edit.
   * @param postId The ID of the post you wish to edit.
   */
  onEdit(postId: string) {
    if (this.editClicked === false) {
      this.editClicked = true;
      this.router.navigate(['/module', this.theModuleName, 'edit', postId]);
      // this.router.navigate(['/edit', postId]);
    } else {
      this.editClicked = false;
      this.router.navigate(['/module', this.theModuleName]);
    }
  }

  /**
   * When clicking the document icon/button on the Post, you can then view the annotation,
   * it will redirect you to '/annotation' and passes the postId.
   * @param postId The ID of the post you want to view.
   */
  onAnnotation(postId: string) {
    if (this.annoClicked === false) {
      this.annoClicked = true;
      if (this.role === 'student') {
        this.postsService.pageVisitCount(postId);
      }
      this.router.navigate(['/annotation', postId]);
    }
    this.annoClicked = false;
  }

  /**
   * Activated when Begin test is clicked from student view
   * Redirects you to /pre-test and passes the postId
   * @param postId The ID of the post that testing is based on
   */
  onPreTest(postId: string){
    if(this.role === 'student'){
      this.router.navigate(['/pre-test', postId]);
    }
  }

  deleteTest(postId: string){ //Add Auth
    if(this.role === 'teacher' || this.role === 'admin'){
      this.testService.deleteTest(postId);
    }
  }

  onBuildTest(postId: string){  //Add Auth
    if(this.role === 'teacher' || this.role === 'admin'){
      if(this.testIDs.includes(postId)){
        if(confirm('A test already exists for this posts, would you like to overwrite it?')){ //unreachable
          this.testService.deleteTest(postId);
          this.router.navigate( ['/build-test', postId] ); 
        }
      }
      else this.router.navigate( ['/build-test', postId] ); 
    }
  }
  onFinalizeTest(postId: string){
    if(this.role === "teacher" || this.role === 'admin'){
      if(this.noAnswerIDs.includes(postId)){
        this.router.navigate( ['add-answers', postId] );
      }
    }
  }


  /**
   * When onDelete method will delete the Post ID you have passed through by clicking the
   * delete on the post.
   * @param postId The ID of the post you wish to delete.
   */
  onDelete(postId: string) {
    // this.isLoading = true;
    this.postsService.deletePost(postId);
  }

  /**
   * If you navigate of this HTML page it will then unsubscribe from the subscription to avoid
   * memory leakage.
   */
  ngOnDestroy() {
    this.testIDsub.unsubscribe();
    this.postsSub.unsubscribe();
    this.authStatus.unsubscribe();
  }
}
