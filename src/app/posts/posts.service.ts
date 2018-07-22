import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { Post } from './post.model';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/posts/';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>(BACKEND_URL)
      .pipe(
        map(postData => {
          return postData.posts.map(post => {
            return {
              header: post.header,
              message: post.message,
              id: post._id,
              filePath: post.filePath,
              fileText: post.fileText,
              poster: post.poster
            };
          });
        })
      )
      .subscribe(transformedPosts => {
        // console.log(transformedPosts);
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListenerTwo() {
    return this.postsUpdated.asObservable();
  }

  getPostUpdateListener(): Observable<any> {
    return this.http.get<any>(BACKEND_URL);
}

  getPost(id: string) {
    return this.http.get<{ _id: string, header: string, message: string, filePath: string, fileText: string, poster: string }>(
      BACKEND_URL + id
    );
  }

  addPost(header: string, message: string, file: File, fileText: string, poster: string) {
    const postData = new FormData();
    postData.append('header', header);
    postData.append('message', message);
    postData.append('file', file);
    postData.append('fileText', fileText);
    this.http
      .post<{ message: string; post: Post }>(
        BACKEND_URL,
        postData
      )
      .subscribe(responseData => {
        const post: Post = {
          id: responseData.post.id,
          header: header,
          message: message,
          filePath: responseData.post.filePath,
          fileText: fileText,
          poster: poster
        };
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  updatePost(id: string, header: string, message: string, file: File | string, fileText: string) {
    let postData: Post | FormData;
    if (typeof(file) === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('header', header);
      postData.append('message', message);
      postData.append('file', file);
      postData.append('fileText', fileText);
    } else {
        postData = {
        id: id,
        header: header,
        message: message,
        filePath: file,
        fileText: fileText,
        poster: null
      };
    }
    this.http
      .put(BACKEND_URL + id, postData)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
        const post: Post = {
          id: id,
          header: header,
          message: message,
          filePath: '',
          fileText: '',
          poster: null
        };
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: string) {
    this.http
      .delete(BACKEND_URL + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
