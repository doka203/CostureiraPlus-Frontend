import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PessoaService } from '../../services/pessoa.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-pessoa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastrar-pessoa.component.html',
  styleUrls: ['./cadastrar-pessoa.component.css']
})
export class CadastrarPessoaComponent implements OnInit {

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
      cpf: ['', Validators.required],
      endereco: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pessoaService.buscarPorId(Number(id)).subscribe(pessoa => {
        this.formulario.patchValue(pessoa);
      });
    }
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      this.pessoaService.salvar(this.formulario.value).subscribe(() => {
        alert('Pessoa salva com sucesso!');
        this.router.navigate(['/consultar']);
      });
    }
  }
}
