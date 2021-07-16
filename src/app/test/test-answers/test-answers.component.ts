import { Component, OnInit, OnDestroy } from '@angular/core';
import { TestService } from '../test.service';
import { ActivatedRoute, Router } from '@angular/router';
import { testEntry } from '../test.model';
import { PostsService } from 'src/app/posts/posts.service';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/posts/post.model';
import { post } from 'jquery';

@Component({
  selector: 'app-test-answers',
  templateUrl: './test-answers.component.html',
  styleUrls: ['./test-answers.component.css']
})
export class TestAnswersComponent implements OnInit, OnDestroy {
  public id:string;
  public testEntries: testEntry[];
  public posts: Post[];
  public selectedPost: string;

  private postSub: Subscription;
  private readTestsSub: Subscription;
  constructor(
    public testService:TestService,
    public postService:PostsService,
    public route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('postId');
    this.testService.getTests(false, this.id);
    this.readTestsSub = this.testService.getTestsListener().subscribe((tests:testEntry[])=>{
      this.testEntries = tests;
      //console.log(tests);
    });
    this.postService.getPosts();
    this.postSub = this.postService.getPostUpdateListenerTwo().subscribe((posts:Post[])=>{
      this.posts = posts;
      this.selectedPost = this.posts.find((el:Post)=>el.id===this.id).body;
    });
  }

  ngOnDestroy(){
    if(this.readTestsSub) this.readTestsSub.unsubscribe();
    if(this.postSub) this.postSub.unsubscribe();
  }

}
