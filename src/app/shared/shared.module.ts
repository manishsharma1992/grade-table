import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from './components/datatable/datatable.component';
import { MaterialImportModule } from '../material-import/material-import.module';
import { ReusableTableComponent } from './components/reusable-table/reusable-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';



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
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }
  ]
})
export class SharedModule { }
