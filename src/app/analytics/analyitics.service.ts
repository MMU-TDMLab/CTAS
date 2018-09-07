import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { Analytics } from './analytics.model';
import { Clicks } from './clicks.model';
import { environment } from '../../environments/environment';

const BACKEND_URL_Analytics = environment.apiUrl + '/analytics';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private analytics: Analytics[] = [];
  private userAnalytics: Clicks[] = [];
  private analyticsUpdate = new Subject<Analytics[]>();
  private userAnalyticsUpdate = new Subject<Clicks[]>();

  constructor(private http: HttpClient) {}

  getAnalytics() {
    this.http
      .get<{ message: string; analytics: any }>(BACKEND_URL_Analytics)
      .pipe(
        map(data => {
          return data.analytics.map(user => {
            return {
              // _id: user._id,
              userId: user.userId,
              visitDate: user.visitDate,
              visitDurationSeconds: user.visitDurationSeconds,
              postId: user.postId
            };
          });
        })
      )
      .subscribe(
        result => {
          this.analytics = result;
          this.analyticsUpdate.next([...this.analytics]);
        },
        error => {
          // console.log(error);
        }
      );
  }

  getClicks() {
    this.http
      .get<{ message: string; users: any }>(
        BACKEND_URL_Analytics + '/user-clicks'
      )
      .pipe(
        map(data => {
          return data.users.map(user => {
            // console.log(user);
            return {
              user
              // _id: user._id,
              // visits: [user.visitCount]
              // visitCount: user.visitCount,
              // _id: user.userId,
              // postId: user.postId
            };
          });
        })
      )
      .subscribe(
        result => {
          this.userAnalytics = result;
          this.userAnalyticsUpdate.next([...this.userAnalytics]);
        },
        error => {
          console.log(error);
        }
      );
  }

  getUserAnalyticsClicks() {
    return this.userAnalyticsUpdate.asObservable();
  }

  /**
   * This gets analytics as observable.
   */
  getWordUpdateListenerTwo() {
    return this.analyticsUpdate.asObservable();
  }
}
