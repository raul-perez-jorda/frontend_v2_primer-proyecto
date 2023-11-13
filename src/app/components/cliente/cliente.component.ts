import { Component, DoCheck, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../interfaces/cliente';

import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ClienteComponent implements DoCheck {

  clientes: Cliente[] = [];
  clienteSelected: Cliente = {
    id_cli: 0,
    nombre: '',
    email: '',
    user: ''
  };
  displayAddModal = false;
  displayTelefonos = false;
  modo_editar = false;
  id_cliSelected!: number;

  token!: string;
  newToken!: string;
  info_user!: any;
  
  constructor(private clienteService: ClienteService, 
    private authService: AuthService, 
    private messageService: MessageService,
    private loginService: LoginService,
    private router: Router) { }

  ngDoCheck(): void {
    this.newToken = this.loginService.getToken();

    if (this.newToken!==this.token) {
      this.token = this.newToken;

      this.authService.decodeToken(this.token).subscribe(
        response => {
          this.info_user = response;

          this.id_cliSelected = this.info_user.id_cli;
          this.getCliente(this.id_cliSelected);
          this.displayTelefonos=true;

        }
      )
    }

  }

  getCliente(id_cli: number) {
    this.clienteService.getCliente(id_cli).subscribe(
      response => {
        this.clienteSelected = response[0];
      }
    )
  }

  logOut() {
    this.router.navigate(['/login']);
    this.token = '';
    this.loginService.setToken(this.token);
  }

  showTelefonos( id_cli: number ) {
    this.id_cliSelected = id_cli;
    this.displayTelefonos = true;
  }

  editClient( cliente: Cliente ) {
    this.clienteSelected = cliente;
    this.modo_editar = true;
    this.displayAddModal = true;
  }


}
