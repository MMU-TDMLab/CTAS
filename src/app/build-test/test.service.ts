import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { testEntry } from './test-edit.model';
import { environment } from '../../environments/environment';

const BACKEND_URL_Document = environment.apiUrl + '/tests/'

@Injectable({ providedIn: 'root' })
export class TestService {

  constructor(private http: HttpClient) { }

  /**
   * This is the Post query, will create a Test Word for to a specific document.
   * @param word The word that you are adding to the database.
   * @param annotation The annotation accociated with the word.
   * @param document_id The document the word/annotation is getting saved too.
   */
   addWord(word: string, annotation: string, document_id: string) {
    const testWord: testEntry = {
      word: word,
      annotation: annotation,
      document_id: document_id
    };
    // console.log(docWord);
    return this.http
      .post(BACKEND_URL_Document + '/new-word', testWord)
      .subscribe(
        response => {
          // console.log(response);
        },
        error => {
          console.log(error);
        }
      );
  }

}
