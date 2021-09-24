import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Mat Modules
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

const matModules = [
  MatButtonModule,
  MatSlideToggleModule,
  MatInputModule,
  MatTableModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatGridListModule,
  MatTabsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatIconModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...matModules,
  ],
  exports: [
    MatMomentDateModule,
    ...matModules,
  ],
  providers:[
  ]
})
export class SharedModule { }
