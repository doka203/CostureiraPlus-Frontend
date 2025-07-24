import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaService } from '../../services/pessoa.service';
import { Pessoa } from '../../models/pessoa';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultar-pessoas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consultar-pessoas.component.html',
  styleUrl: './consultar-pessoas.component.css'
})
export class ConsultarPessoasComponent {
  Pessoas: Pessoa[] = [];

  constructor(private pessoaService: PessoaService, private router: Router) { }

  ngOnInit(): void {
    this.carregarPessoas();
  }

  editarPessoa(Pessoas: Pessoa): void {
    this.router.navigate(['/cadastrar', Pessoas.id]);
  }

  excluirPessoa(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta pessoa?')) {
      this.pessoaService.excluir(id).subscribe(() => {
        alert('Pessoa excluída com sucesso!');
        this.carregarPessoas();
      });
    }
  }

  carregarPessoas(): void {
    this.pessoaService.listar().subscribe(pessoa => {
      this.Pessoas = pessoa;
    });
  }
}
