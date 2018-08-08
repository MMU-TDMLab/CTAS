import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { DocWord } from './document-word.model';
import { environment } from '../../environments/environment';

const BACKEND_URL_Document = environment.apiUrl + '/documentWords/';

@Injectable({ providedIn: 'root' })

/**
 * Doc Service retreives all *Document Specific* Words/Annotation/ID from the database. There is the Get,
 * Put, Delete and Post queries.
 */
export class DocService {
  private docWords: DocWord[] = [];
  private docWordUpdate = new Subject<DocWord[]>();

  constructor(private http: HttpClient) {}

  /**
  * This is the Get query. It requests the backend for the words and annotations and document ID.
   */
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

  /**
   * This is a normal get word as observable.
   */
    getWordUpdateListenerTwo() {
    return this.docWordUpdate.asObservable();
  }

  /**
   * This gets the words as an observable with a type <any>.
   */
  getWordUpdateListener(): Observable<any> {
    return this.http.get<any>(BACKEND_URL_Document);
  }

  /**
   * This is the Post query, will create a Doc Word to a specific document.
   * @param word The word that you are adding to the database.
   * @param annotation The annotation accociated with the word.
   * @param document_id The document the word/annotation is getting saved too.
   */
  addWord(word: string, annotation: string, document_id: string) {
    const docWord: DocWord = { word: word, annotation: annotation, document_id: document_id };
    // console.log(docWord);
    return this.http
      .post(BACKEND_URL_Document + '/new-word', docWord)
      .subscribe(
        response => {
          // console.log(response);
        },
        error => {
          console.log(error);
        }
      );
  }

  /**
  * This is the Put query, this will update the annotation on the given word.
   * @param theWord The word you would like to make changes on.
   * @param theAnnotation The annotation that you are changing so the updated annotation.
   * @param document_id The document the annotation is changing on.
   */
  editWord(theWord: string, theAnnotation: string, document_id: string) {
    const anno = {
      annotation: theAnnotation,
      document_id: document_id
    };
    this.http
      .put(BACKEND_URL_Document + '/update' + theWord, anno)
      .subscribe(response => {
        const updatedWords = [...this.docWords];
        const oldWordIndex = updatedWords.findIndex(w => w.word === theWord);
        const makeDocWord: DocWord = {
          word: theWord,
          annotation: theAnnotation,
          document_id: document_id
        };
        updatedWords[oldWordIndex] = makeDocWord;
        this.docWords = updatedWords;
        this.docWordUpdate.next([...this.docWords]);
      });
  }

  /**
   * This is the Delete query. It would pass the word you would like to remove.
   * @param deleteWord The word you would like to remove will get passed through here.
   */
  deleteWord(word: string, annotation: string, document_id: string) {
    const docWord: DocWord = {
      word: word,
      annotation: annotation,
      document_id: document_id
    };
    this.http
    .post(BACKEND_URL_Document + '/delete-word/', docWord)
      .subscribe(() => {
        const result = this.docWords.filter(
          theword => theword.word !== word
        );
        this.docWords = result;
        this.docWordUpdate.next([...this.docWords]);
      });
  }
}
