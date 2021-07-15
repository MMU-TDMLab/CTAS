import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../posts/post.model';
import { Subscription } from 'rxjs';
import { TestService } from '../test.service';
import { testEntry } from '../test.model';

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
 
  private readTestSub: Subscription;
  
  constructor(
    public route: ActivatedRoute,
    public testService: TestService,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('postId');
    
    this.testService.getTests(false, this.id, false);
    this.readTestSub = this.testService.getTestsListener().subscribe((tests:testEntry[])=>{
      this.hardWords = tests.map(el=>el.word);
      this.isLoading = false;
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


}
