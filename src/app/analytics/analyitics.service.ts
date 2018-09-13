import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { Analytics } from './analytics.model';
import { Clicks } from './clicks.model';
import { AnnotationClick } from './user-annotion.model';
import { environment } from '../../environments/environment';

const BACKEND_URL_Analytics = environment.apiUrl + '/analytics';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private analytics: Analytics[] = [];
  private userAnalytics: Clicks[] = [];
  private userAnnotion: AnnotationClick[] = [];
  private analyticsUpdate = new Subject<Analytics[]>();
  private userAnalyticsUpdate = new Subject<Clicks[]>();
  private userAnnotationUpdate = new Subject<AnnotationClick[]>();

  constructor(private http: HttpClient) {}

  getAnalytics() {
    this.http
      .get<{ message: string; analytics: any }>(BACKEND_URL_Analytics)
      .pipe(
        map(data => {
          return data.analytics.map(user => {
            return {
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
            return {
              user
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

  getAnnotationAnalytics() {
    this.http
      .get<{ message: string; words: any }>(BACKEND_URL_Analytics + '/user-annotation')
      .pipe(
        map(data => {
          return data.words.map(user => {
            return {
              word: user.word,
              userId: user.userId,
              visitDate: user.visitDate,
              postId: user.postId
            };
          });
        })
      )
      .subscribe(
        result => {
          this.userAnnotion = result;
          this.userAnnotationUpdate.next([...this.userAnnotion]);
        },
        error => {
          // console.log(error);
        }
      );
  }

  getUserAnalyticsClicks() {
    return this.userAnalyticsUpdate.asObservable();
  }

  getWordUpdateListenerTwo() {
    return this.analyticsUpdate.asObservable();
  }

  getUserAnnotationClicks() {
    return this.userAnnotationUpdate.asObservable();
  }
}
