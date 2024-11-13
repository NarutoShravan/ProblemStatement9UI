// import { Component, Input } from '@angular/core';

// @Component({
//   selector: 'app-number-input',
//   templateUrl: './number-input.component.html',
//   styleUrls: ['./number-input.component.css']
// })
// export class NumberInputComponent {
//   @Input()
//   value!: number;

//   @Input()
//   label!: string;

//   increment() {
//     if(!this.value){
//       this.value=0;
//     }
//     this.value++;
//   }

//   decrement() {
//      if(!this.value){
//       this.value=0;
//     }
//     this.value--;
//   }
// }

import { AfterViewInit, ChangeDetectorRef, Component, Input, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PS9Component } from '../ps9/ps9.component';

@Component({
  selector: 'app-number-input',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberInputComponent),
      multi: true
    }
  ],
  templateUrl: './number-input.component.html',
})
export class NumberInputComponent implements ControlValueAccessor, AfterViewInit {

  @ViewChild(PS9Component) ps9Component!: PS9Component;
  form!: FormGroup;
  value!: number;

  @Input()
  label!: string;

  constructor(private formBuilder: FormBuilder,private cdref: ChangeDetectorRef) {
   
  }

  ngAfterViewInit(){
    this.cdref.detectChanges();
    this.form = this.formBuilder.group({
      ps9: this.ps9Component.myForm
    });
  }

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: number): void {
    this.value = value ;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInput(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    const parsedValue = parseInt(inputElement.value, 10);
    if (!isNaN(parsedValue)) {
      this.value = parsedValue;
      this.onChange(parsedValue);
    } else {
      this.value = 0;
      this.onChange(0);
    }
    this.onTouched();
  }

  decrement() {
    this.value--;
    this.onChange(this.value);
    this.onTouched();
  }

  increment() {
    this.value++;
    this.onChange(this.value);
    this.onTouched();
  }

  tooltipContent = `
  First line<br>
  Second line<br>
  Third line
`;

  }

