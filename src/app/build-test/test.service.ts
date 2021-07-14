import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { testEntry } from './test-edit.model';
import { CTpair } from './test-edit.model';
import { Definition } from './test-edit.model';
import { Prediction } from './test-edit.model';
import { environment } from '../../environments/environment';
import { BuildTestComponent } from './build-test.component';

const BACKEND_URL_Document = environment.apiUrl + '/tests/'


@Injectable({ providedIn: 'root' })
export class TestService {

  public definitions:Definition[];
  private progressUpdate = new Subject<number>();
  private CTs:CTpair[];

  private testIds:string[];
  private testIDUpdate = new Subject<string[]>();

  constructor(private http: HttpClient) { }

  getTestIDs(){
    this.http.get<{sucess: boolean; testList: any}>(BACKEND_URL_Document).pipe(
      map(testData=>{
        return testData.testList.map((el:testEntry)=> el.document_id);
      })
    ).subscribe((testIds:string[])=>{
      this.testIds = testIds;
      this.testIDUpdate.next(this.testIds);
    });
  }

  getTestIDlistener(){
    return this.testIDUpdate.asObservable();
  }

  getProgressListener(){
    return this.progressUpdate.asObservable();
  }

  private fetchDefinitions(progress:number) {
    this.http.post(BACKEND_URL_Document + 'CT-pairs', this.CTs.shift()).subscribe((res:Prediction) => {
      progress += 1;
      this.progressUpdate.next(progress);
      this.definitions.push({
        'text':res.data.Text,
        'definition':res.data.Prediction
      })
      if(this.CTs.length != 0) this.fetchDefinitions(progress);
      else console.log('COMPLETE!')
    },
    (error:any) => {console.error(error)});
  }

  postCTpairs(CTpairs: CTpair[]){
    let progress:number = 0;
    this.definitions = [];
    this.CTs = [...CTpairs]; //Copy the array as to not change reference array
    this.fetchDefinitions(progress);
  }

  saveTest(doc_id:string, t_annotations:testEntry[]){
    function createEntries(def:Definition){
      let entry:testEntry = {
        teacher:false,
        word: def.text,
        annotation:def.definition,
        document_id:doc_id
      }
      return entry
    }
    let annotations:testEntry[] = this.definitions.map(el=>createEntries(el))
    annotations.push(...t_annotations);
    this.http.post(BACKEND_URL_Document + '/save-test', annotations).subscribe((res:any) => {
      console.log(res)
    },
    (error:any) => {console.error(error)});
  }

  deleteTest(doc_id:string){
    this.http.delete(BACKEND_URL_Document + doc_id).subscribe(msg=>{
      console.log(msg); //toRemove
      this.testIds = this.testIds.filter((el:string)=>el!=doc_id);
      this.testIDUpdate.next(this.testIds);
    });
  }

}
