import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PessoaService } from '../../services/pessoa.service';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cadastrar-pessoa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './cadastrar-pessoa.component.html',
  styleUrl: './cadastrar-pessoa.component.css'
})
export class CadastrarPessoaComponent {

  formulario: FormGroup;

  constructor(private fb: FormBuilder, private pessoaService: PessoaService, private route: ActivatedRoute, private router: Router) {
    this.formulario = this.fb.group({
      id: [''], // campo opcional para identificar edição
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      endereco: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.pessoaService.buscarPorId(id).subscribe(pessoa => {
        this.formulario.patchValue(pessoa);
      });
    }
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      this.pessoaService.salvar(this.formulario.value).subscribe(() => {
        alert('Pessoa cadastrada com sucesso!');
        this.formulario.reset();
        this.router.navigate(['/consultar']);
      });
    }
  }
}

