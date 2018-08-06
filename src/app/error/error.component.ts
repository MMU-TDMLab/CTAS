import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: './error.component.html',
  selector: 'app-error',
})

/**
 * Error Component handles the errors using the Mat_Dialog popup provided by Angular Material.
 */
export class ErrorComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}
