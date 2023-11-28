import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';

import { RegisterComponent } from './register.component';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    PasswordModule
  ],
  exports: [
    RegisterComponent
  ]
})
export class RegisterModule { }
