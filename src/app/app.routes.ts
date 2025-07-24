import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CadastrarPessoaComponent } from './pages/cadastrar-pessoa/cadastrar-pessoa.component';
import { ConsultarPessoasComponent } from './pages/consultar-pessoas/consultar-pessoas.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './core/auth.guard'; // Importe o guardião

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  // Rotas protegidas
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'cadastrar', component: CadastrarPessoaComponent, canActivate: [authGuard] },
  { path: 'cadastrar/:id', component: CadastrarPessoaComponent, canActivate: [authGuard] },
  { path: 'consultar', component: ConsultarPessoasComponent, canActivate: [authGuard] }
];
