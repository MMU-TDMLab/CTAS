import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  /**
   * If a module is clicked, it will then route you to the module page.
   */
  onClickWeb(text) {
    this.router.navigate(['/module', text]);
  }
}
