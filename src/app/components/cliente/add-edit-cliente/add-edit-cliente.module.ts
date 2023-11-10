import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { AddEditClienteComponent } from './add-edit-cliente.component';

@NgModule({
  declarations: [
    AddEditClienteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    BrowserAnimationsModule,
    InputTextModule,
    DialogModule
  ],
  exports: [
    AddEditClienteComponent
  ]
})
export class AddEditClienteModule { }
