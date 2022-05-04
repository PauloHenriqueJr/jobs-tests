import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { RootModule } from './root/root.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RootModule,
    ModulesRoutingModule
  ]
})
export class ModulesModule { }
