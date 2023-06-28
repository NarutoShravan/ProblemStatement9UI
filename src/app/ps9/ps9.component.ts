import { Component } from '@angular/core';
import { AppService } from '../services/app.service';
import {AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  @ViewChild('fileInput')
  myFileInput!: ElementRef;
  file?: File ;

  displayedColumns: string[] = ['documentId', 'fileName', 'creationDate', 'fileURL'];
  dataSource = new MatTableDataSource < FilesData > ;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private appService: AppService,private _snackBar: MatSnackBar) { }

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

  openSnackBar(message: string, type: string) { 
    this._snackBar.open(message, type,{duration: 3000}); 
  }

  // On file Select
  onChange(event: any) {
      this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
    this.myFileInput.nativeElement.value = '';
      this.appService.upload(this.file).subscribe(
        (response: any) => {                           //Next callback
          this.openSnackBar('Successful', '✓');
          this.getFilesData();
        },
        (error: any) => {      
                   //Error callback
         if(error.statusText == 'OK'){
            this.openSnackBar('Successful', '✓');
            this.getFilesData();
          }
          else{
            this.openSnackBar('Failed', 'X');
          }
        }
      );
  }
}
