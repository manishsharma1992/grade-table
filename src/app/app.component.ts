import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatatableService } from './services/datatable.service';
import { lastValueFrom} from 'rxjs'
import { PeriodicTable } from './models/periodic-table.model';
import { ReusableTable } from './models/resusable-table.model';
import { Employee } from './models/employee.model';

@Component({
  selector: 'offee-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'grade-table';
  datasource: any[] = [];
  datasource1: ReusableTable[] = [];
  columns: any[] = [];
  columns1: any[] = [];

  constructor(public datatableService: DatatableService) {}

  ngOnInit(): void {
    lastValueFrom(this.datatableService.getMarksObtained()).then((response) => {
      this.datasource = response.data as any[];
      this.columns = response.columns;
    });
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
