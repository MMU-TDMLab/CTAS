import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '../../../node_modules/@angular/material';

@Component({
  templateUrl: './error.component.html'
})

export class ErrorComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}) {}
  // message = 'An unknown error occurred!';
}
