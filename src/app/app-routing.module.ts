import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PS9Component } from './ps9/ps9.component';
import { TableBasicExampleComponent } from './table-basic-example/table-basic-example.component';
import { NumberInputComponent } from './number-input/number-input.component';

const routes: Routes = [
  {path:'', component: PS9Component},
  {path:'table-basic',component:TableBasicExampleComponent},
  {path:'input',component:NumberInputComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
