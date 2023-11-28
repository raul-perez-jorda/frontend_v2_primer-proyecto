import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';

import { LoginComponent } from './login.component';
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    ReactiveFormsModule,
    RouterModule,
    PasswordModule
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
