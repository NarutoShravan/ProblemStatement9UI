import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PS9Component } from './ps9/ps9.component';

const routes: Routes = [
  {path:'', component: PS9Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
