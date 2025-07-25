import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgxMaskPipe } from 'ngx-mask';
import { PessoaService } from '../../services/pessoa.service';
import { Pessoa } from '../../models/pessoa';

@Component({
  selector: 'app-consultar-pessoas',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxMaskPipe],
  templateUrl: './consultar-pessoas.component.html',
  styleUrls: ['./consultar-pessoas.component.css']
})
export class ConsultarPessoasComponent implements OnInit {

  pessoas: Pessoa[] = [];

  constructor(
    private pessoaService: PessoaService,
    private router: Router
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      if (event.urlAfterRedirects === '/consultar') {
        this.carregarPessoas();
      }
    });
  }

  ngOnInit(): void {
    this.carregarPessoas();
  }

  carregarPessoas(): void {
    this.pessoaService.listarMeusClientes().subscribe(pessoas => {
      this.pessoas = pessoas;
    });
  }

  editarPessoa(pessoa: Pessoa): void {
    this.router.navigate(['/cadastrar', pessoa.id]);
  }

  excluirPessoa(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta pessoa?')) {
      this.pessoaService.excluir(id).subscribe({
         next: () => {
            alert('Cliente excluído com sucesso!');
            this.carregarPessoas();
         },
         error: (err) => alert('Erro ao excluir cliente.')
      });
    }
  }
}
