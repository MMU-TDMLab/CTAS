import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { ComplexWord } from './complex-word.model';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/words/';


@Injectable({ providedIn: 'root' })
export class AnnotationService {
  private complexWords: ComplexWord[] = [];
  private complexWordUpdate = new Subject<ComplexWord[]>();

  constructor(private http: HttpClient) {}

  getWords() {
    this.http
      .get<{ message: string; words: any }>(BACKEND_URL)
      .pipe(
        map(wordData => {
          return wordData.words.map(word => {
            return {
              word: word.word,
              annotation: word.annotation
            };
          });
        })
      )
      .subscribe(result => {
        this.complexWords = result;
        this.complexWordUpdate.next([...this.complexWords]);
      });
  }

  getWordUpdateListenerTwo() {
    return this.complexWordUpdate.asObservable();
  }

  getWordUpdateListener(): Observable<any> {
    return this.http.get<any>(BACKEND_URL);
  }

  addWord(word: string, annotation: string) {
    const complexWord: ComplexWord = { word: word, annotation: annotation };
    return this.http
      .post(BACKEND_URL + '/new-word', complexWord)
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
      .put(BACKEND_URL + '/update' + theWord, anno)
      .subscribe(response => {
        const updatedWords = [...this.complexWords];
        const oldWordIndex = updatedWords.findIndex(w => w.word === theWord);
        const makeWord: ComplexWord = {
          word: theWord,
          annotation: theAnnotation
        };
        updatedWords[oldWordIndex] = makeWord;
        this.complexWords = updatedWords;
        this.complexWordUpdate.next([...this.complexWords]);
      });
  }

  deleteWord(deleteWord: string) {
    this.http
      .delete(BACKEND_URL + '/delete-word' + deleteWord)
      .subscribe(() => {
        const result = this.complexWords.filter(
          word => word.word !== deleteWord
        );
        this.complexWords = result;
        this.complexWordUpdate.next([...this.complexWords]);
      });
  }
}
