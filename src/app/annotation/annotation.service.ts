import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ComplexWord } from './complex-word.model';

@Injectable({ providedIn: 'root' })
export class AnnotationService {
  private complexWords: ComplexWord[] = [];
  private complexWordUpdate = new Subject<ComplexWord[]>();

  constructor(private http: HttpClient) {}

  getWords() {
    this.http
      .get<{ message: string; words: any }>('http://localhost:3000/api/words')
      .pipe(
        map(wordData => {
          return wordData.words.map(word => {
            // console.log('hello: ', wordData);
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

  // getAnnotation(selectedWord: string) {
  //   return this.http.get<{ _id: string, word: string, annotation: string }>(
  //     'http://localhost:3000/api/words/' + selectedWord
  //   );
  // }

  // getAnnotation(selectedWord: string) {
  //   this.http
  //     .get<{ message: string; words: any }>('http://localhost:3000/api/words')
  //     .pipe(
  //       map(wordData => {
  //         return wordData.words.map(word => {
  //           console.log('ANNOOO: ', wordData);
  //           return {
  //             word: word.word,
  //             annotation: word.annotation
  //           };
  //         });
  //       })
  //     )
  //     .subscribe(result => {
  //       this.complexWords = result;
  //       this.complexWordUpdate.next([...this.complexWords]);
  //     });
  // }

  getWordUpdateListener() {
    return this.complexWordUpdate.asObservable();
  }

  addWord(word: string, annotation: string) {
    const complexWord: ComplexWord = { word: word, annotation: annotation };
    return this.http
      .post('http://localhost:3000/api/words/new-word', complexWord)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
  }
}
