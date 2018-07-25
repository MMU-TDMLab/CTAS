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
              body: post.body,
              references: post.references,
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
    return this.http.get<{ _id: string, header: string, message: string, body: string, references: string, poster: string }>(
      BACKEND_URL + id
    );
  }

  addPost(header: string, message: string, body: string, references: string, poster: string) {
    const postData = new FormData();
    postData.append('header', header);
    postData.append('message', message);
    postData.append('body', body);
    postData.append('references', references);
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
          body: body,
          references: references,
          poster: poster
        };
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  updatePost(id: string, header: string, message: string, body: string, references: string) {
    let postData: Post;
        postData = {
        id: id,
        header: header,
        message: message,
        body: body,
        references: references,
        poster: null
      };
    this.http
      .put(BACKEND_URL + id, postData)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
        const post: Post = {
          id: id,
          header: header,
          message: message,
          body: body,
          references: references,
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
