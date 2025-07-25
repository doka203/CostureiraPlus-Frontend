import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ConsultarPessoasComponent } from './pages/consultar-pessoas/consultar-pessoas.component';
import { CadastrarPessoaComponent } from './pages/cadastrar-pessoa/cadastrar-pessoa.component';
import { ConsultarPedidosComponent } from './pages/consultar-pedidos/consultar-pedidos.component';
import { CadastrarPedidoComponent } from './pages/cadastrar-pedido/cadastrar-pedido.component';
import { DetalhesPedidoComponent } from './pages/detalhes-pedido/detalhes-pedido.component';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { RelatoriosComponent } from './pages/relatorios/relatorios.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

// Importação dos guardiões de rota
import { authGuard } from './core/auth.guard';
import { loginGuard } from './core/login.guard';

export const appSettings = {
  apiBaseUrl: 'https://costureiraplus.onrender.com'
};

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },

  { path: 'home', component: HomeComponent, canActivate: [authGuard] },

  // Rotas de Pessoas
  { path: 'consultar', component: ConsultarPessoasComponent, canActivate: [authGuard] },
  { path: 'cadastrar', component: CadastrarPessoaComponent, canActivate: [authGuard] },
  { path: 'cadastrar/:id', component: CadastrarPessoaComponent, canActivate: [authGuard] },

  // Rotas de Pedidos
  { path: 'consultar-pedidos', component: ConsultarPedidosComponent, canActivate: [authGuard] },
  { path: 'cadastrar-pedido', component: CadastrarPedidoComponent, canActivate: [authGuard] },
  { path: 'cadastrar-pedido/:id', component: CadastrarPedidoComponent, canActivate: [authGuard] },
  { path: 'detalhes-pedido/:id', component: DetalhesPedidoComponent, canActivate: [authGuard] },

  // Outras rotas
  { path: 'agenda', component: AgendaComponent, canActivate: [authGuard] },
  { path: 'relatorios', component: RelatoriosComponent, canActivate: [authGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [authGuard] }
];
