import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {
  createPost = true;
  private theModuleName;
  public moduleNameWithoutPunc;

  constructor(public route: ActivatedRoute) {}

  ngOnInit() {
    this.theModuleName = this.route.snapshot.paramMap.get('text');
    const withoutPunct = this.theModuleName.replace(/[.,\/#!$%\^&\*;:{}=\-_`'~()]/g, ' ');
    this.moduleNameWithoutPunc = withoutPunct;
  }
}
