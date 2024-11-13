import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

interface TableData {
  name: string;
  age: number;
  description: string;
}

@Component({
  selector: 'app-table-basic-example',
  templateUrl: './table-basic-example.component.html',
  styleUrls: ['./table-basic-example.component.css']
})
export class TableBasicExampleComponent {
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;

  displayedColumns: string[] = ['name', 'age', 'description'];
  dataSource: TableData[] = [
    { name: 'John', age: 30, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { name: 'Jane', age: 25, description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' }
    // Add more data here as needed
  ];
}
