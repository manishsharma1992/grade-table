import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from './components/datatable/datatable.component';
import { MaterialImportModule } from '../material-import/material-import.module';
import { ReusableTableComponent } from './components/reusable-table/reusable-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';



@NgModule({
  declarations: [
    DatatableComponent,
    ReusableTableComponent
  ],
  imports: [
    CommonModule,
    MaterialImportModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  exports: [
    DatatableComponent,
    ReusableTableComponent  
  ]
})
export class SharedModule { }
