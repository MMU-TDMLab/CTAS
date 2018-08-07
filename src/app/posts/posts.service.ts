import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { Post } from './post.model';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/posts/';

@Injectable({ providedIn: 'root' })

/**
 * Post Service works with all the posts. There is a Put, Delete, Get and Post query.
 */
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  /**
   * This is the Get query. It requests the backend for all the Posts which include the
   * header, message, post ID, body, references and the poster ID.
   */
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

  /**
   * This is the get updated posts as Observable.
   */
  getPostUpdateListenerTwo() {
    return this.postsUpdated.asObservable();
  }

  /**
   * This gets the posts as an observable with a type (currently set as <any>).
   */
  getPostUpdateListener(): Observable<any> {
    return this.http.get<any>(BACKEND_URL);
}

  /**
   * This returns the post with the ID, header, message, body, reference and
   * the poster, by providing the ID to the post.
   * @param id Gets post by the ID.
   */
  getPost(id: string) {
    return this.http.get<{ _id: string, header: string, message: string, body: string, references: string, poster: string }>(
      BACKEND_URL + id
    );
  }

  /**
   * This is a Post method, you are passing the header, message, body, references and poster.
   * The ID of the post gets done automatically by Mongoose.
   * @param header The header of the post provided by the user when creating the post.
   * @param message The message of the post provided by the user when creating the post.
   * @param body The body of the post provided by the user when creating the post.
   * @param references The reference of the post provided by the user when creating the post.
   * @param poster The poster of the post provided by the user when creating the post.
   */
  addPost(header: string, message: string, body: string, references: string, poster: string) {
    const postData = {
      header: header,
      message: message,
      body: body,
      references: references
    };
    console.log(postData);
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

  // addPost(id: string, header: string, message: string, body: string, references: string, poster: string) {
  //   let postData: Post;
  //   postData = {
  //   id: id,
  //   header: header,
  //   message: message,
  //   body: body,
  //   references: references,
  //   poster: poster
  // };
  //   this.http
  //     .post(BACKEND_URL, postData)
  //     .subscribe(
  //       response => {
  //         console.log(response);
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  // }

  /**
   * This is the Put method, You provide the header, message, body and reference and the ID of
   * the Post and the Poster is not required to be provided since they should not change.
   * @param id ID is automatically provided, this was tweaked in the Show.Post.component
   * @param header The header of the post provided by the user when updating the post.
   * @param message The message of the post provided by the user when updating the post.
   * @param body The body of the post provided by the user when updating the post.
   * @param references The reference of the post provided by the user when updating the post.
   */
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

  /**
   * This is a delete method, you send the ID of the post that you want to delete
   * to the backend.
   * @param postId The ID of the Post that the user wishes to delete.
   */
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
