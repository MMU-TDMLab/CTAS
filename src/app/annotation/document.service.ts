import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { DocWord } from './document-word.model';
import { environment } from '../../environments/environment';

const BACKEND_URL_Document = environment.apiUrl + '/documentWords/';


@Injectable({ providedIn: 'root' })
export class DocService {
  private docWords: DocWord[] = [];
  private docWordUpdate = new Subject<DocWord[]>();

  constructor(private http: HttpClient) {}

  getWords() {
    this.http
      .get<{ message: string; words: any }>(BACKEND_URL_Document)
      .pipe(
        map(wordData => {
          return wordData.words.map(word => {
            return {
              word: word.word,
              annotation: word.annotation,
              document_id: word.document_id
            };
          });
        })
      )
      .subscribe(result => {
        this.docWords = result;
        this.docWordUpdate.next([...this.docWords]);
      });
  }

  getWordUpdateListenerTwo() {
    return this.docWordUpdate.asObservable();
  }

  getWordUpdateListener(): Observable<any> {
    return this.http.get<any>(BACKEND_URL_Document);
  }

  addWord(word: string, annotation: string, document_id: string) {
    const docWord: DocWord = { word: word, annotation: annotation, document_id: document_id };
    return this.http
      .post(BACKEND_URL_Document + '/new-word', docWord)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
  }

  editWord(theWord: string, theAnnotation: string) {
    const anno = {
      annotation: theAnnotation
    };
    this.http
      .put(BACKEND_URL_Document + '/update' + theWord, anno)
      .subscribe(response => {
        const updatedWords = [...this.docWords];
        const oldWordIndex = updatedWords.findIndex(w => w.word === theWord);
        const makeDocWord: DocWord = {
          word: theWord,
          annotation: theAnnotation,
          document_id: null
        };
        updatedWords[oldWordIndex] = makeDocWord;
        this.docWords = updatedWords;
        this.docWordUpdate.next([...this.docWords]);
      });
  }

  deleteWord(deleteWord: string) {
    this.http
      .delete(BACKEND_URL_Document + '/delete-word' + deleteWord)
      .subscribe(() => {
        const result = this.docWords.filter(
          word => word.word !== deleteWord
        );
        this.docWords = result;
        this.docWordUpdate.next([...this.docWords]);
      });
  }
}
