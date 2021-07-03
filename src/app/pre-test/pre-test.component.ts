import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../posts/post.model';
import { PostsService } from '../posts/posts.service';
import { DocService } from '../annotation/document.service';
import { Subscription } from 'rxjs';
import { data } from 'jquery';

@Component({
  selector: 'app-pre-test',
  templateUrl: './pre-test.component.html',
  styleUrls: ['./pre-test.component.css']
})

export class PreTestComponent implements OnInit, OnDestroy {
  public isLoading = true;
  public id: string;
  public posts: Post[] = [];
  public selectedPost: Post;
  public hardWords = [];
  public selectedWords = [];
  private postsSub: Subscription;
  private readTextSub: Subscription;
  
  constructor(
    public route: ActivatedRoute,
    public postsService: PostsService,
    private docService: DocService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('postId');
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListenerTwo().subscribe((posts: Post[])=>{
      this.posts = posts;
      this.posts.map(post=>{
        if(post.id == this.id) this.selectedPost = post;
      });
    });
    this.complexWords();
  }
  wordSelect(word:string){
    if(this.selectedWords.includes(word)) this.selectedWords.splice(this.selectedWords.indexOf(word),1);
    else this.selectedWords.push(word);
  }

  complexWords(){
    this.readTextSub = this.docService.readText(this.id).subscribe(data=>{
      this.hardWords = data[1]; //0:beginner 1:intermediate 2:hard
      this.isLoading = false;
      //console.log(this.hardWords);
    });
  }

  submitWords(){
    console.log(this.selectedWords);
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
    if(this.hardWords) this.readTextSub.unsubscribe();
  }


}
