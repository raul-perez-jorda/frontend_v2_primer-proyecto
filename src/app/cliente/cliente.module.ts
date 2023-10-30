import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ChartModule } from 'primeng/chart';

import { ClienteComponent } from './cliente.component';
import { AddEditClienteModule } from './add-edit-cliente/add-edit-cliente.module';
import { TelefonoModule } from './telefono/telefono.module';
import { EmailComponent } from './email/email.component';

@NgModule({
  declarations: [
    ClienteComponent,
    EmailComponent,
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
    TelefonoModule,
    ChartModule,
    ],
  exports: [
    ClienteComponent,
  ]
})
export class ClienteModule { }
