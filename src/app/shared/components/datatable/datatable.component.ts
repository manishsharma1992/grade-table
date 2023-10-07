import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'offee-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnChanges {
  

  @Input() datasource!: any[];
  @Input() columns!: any[];
  @Input() title: string = "";

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  colValues: any[] = [];
  gridData!: MatTableDataSource<any>;
  gridForm!: FormGroup;

  constructor(public formBuilder: FormBuilder) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.datasource = changes['datasource'].currentValue;
    this.colValues = [];
    this.colValues.push('action');
    this.columns = changes['columns'].currentValue;
    this.columns.forEach(column => {
      this.colValues = [...this.colValues, column.colValue]
    });
    
    this.gridForm = this.formBuilder.group({
      gridRows: this.formBuilder.array(this.datasource.map((ele: any) => this.createGridFormGroup(ele)))
    });
    this.gridData = new MatTableDataSource<any>((this.gridForm.get('gridRows') as FormArray).controls);
    this.gridData.paginator = this.paginator;
  }

  createGridFormGroup(ele: any): any {
    let formGroup: any = {};
    formGroup['action'] = new FormControl('existingRecord');
    formGroup['isEditable'] = new FormControl(true);
    for(const [key, value] of Object.entries(ele)) {
          formGroup[key] = new FormControl(value);
    }
    return this.formBuilder.group(formGroup);
  }

  getGridFormDropdownList(column: any): any[] {
    const colDisplayValue = column.colDisplayValue as string;
    const pipeIdx = colDisplayValue.indexOf('|');
    const dropdownData: number[] = [];
    if(pipeIdx && pipeIdx > -1) {
      const arrayLimit = Number(colDisplayValue.substring(pipeIdx + 1, colDisplayValue.length).trim());
      for(let i = 1; i <= arrayLimit; i++) {
        dropdownData.push(i);
      }
    }
    return dropdownData;
  }

  editGridForm(gridFormElement: any, i: number) {

    // VOFormElement.get('VORows').at(i).get('name').disabled(false)
    gridFormElement.get('gridRows').at(i).get('isEditable').patchValue(false);
    // this.isEditableNew = true;

  }

  // On click of correct button in table (after click on edit) this method will call
  saveGridFrom(gridFormElement: any, i: number) {
    // alert('SaveVO')
    gridFormElement.get('gridRows').at(i).get('isEditable').patchValue(true);
  }

  // On click of cancel button in the table (after click on edit) this method will call and reset the previous data
  cancelGridForm(gridFormElement: any, i: number) {
    gridFormElement.get('gridRows').at(i).get('isEditable').patchValue(true);
  }



}
