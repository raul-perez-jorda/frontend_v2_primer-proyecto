import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { LogsComponent } from './pages/logs/logs.component';
import { administradorGuard } from './guards/administrador.guard';
import { MeteorologiaComponent } from './pages/meteorologia/meteorologia.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'administrador',
    component: AdministradorComponent,
    canActivate: [administradorGuard] 
  },
  {
    path: 'cliente',
    component: ClienteComponent
  },
  {
    path: 'logs',
    component: LogsComponent
  },
  {
    path: 'meteo',
    component: MeteorologiaComponent
  },
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
