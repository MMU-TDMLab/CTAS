import { Component, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common';

import { HighlightService } from '../highlight.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-definition',
  templateUrl: './definition.component.html',
  styleUrls: ['./definition.component.scss']
})
export class DefinitionComponent {

  word: string;
  definition: FormControl;

  @ViewChild('newDef', { read: HTMLInputElement }) newDef: HTMLInputElement;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    public service: HighlightService,
    private _location: Location
  ) {
    this.router.onSameUrlNavigation = 'reload';

    this.definition = new FormControl('');

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        this.word = this.route.snapshot.params.word;
        this.definition.setValue(this.service.getDefinitionForWord(this.word));
        this.cdRef.detectChanges();
      });
  }
  backClicked() {
    this._location.back();
}
}
