import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Analytics } from './analytics.model';
import { AuthService } from '../auth/auth.service';
import { AnalyticsService } from './analyitics.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit, OnDestroy {
  private authStatusSub: Subscription;
  private analyticsSub: Subscription;
  public analytics: Analytics[] = [];
  public analyticInfo = [];
  public userIsAuthenticated: boolean;
  public isLoading: boolean;
  public userId: string;
  public role: string;

  constructor(
    public authService: AuthService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.userIsAuthenticated = false;
    // this.authStatusSub = this.authService.getAuthStatus().subscribe(
    //   authStatus => {
    //     this.isLoading = false;
    //   }
    // );
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatus()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
        this.role = this.authService.getUserRole();
        this.isLoading = false;
      });

    // this.analyticsService.getAnalytics();
    // this.analyticsSub = this.analyticsService
    //   .getWordUpdateListenerTwo()
    //   .subscribe((analyitics: Analytics[]) => {
    //     console.log(analyitics);
    //     this.analyticInfo = analyitics;
    //     this.analyticInfo.push(analyitics);
    //     // this.docWords.map(doc => {
    //       // if (doc.document_id === this.id) {
    //       //   this.docWords.push(doc.word);
    //       // }
    //     // });
    //   });

    this.analyticsService.getAnalytics();
    this.analyticsSub = this.analyticsService
      .getWordUpdateListenerTwo()
      .subscribe((analytics: Analytics[]) => {
        this.analyticInfo = analytics;
        console.log('hello');
      });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
    this.analyticsSub.unsubscribe();
  }
}
