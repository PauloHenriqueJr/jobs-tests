import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewLeadRoutingModule } from './new-lead-routing.module';
import { NewLeadComponent } from './new-lead.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { NgxMaskModule, IConfig } from 'ngx-mask';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;


@NgModule({
  declarations: [NewLeadComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatListModule,
    MatCardModule,
    MatSnackBarModule,
    NgxMaskModule.forRoot(),
    NewLeadRoutingModule
  ]
})
export class NewLeadModule { }
