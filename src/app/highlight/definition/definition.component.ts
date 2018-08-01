import { Component, ViewChild } from '@angular/core';
import { filter } from 'rxjs/operators';

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
    public service: HighlightService,
  ) {
    this.definition = new FormControl('');

    // Once we receive a word change event, set the current word and the value of the form control
    this.service.wordChange
    // this is used to ignore the subscribe if the word is undefined
    .pipe(filter(word => !!word))
    .subscribe(word => {
      this.word = word;
      // Set the value of the input
      this.definition.setValue(this.service.getDefinitionForWord(this.word));
    });
  }
}
