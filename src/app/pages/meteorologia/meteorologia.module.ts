import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeteorologiaComponent } from './meteorologia.component';
import { ChartDosDatosComponent } from 'src/app/components/chart-dos-datos/chart-dos-datos.component';
import { TablaMeteoSummaryComponent } from 'src/app/components/tabla-meteo-summary/tabla-meteo-summary.component';

import { CardModule } from 'primeng/card';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MeteorologiaComponent,
    ChartDosDatosComponent,
    TablaMeteoSummaryComponent
  ],
  imports: [
    CommonModule,
    SelectButtonModule,
    CardModule,
    AutoCompleteModule,
    ButtonModule,
    ChartModule,
    DropdownModule,
    FormsModule
  ]
})
export class MeteorologiaModule { }
