import { Component, OnInit, OnDestroy } from '@angular/core';
import { TestService } from '../test.service';
import { ActivatedRoute, Router } from '@angular/router';
import { testEntry } from '../test.model';
import { PostsService } from 'src/app/posts/posts.service';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/posts/post.model';
import { AuthService } from '../../auth/auth.service';
declare var $: any;


@Component({
  selector: 'app-test-answers',
  templateUrl: './test-answers.component.html',
  styleUrls: ['./test-answers.component.css']
})
export class TestAnswersComponent implements OnInit, OnDestroy {
  public id:string;
  public testEntries: testEntry[];
  public testWords: string[];

  public posts: Post[];
  public selectedPost: string;
  public sentences: string[];
  public focusWord: string = '';
  public contextSentences: string[];
  public focusNumber: number = 0;
  role: string;
  public isLoading:boolean = false;

  private postSub: Subscription;
  private readTestsSub: Subscription;
  constructor(
    public testService:TestService,
    public postService:PostsService,
    private authService: AuthService,
    public route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.role = this.authService.getUserRole();
    if(this.role === 'student'){
      throw new Error('No authentication!')
    }
    this.id = this.route.snapshot.paramMap.get('postId');
    this.testService.getTests(false, this.id);
    this.readTestsSub = this.testService.getTestsListener().subscribe((tests:testEntry[])=>{
      this.testEntries = tests 
      this.testWords = Array.from(new Set(tests.map(el=>el.word)))
    
    });
    this.postService.getPosts();
    this.postSub = this.postService.getPostUpdateListenerTwo().subscribe((posts:Post[])=>{
      this.posts = posts;
      this.selectedPost = this.posts.find((el:Post)=>el.id===this.id).body;
      this.sentences = this.selectedPost.split(/[.!?]/); //add more comprehensive parsing
    });
  }

  switchSentence(num:number){
    if(this.contextSentences && ( num === -1 || num === 1 )){
      if(this.focusNumber + num === this.contextSentences.length) this.focusNumber = 0;
      else if(this.focusNumber + num === -1) this.focusNumber = this.contextSentences.length - 1;
      else this.focusNumber += num;
    }
  }

  findTestEntry(index:number, findAll:boolean = false){
    let word:string = this.testWords[index];
    if(findAll === false){
      let entry:testEntry = this.testEntries.find(el=>el.word === word);
      return entry;
    }
    if(findAll === true){
      let entries:testEntry[] = this.testEntries.filter(el=>el.word === word);
      return entries;
    }
  }
  findTestIds(index:number){
    let word:string = this.testWords[index];
    let ids:number[] = this.testEntries.map((el,i)=>{
      if(el.word === word) return i;
    }).filter(el=>el !== undefined);

    return ids;
  }

  openModalBox(text:string){
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

  onSubmit(){
    if(confirm('Are you sure?')){
      /**
       * We want to find all occuring instances of a string in test entries
       * and set the same answer for each of them
       * there may be duplicate entries given by teacher and the system
       */
      for(let i=0;i<this.testWords.length;i++){
        let ids:number[] = this.findTestIds(i);
        console.log(ids)
        for(let id of ids){
          let answerInput = $(`#input-${i}`);
          if(answerInput){
            let answerVal:string = answerInput.val().trim();
            if(answerVal === '') answerVal = '-';
            this.testEntries[id].answer = answerVal;
          } 
        }
      }
      console.log(this.testEntries);
      
      this.testService.saveAnswers(this.testEntries).then(rslt=>{
        console.log(rslt);
        this.router.navigate(['module', 'First Year Seminar']);
      }).catch(error=>{
        console.error(error);
        alert('Failed to save answers...')
      });
      
    }
  }

  ngOnDestroy(){
    if(this.readTestsSub) this.readTestsSub.unsubscribe();
    if(this.postSub) this.postSub.unsubscribe();
  }

}

