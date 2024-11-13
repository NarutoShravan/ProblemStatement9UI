import { Directive, HostListener, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[appBeforeUnload]'
})
export class BeforeUnloadDirective {
  @Input() formGroup!: FormGroup;

  constructor() { }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: any): void {
    debugger;
    if (this.formGroup && this.formGroup.dirty) {
      const confirmationMessage = 'You have unsaved changes. Are you sure you want to leave?';
      event.preventDefault(); 
      event.returnValue = confirmationMessage; // not working 
      event.isBeforeUnloadEvent = true; // Adding a custom flag to differentiate from the default dialog
    
    }
  }



}
