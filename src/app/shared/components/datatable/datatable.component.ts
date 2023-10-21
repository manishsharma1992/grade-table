import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Dropdown } from 'src/app/models/dropdown.model';

@Component({
  selector: 'offee-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnChanges {
  

  @Input() datastore!: any[];
  @Input() columns!: any[];
  @Input() title: string = "";

  @Output() gridDatastore: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  colValues: any[] = [];
  gridData!: MatTableDataSource<any>;
  gridForm!: FormGroup;
  gridFormValueAt: any;
  simpleChange: SimpleChange = new SimpleChange(null, null, false);

  constructor(public formBuilder: FormBuilder) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.datastore = changes['datastore'].currentValue;
    // this.gridData = new MatTableDataSource<any>(this.datastore);
    this.colValues = [];
    this.colValues.push('action');
    this.columns = changes['columns'].currentValue;
    this.columns.filter(column => (column.isHidden !== true)).forEach(column => {
      this.colValues = [...this.colValues, column.colValue]
    });
    
    this.gridForm = this.formBuilder.group({
      gridRows: this.formBuilder.array(this.datastore.map((ele: any) => this.createGridFormGroup(ele)))
    });
    this.gridData = new MatTableDataSource<any>((this.gridForm.get('gridRows') as FormArray).controls);
    this.gridData.paginator = this.paginator;
    this.gridDatastore.emit(this.gridForm.get('gridRows')?.value)
    
  }

  createGridFormGroup(ele: any): any {
    let formGroup: any = {};
    formGroup['action'] = new FormControl('existingRecord');
    formGroup['isEditable'] = new FormControl(false);
    for(const [key, value] of Object.entries(ele)) {
      formGroup[key] = new FormControl(value);
    }
    return this.formBuilder.group(formGroup);
  }

  getGridFormDropdownList(column: any): any[] {
    const colDisplayValue = column.colDisplayValue as string;
    const pipeIdx = colDisplayValue.indexOf('|');
    const dropdownData: Dropdown[] = [];
    if(pipeIdx && pipeIdx > -1) {
      const arrayLimit = Number(colDisplayValue.substring(pipeIdx + 1, colDisplayValue.length).trim());
      for(let i = 1; i <= arrayLimit; i++) {
        dropdownData.push({viewValue: String(i), value: i});
      }
    }
    return dropdownData;
  }

  editGridForm(gridFormElement: any, i: number) {

    // VOFormElement.get('VORows').at(i).get('name').disabled(false)
    gridFormElement.get('gridRows').at(i).get('isEditable').patchValue(true);
    // this.isEditableNew = true;

  }

  // On click of correct button in table (after click on edit) this method will call
  saveGridFrom(gridFormElement: any, i: number) {
    // alert('SaveVO')
    gridFormElement.get('gridRows').at(i).get('isEditable').patchValue(false);
    this.gridDatastore.emit(this.gridForm.get('gridRows')?.value)
  }

  // On click of cancel button in the table (after click on edit) this method will call and reset the previous data
  cancelGridForm(gridFormElement: any, i: number) {
    gridFormElement.get('gridRows').at(i).get('isEditable').patchValue(false);
  }

  onDropdownChange(value: any, column: any, gridFormElement: any, i: number) {
    if(!this.simpleChange.firstChange) {
      this.simpleChange = {
        previousValue: this.gridFormValueAt = gridFormElement.get('gridRows')?.value[i],
        currentValue: null,
        firstChange: true,
        isFirstChange: () => true
      }
    }
    else {
      let tempPrevValue = this.simpleChange.previousValue;
      this.simpleChange = {
        previousValue: tempPrevValue,
        currentValue: this.gridFormValueAt = gridFormElement.get('gridRows')?.value[i],
        firstChange: false,
        isFirstChange: () => false
      }
    }

    gridFormElement.get('gridRows').at(i).get(column.colValue).patchValue(value);
    if(column.isColValueDependentOn && column.isColValueDependentOn.cols) {
      if(column.dataType === 'boolean' && String(value).trim().toUpperCase() === 'YES') {
        if(Array.isArray(column.isColValueDependentOn.cols)) {
          column.isColValueDependentOn.cols.forEach((ele: any) => {
            gridFormElement.get('gridRows').at(i).get(String(ele)).patchValue(null);
          })
        }
      }
      else if(column.dataType === 'boolean' && String(value).trim().toUpperCase() === 'NO') {
        delete this.simpleChange.previousValue['absent'];
        for(const [key, value] of Object.entries(this.simpleChange.previousValue)) {
          gridFormElement.get('gridRows').at(i).get(String(key)).patchValue(value);
        }
        this.simpleChange = new SimpleChange(null, null, false);
      }
    }
  }

}

