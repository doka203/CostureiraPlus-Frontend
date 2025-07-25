import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PessoaService } from '../../services/pessoa.service';
import { NgxMaskDirective } from 'ngx-mask';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cadastrar-pessoa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NgxMaskDirective],
  templateUrl: './cadastrar-pessoa.component.html',
  styleUrl: './cadastrar-pessoa.component.css'
})
export class CadastrarPessoaComponent {

  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pessoaService: PessoaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      telefone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      endereco: ['', Validators.required]
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

  get nome() { return this.formulario.get('nome'); }
  get cpf() { return this.formulario.get('cpf'); }
  get telefone() { return this.formulario.get('telefone'); }
  get email() { return this.formulario.get('email'); }
  get endereco() { return this.formulario.get('endereco'); }
}

