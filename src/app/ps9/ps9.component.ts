import { Component, HostListener, Input ,OnDestroy} from '@angular/core';
import { AppService } from '../services/app.service';
import {AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import {NumberInputComponent} from '../number-input/number-input.component'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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



export class PS9Component implements OnDestroy{
  loading: boolean = false; 
  @ViewChild('fileInput',{static: false}) 
  myFileInput!: ElementRef;
  file?: File ;

  myValue!:number;

  myForm: FormGroup = new FormGroup({});


  displayedColumns: string[] = ['documentId', 'fileName', 'creationDate', 'fileURL'];
  dataSource = new MatTableDataSource < FilesData > ;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  myBoolean: any;

  constructor(private _formBuilder: FormBuilder, private appService: AppService,private _snackBar: MatSnackBar) { }

  @Input() formData: any; 
  ngOnInit(): void {
    this.getFilesData();
    this.myForm = this._formBuilder.group({
     // myCustomNumberControl:['',Validators.required]
     field1:['',Validators.required],
     field2:['',Validators.required]
    });

    // if (this.isFormDirty()) {
    //   const confirmLeave = confirm('You have unsaved changes. Are you sure you want to leave?');
    //   if (!confirmLeave) {
    //    // this.onFormDataChanged.emit(true); // Notify the parent component of unsaved changes
    //     return;
    //   }
    // }
     //   window.addEventListener('beforeunload', this.check, false);
  }


//   check(event:any) {
//     event.preventDefault();
//     const isDirty = this.myForm.dirty;
//     if(isDirty){

//       event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
//     }
//     return event;
// }


// @HostListener('window:beforeunload', ['$event'])
// confirmLeavingPageBeforeSaving($event:any) {
//   if(this.myForm.dirty){
//     $event.returnValue='Your data will be lost!';
//   } 
// }
// @HostListener('window:beforeunload')
// confirmLeavingPageBeforeSaving(): boolean {
//   // if 0 display dialog
//   // if 1 you can reload
//   return !this.myBoolean; 
// }
  ngOnDestroy(): void {
    // if (this.isFormDirty()) {
    //   const confirmLeave = confirm('You have unsaved changes. Are you sure you want to leave?');
    //   if (!confirmLeave) {
    //    // this.onFormDataChanged.emit(true); // Notify the parent component of unsaved changes
    //     return;
    //   }
    // }
  //  window.addEventListener('beforeunload', this.check, false);

   // this.onFormDataChanged.emit(false);
  }

  

  isFormDirty(): boolean {
    // Check if the form has unsaved changes and return true if so
    // For simplicity, let's assume it's dirty if any field has a non-empty value
    const isDirty = Object.values(this.myForm).some((value: any) => value !== '');

    if (isDirty) {
      // Show a popup to the user
      return confirm('You have unsaved changes. Are you sure you want to leave?');
    }

    return false;
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
    if(this.myFileInput.nativeElement.value != '' ){
      this.myFileInput.nativeElement.value = '';
      this.appService.upload(this.file).subscribe(
        (response: any) => {                           //Next callback
          this.openSnackBar('File Uploaded Successful', '✓');
          this.getFilesData();
        },
        (error: any) => {      
                   //Error callback
         if(error.statusText == 'OK'){
            this.openSnackBar('File Uploaded Successful', '✓');
            this.getFilesData();
          }
          else{
            this.openSnackBar('File Upload Failed', 'X');
          }
        }
      );
    } 
  }
}
