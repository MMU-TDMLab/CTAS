import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { Analytics } from './analytics.model';
import { environment } from '../../environments/environment';

const BACKEND_URL_Analytics = environment.apiUrl + '/analytics';

@Injectable({ providedIn: 'root' })


export class AnalyticsService {
  private analytics: Analytics[] = [];
  private analyticsUpdate = new Subject<Analytics[]>();

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
      .subscribe(result => {
        this.analytics = result;
        this.analyticsUpdate.next([...this.analytics]);
      });
  }

  // getAnalytics() {
  //   // tslint:disable-next-line:max-line-length
  //   return this.http.get<{ _id: string, userId: string, visitDate: string, visitDurationSeconds: string, postId: string }>(
  //     BACKEND_URL_Analytics
  //   );
  // }

  /**
   * This is a normal get word as observable.
   */
  getWordUpdateListenerTwo() {
    return this.analyticsUpdate.asObservable();
  }

  /**
   * This gets the words as an observable with a type <any>.
   */
  getWordUpdateListener(): Observable<any> {
    return this.http.get<any>(BACKEND_URL_Analytics);
  }
}
