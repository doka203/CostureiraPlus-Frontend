import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CadastrarPessoaComponent } from './pages/cadastrar-pessoa/cadastrar-pessoa.component';
import { ConsultarPessoasComponent } from './pages/consultar-pessoas/consultar-pessoas.component';
import { ConsultarPedidosComponent } from './pages/consultar-pedidos/consultar-pedidos.component';
import { CadastrarPedidoComponent } from './pages/cadastrar-pedido/cadastrar-pedido.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  
  // Rotas de Pessoas
  { path: 'cadastrar', component: CadastrarPessoaComponent, canActivate: [authGuard] },
  { path: 'cadastrar/:id', component: CadastrarPessoaComponent, canActivate: [authGuard] },
  { path: 'consultar', component: ConsultarPessoasComponent, canActivate: [authGuard] },

  // Rotas de Pedidos
  { path: 'cadastrar-pedido', component: CadastrarPedidoComponent, canActivate: [authGuard] },
  { path: 'cadastrar-pedido/:id', component: CadastrarPedidoComponent, canActivate: [authGuard] },
  { path: 'consultar-pedidos', component: ConsultarPedidosComponent, canActivate: [authGuard] }
];
