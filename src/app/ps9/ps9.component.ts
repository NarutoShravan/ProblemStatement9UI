import { Component } from '@angular/core';
import { AppService } from '../services/app.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

 export interface FilesData {
   documentId: number;
   fileName: string;
   creationDate: string;
   fileURL: string;
 }

@Component({
  selector: 'app-ps9',
  templateUrl: './ps9.component.html',
  styleUrls: ['./ps9.component.css']
})



export class PS9Component {
  loading: boolean = false; 
  file?: File ; 

  displayedColumns: string[] = ['documentId', 'fileName', 'creationDate', 'fileURL'];
  dataSource = new MatTableDataSource < FilesData > ;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.getFilesData();
  }

 

  getFilesData() {
    this.appService.getFilesData().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource<FilesData>(data);  //pass the array you want in the table
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      return data
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // On file Select
  onChange(event: any) {
      this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
    debugger;
      this.loading = !this.loading;
      this.appService.upload(this.file).subscribe(
          (event: any) => {
              if (typeof (event) === 'object') {

                  this.loading = false;
              }
          }
      );
  }
}
