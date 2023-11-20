import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteModule } from './components/cliente/cliente.module';
import { LoginModule } from './components/login/login.module';
import { LogsComponent } from './components/logs/logs.component';
import { MeteorologiaComponent } from './components/meteorologia/meteorologia.component';

import { CookieService } from "ngx-cookie-service";

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';


@NgModule({
  declarations: [
    AppComponent,
    LogsComponent,
    MeteorologiaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClienteModule,
    FormsModule,
    LoginModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastModule,
    PasswordModule,
    ButtonModule,
    FieldsetModule,
    TableModule,
    DropdownModule,
    CardModule,
    ChartModule
  ],
  providers: [
    CookieService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
