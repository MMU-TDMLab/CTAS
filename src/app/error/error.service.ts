import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

/**
 * Error Service will listen to any errors. If it captures any errors it will send them to the error.component.ts.
 * There it will be handled by the Mat_Dialog popup.
 */
export class ErrorService {
  private errorListener = new Subject<string>();

  getErrorListener() {
    return this.errorListener.asObservable();
  }

  /**
   * This will push the error through to the listener which then gets caught by the error.component.ts.
   * @param message This message gets pushed to the error.component.ts so the user can see the issue.
   */
  throwError(message: string) {
    this.errorListener.next(message);
  }

  handleError() {
    this.errorListener.next(null);
  }
}
