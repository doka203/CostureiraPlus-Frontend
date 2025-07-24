import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CadastrarPessoaComponent } from './pages/cadastrar-pessoa/cadastrar-pessoa.component';
import { ConsultarPessoasComponent } from './pages/consultar-pessoas/consultar-pessoas.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cadastrar', component: CadastrarPessoaComponent },
  { path: 'cadastrar/:id', component: CadastrarPessoaComponent },
  { path: 'consultar', component: ConsultarPessoasComponent }
];
