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

  readText(id: string) {
    return this.http.get(BACKEND_URL_Document + id);
  }

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
              _id: word._id,
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
    const docWord: DocWord = {
      word: word,
      annotation: annotation,
      document_id: document_id
    };
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
  
  lookupDef(ct: Object){
    return new Promise((res,rej)=>{ //remove promise logic?
		this.http
		  .post(BACKEND_URL_Document + '/get-definition', ct)
		  .subscribe(
			(response:any) => {
				res(JSON.parse(response.definition).topk)
				//console.log(JSON.parse(response.definition).topk);
			},
			error => {
			  rej(error);
			}
		  );
	});
	  
  }

  /**
   * This is the Put query, this will update the annotation on the given word.
   * @param wordID The word ID you would like to make changes on.
   * @param theAnnotation The annotation that you are changing so the updated annotation.
   */
  editWord(wordID: string, theAnnotation: string) {
    const anno = {
      annotation: theAnnotation
    };
    this.http
      .put(BACKEND_URL_Document + '/update' + wordID, anno)
      .subscribe(response => {
        // const updatedWords = [...this.docWords];
        // const oldWordIndex = updatedWords.findIndex(w => w.word === theWord);
        // const makeDocWord: DocWord = {
        //   word: theWord,
        //   annotation: theAnnotation,
        //   document_id: document_id
        // };
        // updatedWords[oldWordIndex] = makeDocWord;
        // this.docWords = updatedWords;
        // this.docWordUpdate.next([...this.docWords]);
      });
  }

  /**
   * This is the Delete query. It would pass the word ID you would like to remove.
   * @param wordID The word ID you would like to remove will get passed through here.
   */
  deleteWord(wordID: string) {
    this.http
      .delete(BACKEND_URL_Document + '/delete-word' + wordID)
      .subscribe(() => {
        // const result = this.docWords.filter(
        //   theword => theword.word !== word
        // );
        // this.docWords = result;
        // this.docWordUpdate.next([...this.docWords]);
      });
  }

  userActiveDate(date: string, time: string, postId: string) {
    const dates = {
      date: date,
      time: time,
      postId: postId
    };
    return this.http
      .post(BACKEND_URL_Document + 'page-activity', dates)
      .subscribe(
        response => {
          // console.log(response);
        },
        error => {
          // console.log(error);
        }
      );
  }

  annotationClick(word: string, date: string, postId: string) {
    const information = {
      word: word,
      date: date,
      postId: postId
    };
    return this.http
    .post(BACKEND_URL_Document + 'annotation-activity', information)
    .subscribe(
      response => {
        // console.log(response);
      },
      error => {
        // console.log(error);
      }
    );
  }
}
