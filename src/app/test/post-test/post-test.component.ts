import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { testEntry } from '../test.model';
import { TestService } from '../test.service';

@Component({
  selector: 'app-post-test',
  templateUrl: './post-test.component.html',
  styleUrls: ['./post-test.component.css']
})
export class PostTestComponent implements OnInit, OnDestroy {
  public id:string;
  public isLoading:boolean = true;
  public testEntries:testEntry[];
  private readTestSub:Subscription;
  constructor(
    public route:ActivatedRoute,
    private router: Router,
    public testService: TestService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('postId');
    if(!this.testService.getStuTestDetails()) this.router.navigate(['pre-test', this.id]); //navigate to pre-test if no test details stored

    this.testService.getTests(false, this.id);
    this.readTestSub = this.testService.getTestsListener().subscribe((tests:testEntry[])=>{
      this.isLoading = false;
      this.testEntries = tests;
    });
  }

  ngOnDestroy() {
    if(this.readTestSub)this.readTestSub.unsubscribe();
  }
}
