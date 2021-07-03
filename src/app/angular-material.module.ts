import { NgModule } from '@angular/core';
import { MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatExpansionModule, MatProgressSpinnerModule,
  MatPaginatorModule, MatDialogModule, MatProgressBarModule } from '@angular/material';

@NgModule({
  exports: [
    MatDialogModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatProgressBarModule
  ]
})

export class AngularMaterialModule {}

