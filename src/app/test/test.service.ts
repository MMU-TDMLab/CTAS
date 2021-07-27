import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { testEntry, testIdEntry } from './test.model';
import { CTpair } from './test.model';
import { Definition } from './test.model';
import { Prediction } from './test.model';
import { studentTestDetails, Answer } from './test.model';
import { environment } from '../../environments/environment';


const BACKEND_URL_Document = environment.apiUrl + '/tests/'



@Injectable({ providedIn: 'root' })
export class TestService {

  private stuTestDetails:studentTestDetails;

  public definitions:Definition[];
  private progressUpdate = new Subject<boolean>();
  private CTs:CTpair[];

  private testIds:testIdEntry[];
  private testIDUpdate = new Subject<testIdEntry[]>();
  private testsUpdate = new Subject<testEntry[]>();
  private tests:testEntry[];

  constructor(private http: HttpClient) { }

  /**
   * For student user testing, sets which experiment group they're in
   * And stores pre-test details
   */ 
  setStuTestDetails(selectedPreTest:string[], doc_id:string){
    let testGroup:string;
    let randomnum = 2
    switch (randomnum) {
      case 0:
        testGroup = 'control';
        break;
      case 1:
        testGroup = 'teacher';
        break;
      case 2:
        testGroup = 'auto';
        break;
      default:
        throw new Error("Invalid Random Number");
    }
    this.stuTestDetails = {
      testGroup: testGroup,
      selectedWords: selectedPreTest,
      document_id:doc_id
    }
    return true;
  }

  addStuAnswers(answers:Answer[]){
    this.stuTestDetails.answers = answers;
    return this.http.post(BACKEND_URL_Document + '/stu-test', this.stuTestDetails).toPromise();
  }
  getStuTestDetails(){
    return this.stuTestDetails;
  }


  getTests(justIds:boolean = true, doc_id?:string, teacher?:boolean){  //add auth
    function idMap(el:testEntry){
      if(el.answer) return {doc_id:el.document_id, answered:true};
      else return {doc_id:el.document_id, answered:false};
    }

    if(justIds){
      this.http.get<{sucess: boolean; testList: any}>(BACKEND_URL_Document).pipe(
        map(testData=>{             
          return testData.testList.map((el:testEntry)=> idMap(el));
        })
      ).subscribe((testIds:testIdEntry[])=>{
        this.testIds = testIds;
        this.testIDUpdate.next(this.testIds);
      });
    }
    else{
      this.http.get<{sucess: boolean; testList: any}>(BACKEND_URL_Document).pipe(
        map(testData=>{
          if(doc_id && teacher === undefined)return testData.testList.filter((el:testEntry)=> el.document_id === doc_id);
          else if(!doc_id && teacher !== undefined) return testData.testList.filter((el:testEntry)=> el.teacher === teacher);
          else if(doc_id && teacher !== undefined) return testData.testList.filter((el:testEntry)=> el.document_id === doc_id && el.teacher === teacher);
          else return testData.testList
        })
      ).subscribe((testIds:testEntry[])=>{
        this.tests = testIds;
        this.testsUpdate.next(this.tests);
      });
    }
  }

  getTestsListener(){
    return this.testsUpdate.asObservable();
  }

  getTestIDlistener(){
    return this.testIDUpdate.asObservable();
  }

  getProgressListener(){
    return this.progressUpdate.asObservable();
  }
  /*
  private fetchDefinitions(progress:number) {
    this.http.post(BACKEND_URL_Document + 'CT-pairs', this.CTs.shift()).subscribe((res:Prediction) => {
      progress += 1;
      this.progressUpdate.next(progress);
      this.definitions.push({
        'text':res.data.Text,
        'definition':res.data.Prediction
      })
      if(this.CTs.length != 0) this.fetchDefinitions(progress);
      else console.log('COMPLETE!');
    },
    (error:any) => {console.error(error)});
  }
  */

  private fetchDefinitions2(){
    this.http.post(BACKEND_URL_Document + 'CT-pairs2', {CT:this.CTs}).subscribe((res:any) => {
      if(res.success){
        this.definitions = res.definitions;
        this.progressUpdate.next(true);
      }else this.progressUpdate.next(false);
    },
    (error:any) =>{
      this.progressUpdate.next(false);
      console.error(error)
    });
  }

  postCTpairs(CTpairs: CTpair[]){
    this.CTs = [...CTpairs]; 
    this.definitions = [];
    this.fetchDefinitions2();
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
    let annotations:testEntry[] = this.definitions !== undefined ? this.definitions.map(el=>createEntries(el)) : [];
    annotations.push(...t_annotations);
    console.log(annotations);
    
    return this.http.post(BACKEND_URL_Document + '/save-test', annotations).toPromise();
  }

  deleteTest(doc_id:string){
    this.http.delete(BACKEND_URL_Document + doc_id).subscribe(msg=>{
      console.log(msg); //toRemove
      this.testIds = this.testIds.filter((el:testIdEntry)=>el.doc_id!=doc_id);
      this.testIDUpdate.next(this.testIds);
    });
  }

  saveAnswers(entries:testEntry[]){ //add auth
    return this.http.post(BACKEND_URL_Document + '/save-answers', entries).toPromise();
  }
}
