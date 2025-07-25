import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VisitaService } from '../../services/visita.service';
import { UsuarioService } from '../../services/usuario.service';
import { Visita } from '../../models/visita';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, DatePipe],
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  filtroForm: FormGroup;
  visitaForm: FormGroup;
  visitas: Visita[] = [];
  clientes: Usuario[] = [];

  constructor(
    private fb: FormBuilder,
    private visitaService: VisitaService,
    private usuarioService: UsuarioService
  ) {
    // Formulário para filtrar a agenda por data
    const hoje = new Date();
    const proximaSemana = new Date(hoje.getTime() + 7 * 24 * 60 * 60 * 1000);

    this.filtroForm = this.fb.group({
      dataInicio: [hoje.toISOString().split('T')[0], Validators.required],
      dataFim: [proximaSemana.toISOString().split('T')[0], Validators.required]
    });

    // Formulário para adicionar uma nova visita
    this.visitaForm = this.fb.group({
      idUsuarioCliente: [null, Validators.required],
      descricao: ['', Validators.required],
      data: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.carregarClientes();
    this.onFiltrar(); // Carrega as visitas para o período inicial
  }

  carregarClientes(): void {
    this.usuarioService.listarClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  onFiltrar(): void {
    if (this.filtroForm.valid) {
      const { dataInicio, dataFim } = this.filtroForm.value;
      this.visitaService.getAgendaPorPeriodo(dataInicio, dataFim).subscribe(visitas => {
        this.visitas = visitas;
      });
    }
  }

  onSalvarVisita(): void {
    if (this.visitaForm.invalid) {
      return;
    }

    this.visitaService.salvar(this.visitaForm.value).subscribe(() => {
      alert('Visita agendada com sucesso!');
      this.visitaForm.reset();
      this.onFiltrar(); // Atualiza a lista de visitas
    });
  }
}
