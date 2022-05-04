import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '../core/guards/authentication.guard';
import { RootComponent } from './root/root.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/leads',
    pathMatch: 'full'
  },
  {
    path: '',
    component: RootComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'leads',
        loadChildren: () => import ('./leads/leads.module').then( m => m.LeadsModule)
      },
      {
        path: 'new-lead',
        loadChildren: () => import ('./new-lead/new-lead.module').then( m => m.NewLeadModule)
      },
      {
        path: 'user',
        loadChildren: () => import ('./user/user.module').then( m => m.UserModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
