import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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

  constructor() { }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.datasource = changes['datasource'].currentValue;
    this.gridData = new MatTableDataSource<any>(this.datasource);
    this.gridData.paginator = this.paginator;
    this.colValues = [];
    this.colValues.push('action');
    this.columns = changes['columns'].currentValue;
    this.columns.forEach(column => {
      this.colValues = [...this.colValues, column.colValue]
    });
  }

}
