import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';
import { InplaceModule } from 'primeng/inplace';

import { TelefonoComponent } from './telefono.component';

@NgModule({
  declarations: [
    TelefonoComponent,
  ],
  imports: [
    CommonModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    TableModule,
    ChartModule,
    CalendarModule,
    InplaceModule
  ],
  exports: [
    TelefonoComponent
  ]
})
export class TelefonoModule { }
