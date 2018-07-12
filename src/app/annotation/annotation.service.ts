import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Subject } from 'rxjs';
// import { map } from 'rxjs/operators';

import { ComplexWord } from './complex-word.model';

@Injectable({ providedIn: 'root' })
export class AnnotationService {
  // private complexWords: ComplexWord[] = [];
  // private complexWordUpdate = new Subject<ComplexWord[]>();

  constructor(private http: HttpClient) {}

  // addWord(word: string, annotation: string) {
  //   const wordWithDetail = new FormData();
  //   wordWithDetail.append('complexWord', word);
  //   wordWithDetail.append('annotation', annotation);
  //   this.http
  //     .post<{ word: string; complexWords: ComplexWord }>(
  //       'http://localhost:3000/api/complexWords',
  //       wordWithDetail
  //     )
  //     .subscribe(responseData => {
  //       const complexWord: ComplexWord = {
  //         id: responseData.complexWord.id,
  //         complexWord: complexWord,
  //         annotation: annotation
  //       };
  //       this.complexWords.push(complexWord);
  //       this.complexWordUpdate.next([...this.complexWords]);
  //     });
  // }

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
