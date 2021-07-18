import { Component, OnInit, OnDestroy } from '@angular/core';
import { TestService } from '../test.service';
import { ActivatedRoute, Router } from '@angular/router';
import { testEntry } from '../test.model';
import { PostsService } from 'src/app/posts/posts.service';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/posts/post.model';

declare var $: any;


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
  public sentences: string[];
  public focusWord: string = '';
  public contextSentences: string[];
  public focusNumber: number = 0;

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
      this.testEntries = tests //.map((el:testEntry)=>{el.word = el.word.replace(/[)(}{}]/g, ''); return el});
      console.log(tests); ///////////////////get Unique
      //console.log(tests);
    });
    this.postService.getPosts();
    this.postSub = this.postService.getPostUpdateListenerTwo().subscribe((posts:Post[])=>{
      this.posts = posts;
      this.selectedPost = this.posts.find((el:Post)=>el.id===this.id).body;
      this.sentences = this.selectedPost.split(/[.;!?]/); //add more comprehensive parsing
    });
  }

  switchSentence(num:number){
    if(this.contextSentences && ( num === -1 || num === 1 )){
      if(this.focusNumber + num === this.contextSentences.length) this.focusNumber = 0;
      else if(this.focusNumber + num === -1) this.focusNumber = this.contextSentences.length - 1;
      else this.focusNumber += num;
    }
  }

  openModalBox(text:string){
    function escapeRegExp(string:string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }
    this.focusNumber = 0;
    this.focusWord = text;
    this.contextSentences = this.sentences.filter((el:string)=>{
      /*  This is better 
      let re = new RegExp('\\b'+escapeRegExp(this.focusWord)+'\\b', 'ig')
      return re.test(el);
      */
      return el.toLocaleLowerCase().includes(this.focusWord);
    }).map((el:string)=>{
      let re = new RegExp(escapeRegExp(this.focusWord), 'ig')
      return "<q>"+el.replace(re, `<b>${this.focusWord}</b>`).trim()+"</q>"; //sanitise ?
    });
  
	  $("#contextModal").modal('show');
  }

  onSubmit(){
    if(confirm('Are you sure?')){
      this.testEntries.map((el:testEntry)=>{  /////////////////duplicate teacher auto issue CORRECT
                                                ////////////// solution => map answers to words then map and use object to lookup answers forEach word, Also remove none unique text from user form 
        let answerInput =  $(`#input-${el._id}`); 
        if(answerInput) el.answer = answerInput.val().trim();
      });
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
