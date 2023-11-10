import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../interfaces/login';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { Log } from 'src/app/interfaces/log';
import { LogsService } from 'src/app/services/logs.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = this.fb.group({
    user: ['', Validators.required], // Validador de requerido
    password: ['', Validators.required] // Validador de requerido
  });
  

  rolSelected!: number;
  token!: string;
  info_user!: any;
  logDetails!: Log;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService,
    private logsService: LogsService
  ) {  }

  get user() { // Para hacer el codigo mas legible
    return this.loginForm.controls['user'];
  }
  get password() {
    return this.loginForm.controls['password'];
  }

  login() {
    if (this.loginForm.valid) {    
      const formData = {
        user: this.user.value ?? '',
        password: this.password.value
      }

      //Añado la informacion del log
      const fecha_formateada = this.formatDate(new Date())
      this.logDetails = {
        user: formData.user,
        log_valido: false,
        fecha: fecha_formateada
      }

      this.loginService.login(formData).subscribe(
        responseGet => {
          if (responseGet.length !== 0 && responseGet.error ==false) { // Log valido
            
            this.logDetails.log_valido = true;
            console.log(this.logDetails)

            this.logsService.addLog(this.logDetails).subscribe(
              responseLog => {
                console.log('Log satisfactorio añadido correctamente.')

                // Creo el token, lo envio, lo decodifico y lo uso para saber las credenciales del log
                this.token = responseGet.token;
                console.log('Tu token es: ' + this.token);

                this.loginService.setToken(this.token);

                this.authService.decodeToken(this.token).subscribe(
                  response => {
                    this.info_user = response;
                    console.log(this.info_user)
          
                    if(this.info_user.id_rol==1) {
                      this.router.navigate(['/administrador'])
                    }
                    else if (this.info_user.id_rol==2) {
                      this.router.navigate(['/cliente'])
                    }
                  },
                  error => {
                    console.error(error)
                  }
                )            
              }
            )

          } else if (responseGet.error == true) { // Intento inicio de sesión fallido
            console.log('Credenciales no coinciden');

            this.logDetails.log_valido = false;
            console.log(this.logDetails)

            this.logsService.addLog(this.logDetails).subscribe(
              responseLog => {
                console.log('Log erroneo añadido correctamente.')
                this.messageService.add({ severity: 'error', summary: 'Fallo al iniciar sesión'})
              },
              errorLog => {
                console.log('Log erroneo no se ha podido anotar')
              })
          }
        },
        errorGet => {
          console.error(errorGet);
        }
      );
    } else {
      console.log('Formulario no válido. Corrige los errores antes de enviar.');
    }
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Agrega un cero al principio si es necesario
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}
