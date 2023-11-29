import { Component } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../interfaces/cliente';
import { AdministradorModule } from './administrador.module';

import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class AdministradorComponent {
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
  tengo_permiso = false;
  id_cliSelected!: number;

  token!: string;
  newToken !: string;
  info_user !: any;
  
  constructor(private clienteService: ClienteService, 
              private confirmationService: ConfirmationService, 
              private messageService: MessageService,
              private router: Router,
              private authService: AuthService) { }

  ngDoCheck(): void {
    this.newToken = this.authService.getToken();

    if (this.newToken!==this.token) {
      this.token = this.newToken;

      this.authService.decodeToken(this.token).subscribe(
        response => {
          this.info_user = response;

          if(this.info_user.id_rol == 1) {
            this.getClienteList()
            this.tengo_permiso = true;
          }
          else {
            this.tengo_permiso = false;
            this.router.navigate(['/login'])
          }
        }
      )
    }

  }

  getClienteList() {
    this.clienteService.getClientes().subscribe(
      response => {
        this.clientes = response;
      }
    )
  }

  goToLogs() {
    this.router.navigate(['/logs'])
  }

  logOut() {
    this.router.navigate(['/login']);
    this.token = '';
    this.authService.setToken(this.token);
  }

  showAddModal() {
    this.displayAddModal = true;
    this.modo_editar = false;
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddModal = !isClosed;
    this.getClienteList();
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

  deleteClient( id_cli: number ) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Cliente eliminado' });

          this.clienteService.eliminaCliente(id_cli).subscribe(
            responseElimina => {
              console.log(responseElimina);
              this.confirmationService.close();
              this.getClienteList();
            }
          );
      },
      reject: () => {
        this.confirmationService.close();
      }
    });    
  }
}