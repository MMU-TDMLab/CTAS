import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {
  createPost = true;

  // constructor(router: Router) {
  //   router.events.subscribe(val => {
  //     // see also
  //     this.createPost = false;
  //     console.log(val instanceof NavigationEnd);
  //   });
  // }

  ngOnInit() {}

  // editPost() {

  // }

  // btnCreatePost() {
  //   if (this.createPost === false) {
  //     this.createPost = true;
  //   } else {
  //     this.createPost = false;
  //   }
  // }
}
