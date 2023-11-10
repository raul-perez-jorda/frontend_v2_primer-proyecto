import { Component } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../interfaces/cliente';
import { AdministradorModule } from './administrador.module';

import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

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

  };
  displayAddModal = false;
  displayTelefonos = false;
  modo_editar = false;
  id_cliSelected!: number;

  token!: any;
  
  constructor(private clienteService: ClienteService, 
              private confirmationService: ConfirmationService, 
              private messageService: MessageService,
              private router: Router,
              private loginService: LoginService) { }

  ngOnInit(): void {
    this.getClienteList();

  }

  getClienteList() {
    this.clienteService.getClientes().subscribe(
      response => {
        this.clientes = response;
      }
    )
  }

  logOut() {
    this.router.navigate(['/login']);
    this.token = undefined;
    this.loginService.setToken(this.token);
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
