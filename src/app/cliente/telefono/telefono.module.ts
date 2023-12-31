import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ChartModule } from 'primeng/chart';

import { TelefonoComponent } from './telefono.component';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    ChartModule
  ],
  exports: [
    
  ]
})
export class TelefonoModule { }
