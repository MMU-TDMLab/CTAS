import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Analytics } from './analytics.model';
import { Clicks } from './clicks.model';
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
  private userClicksSub: Subscription;
  public analytics: Analytics[] = [];
  public userClicks: Clicks[] = [];
  public userIsAuthenticated: boolean;
  public isLoading: boolean;
  public role: string;

  constructor(
    public authService: AuthService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.userIsAuthenticated = false;
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatus()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        // this.userId = this.authService.getUserId();
        this.role = this.authService.getUserRole();
        this.isLoading = false;
      });

    this.analyticsService.getAnalytics();
    this.analyticsSub = this.analyticsService
      .getWordUpdateListenerTwo()
      .subscribe((analytics: Analytics[]) => {
        this.analytics = analytics;
      });

    this.analyticsService.getClicks();
    this.userClicksSub = this.analyticsService
      .getUserAnalyticsClicks()
      .subscribe((userClicks: Clicks[]) => {
        this.userClicks = userClicks;
        console.log(this.userClicks);
      });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
    this.analyticsSub.unsubscribe();
    this.userClicksSub.unsubscribe();
  }
}
