import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppModule } from 'src/app/app.module';

import { RegisterModule } from './register.module';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { passwordMatchValidator } from 'src/app/shared/password-match.directive';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/auth';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  registerForm = this.fb.group({
    nombre: ['',[Validators.required]],
    email: [''],
    user: ['', Validators.required], // Validador de requerido
    password: ['', Validators.required], // Validador de requerido
    confirmPassword: ['', Validators.required],
    id_rol:[0]
  }, {
    validators: passwordMatchValidator
  })

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private messageService: MessageService,
              private router: Router) {}

  get nombre() {
    return this.registerForm.controls['nombre'];
  }
  get email() {
    return this.registerForm.controls['email'];
  }
  get user() { // Para hacer el codigo mas legible
    return this.registerForm.controls['user'];
  }
  get password() {
    return this.registerForm.controls['password'];
  } 
  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  submitDetails() {
    const postData = { ...this.registerForm.value };
    postData.id_rol = 2; //asumimos que entra como cliente
    delete postData.confirmPassword;
    console.log(postData)
    this.authService.registerUser(postData as User).subscribe(
      response => {
        console.log(response)
        this.messageService.add({ severity: 'success', summary: 'Usuario añadido'})
        this.router.navigate(['/login'])
      },
      error => {
        console.error(error)
        this.messageService.add({ severity: 'error', summary: 'Fallo al añadir usuario'})
      }
    )
  }
}
