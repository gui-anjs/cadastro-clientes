import { Routes } from '@angular/router';
import { ListaClientesComponent } from './components/lista-clientes/lista-clientes.component';
import { FormClienteComponent } from './components/form-cliente/form-cliente.component';

export const routes: Routes = [
  { path: '', component: ListaClientesComponent },
  { path: 'cadastro', component: FormClienteComponent },
  { path: 'editar/:id', component: FormClienteComponent }
];