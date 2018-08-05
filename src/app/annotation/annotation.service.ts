import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { ComplexWord } from './complex-word.model';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/words/';

@Injectable({ providedIn: 'root' })

/**
 * Annotation Service retreives all *Global* Words/Annotation from the database. There is the Get,
 * Put, Delete and Post queries.
 */
export class AnnotationService {
  private complexWords: ComplexWord[] = [];
  private complexWordUpdate = new Subject<ComplexWord[]>();

  constructor(private http: HttpClient) {}

  /**
   * This is the Get query. It requests the backend for the words and annotations.
   */
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

  /**
   * This is a normal get word as observable.
   */
  getWordUpdateListenerTwo() {
    return this.complexWordUpdate.asObservable();
  }

  /**
   * This gets the words as an observable with a type <any>.
   */
  getWordUpdateListener(): Observable<any> {
    return this.http.get<any>(BACKEND_URL);
  }

  /**
   * This is the Post query, will create a Complex Word Globaly.
   * @param word The word that you are adding to the database.
   * @param annotation The annotation associated with the word that you are adding to the database.
   */
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

  /**
   * This is the Put query, this will update the annotation on the given word.
   * @param theWord The word you would like to edit the annotation.
   * @param theAnnotation The annotation that you are editing.
   */
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

  /**
   * This is the Delete query. It would pass the word you would like to remove.
   * @param deleteWord The word you would be passing through to delete.
   */
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
