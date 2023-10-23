import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

import { ClienteComponent } from './cliente.component';
import { TelefonoComponent } from './telefono/telefono.component';
import { AddEditClienteComponent } from './add-edit-cliente/add-edit-cliente.component';
import { AddEditClienteModule } from './add-edit-cliente/add-edit-cliente.module';
import { TelefonoModule } from './telefono/telefono.module';

@NgModule({
  declarations: [
    ClienteComponent,
    TelefonoComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    InputTextModule,
    AddEditClienteModule,
    
  ],
  exports: [
    ClienteComponent,
    TelefonoComponent  ]
})
export class ClienteModule { }
