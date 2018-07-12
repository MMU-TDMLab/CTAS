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
      .get<{ word: string; complexWords: any }>('http://localhost:3000/api/words')
      .pipe(
        map(wordData => {
          return wordData.complexWords.map(word => {
            // console.log('word data ', wordData);
            return {
              word: word.word,
              annotation: word.annotation,
            };
          });
        })
      )
      .subscribe(result => {
        this.complexWords = result;
        console.log('the result ', result);
        this.complexWordUpdate.next([...this.complexWords]);
      });
  }

  getWordUpdateListener() {
    return this.complexWordUpdate.asObservable();
  }

  addWord(word: string, annotation: string) {
    const complexWord: ComplexWord = {word: word, annotation: annotation};
    return this.http
      .post('http://localhost:3000/api/words/new-word', complexWord)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      });
  }
}
