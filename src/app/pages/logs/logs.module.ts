import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { LogsComponent } from './logs.component';

@NgModule({
  declarations: [
    LogsComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,

  ]
})
export class LogsModule { }
