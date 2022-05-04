import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewLeadComponent } from './new-lead.component';


const routes: Routes = [
  {
    path: '',
    component: NewLeadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewLeadRoutingModule { }
