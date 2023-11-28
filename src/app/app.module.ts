import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteModule } from './pages/cliente/cliente.module';
import { LoginModule } from './pages/login/login.module';
import { LogsComponent } from './pages/logs/logs.component';
import { MeteorologiaComponent } from './pages/meteorologia/meteorologia.component';

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
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TablaMeteoSummaryComponent } from './components/tabla-meteo-summary/tabla-meteo-summary.component';
import { ChartDosDatosComponent } from './components/chart-dos-datos/chart-dos-datos.component';
import { SelectButtonModule } from 'primeng/selectbutton';



@NgModule({
  declarations: [
    AppComponent,
    LogsComponent,
    MeteorologiaComponent,
    TablaMeteoSummaryComponent,
    ChartDosDatosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClienteModule,
    FormsModule,
    ReactiveFormsModule,
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
    ChartModule,
    AutoCompleteModule,
    SelectButtonModule
  ],
  providers: [
    CookieService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
