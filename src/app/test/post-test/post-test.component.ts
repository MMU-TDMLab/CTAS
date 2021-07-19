import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { testEntry, Answer } from '../test.model';
import { TestService } from '../test.service';
import { Post } from 'src/app/posts/post.model';
import { PostsService } from '../../posts/posts.service';
import { TestAnswersComponent } from '../test-answers/test-answers.component'
import { error } from 'protractor';

declare var $:any;
/**
 * Taken From coolaj86 - https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array?page=1&tab=votes#tab-top
 * Fisher-Yates shuffle
 */
function shuffle(array:any[]) {
  var currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

@Component({
  selector: 'app-post-test',
  templateUrl: './post-test.component.html',
  styleUrls: ['./post-test.component.css']
})
export class PostTestComponent implements OnInit, OnDestroy {
  public id:string;
  public isLoading:boolean = true;
  public words:string[];
  public answers:string[];
  public testEntries:testEntry[];
  public selectedPost: string;
  public sentences: string[];
  public currentWord:number=0;
  public answerEntries: Answer[] = [];
  public isFinished:boolean = false;
  public shuffleDefs:boolean = false;

  private readTestSub:Subscription;
  private readPostSub:Subscription;
  constructor(
    public route:ActivatedRoute,
    private router: Router,
    public postsService: PostsService,
    public testService: TestService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('postId');
    if(!this.testService.getStuTestDetails()) this.router.navigate(['pre-test', this.id]); //navigate to pre-test if no test details stored
    
    this.testService.getTests(false, this.id);
    this.readTestSub = this.testService.getTestsListener().subscribe((tests:testEntry[])=>{
      this.testEntries = tests;
      this.words = shuffle(Array.from(
        new Set(this.testEntries.map((entry:testEntry)=>entry.word))
      ));
      this.answers = shuffle(Array.from(
        new Set(this.testEntries.map((entry:testEntry)=>entry.answer))
      ));
      console.log(this.answers);
      this.isLoading = false;
    });

    this.postsService.getPosts();
    this.readPostSub = this.postsService.getPostUpdateListenerTwo().subscribe((posts:Post[])=>{
      this.selectedPost = posts.find((el:Post)=>el.id===this.id).body;
      this.sentences = this.selectedPost.split(/[.;!?]/); //add more comprehensive parsing
    });
  }

  addSelection(selection:string){
    if(!this.isFinished){
      let target = this.testEntries.find((el:testEntry)=>el.word===this.words[this.currentWord])
      if(!target) throw new Error("Unable to find word in test entries!");
      else{
        if(target.answer === selection){
          this.answerEntries.push({
            word:this.words[this.currentWord],
            selection:selection,
            isCorrect:true,
            correctAnswer:target.answer
          });
        }
        else{
          this.answerEntries.push({
            word:this.words[this.currentWord],
            selection:selection,
            isCorrect:false,
            correctAnswer:target.answer
          });
        }

        if(this.currentWord<this.words.length-1)this.currentWord++;
        else this.isFinished = true;
      }
    }
  }

  switchSentence = TestAnswersComponent.prototype.switchSentence;
  openModalBox = TestAnswersComponent.prototype.openModalBox;

  submitTest(){
    console.log(this.testService.getStuTestDetails());
    this.testService.addStuAnswers(this.answerEntries).then(rslt=>{
      console.log(rslt);
      this.router.navigate(['module', 'First Year Seminar']);
    }).catch(error=>{
      console.error(error);
      alert('Unable to save test!')
    });
    
  }

  answerSelect(definition:string){
    if(!this.isFinished){
      this.addSelection(definition);
      if(this.shuffleDefs){
        let randomSequence = shuffle(Array.from(Array(this.answers.length).keys()));
        let answersCopy = Array.from(this.answers);
        shuffle(Array.from(Array(this.answers.length).keys())).forEach((i:number)=>{
          this.answers[i] = answersCopy[randomSequence[i]]; 
        });
      }
    }
  }

  ngOnDestroy() {
    if(this.readTestSub)this.readTestSub.unsubscribe();
    if(this.readPostSub)this.readPostSub.unsubscribe();
  }
}
