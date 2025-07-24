import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaService } from '../../services/pessoa.service';
import { Pessoa } from '../../models/pessoa';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-consultar-pessoas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './consultar-pessoas.component.html',
  styleUrls: ['./consultar-pessoas.component.css']
})
export class ConsultarPessoasComponent implements OnInit {
  pessoas: Pessoa[] = [];

  constructor(private pessoaService: PessoaService, private router: Router) { }

  ngOnInit(): void {
    this.carregarPessoas();
  }

  carregarPessoas(): void {
    this.pessoaService.listar().subscribe(pessoas => {
      this.pessoas = pessoas;
    });
  }

  editarPessoa(pessoa: Pessoa): void {
    this.router.navigate(['/cadastrar', pessoa.id]);
  }

  excluirPessoa(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta pessoa?')) {
      this.pessoaService.excluir(id).subscribe(() => {
        alert('Pessoa excluída com sucesso!');
        this.carregarPessoas();
      });
    }
  }
}
