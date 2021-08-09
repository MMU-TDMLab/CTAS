import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../posts/post.model';
import { Subscription } from 'rxjs';
import { TestService } from '../test.service';
import { testEntry } from '../test.model';
import { PostsService } from 'src/app/posts/posts.service';

declare var $: any;

@Component({
  selector: 'app-pre-test',
  templateUrl: './pre-test.component.html',
  styleUrls: ['./pre-test.component.css']
})

export class PreTestComponent implements OnInit, OnDestroy {
  public isLoading = true;
  public id: string;
  public hardWords: string[]; // = [];
  public selectedWords:string[] = [];
  public focusWord: string = '';
  public focusNumber: number = 0;
  public contextSentences: string[];
  public sentences: string[];
  private readTestSub: Subscription;

  private postSub: Subscription;
  public posts:Post[];
  public selectedPost: string;

  constructor(
    public route: ActivatedRoute,
    public testService: TestService,
    public postService: PostsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('postId');
    
    this.testService.getTests(false, this.id, false);
    this.readTestSub = this.testService.getTestsListener().subscribe((tests:testEntry[])=>{
      this.hardWords = tests.map(el=>el.word);
      this.isLoading = false;
    });
    this.postService.getPosts();
    this.postSub = this.postService.getPostUpdateListenerTwo().subscribe((posts:Post[])=>{
      this.posts = posts;
      this.selectedPost = this.posts.find((el:Post)=>el.id===this.id).body;
      this.sentences = this.selectedPost.split(/[.!?]/);
    });

  }

  wordSelect(word:string){
    if(this.selectedWords.includes(word)) this.selectedWords.splice(this.selectedWords.indexOf(word),1);
    else this.selectedWords.push(word);
  }


  submitWords(){
    if(this.testService.setStuTestDetails(this.selectedWords,this.id)){ 
      this.router.navigate(['/annotation', this.id, 'test'])
    }
  }

  ngOnDestroy(){
    this.readTestSub.unsubscribe;
  }

  openModalBox(text:string, e:Event){
    e.preventDefault();
    function escapeRegExp(string:string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }
    
    this.focusNumber = 0;
    this.focusWord = text;
    this.contextSentences = this.sentences.filter((el:string)=>{ //will match substrings but doesn't
      return el.toLocaleLowerCase().includes(this.focusWord); //really matter here better than missing out certain edge cases
    }).map((el:string)=>{
      let re = new RegExp(escapeRegExp(this.focusWord), 'ig')
      return "<q>"+el.replace(re, `<b>${this.focusWord}</b>`).trim()+"</q>"; 
    });
  
	  $("#contextModal").modal('show');
  }

  switchSentence(num:number){
    if(this.contextSentences && ( num === -1 || num === 1 )){
      if(this.focusNumber + num === this.contextSentences.length) this.focusNumber = 0;
      else if(this.focusNumber + num === -1) this.focusNumber = this.contextSentences.length - 1;
      else this.focusNumber += num;
    }
  }
}
