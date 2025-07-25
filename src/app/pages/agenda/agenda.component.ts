import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, formatDate } from '@angular/common';
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
  editandoVisitaId: number | null = null; // Controla se estamos a editar

  constructor(
    private fb: FormBuilder,
    private visitaService: VisitaService,
    private usuarioService: UsuarioService
  ) {
    // Formulário para filtrar a agenda
    const hoje = new Date();
    const proximaSemana = new Date(hoje.getTime() + 7 * 24 * 60 * 60 * 1000);
    this.filtroForm = this.fb.group({
      dataInicio: [hoje.toISOString().split('T')[0], Validators.required],
      dataFim: [proximaSemana.toISOString().split('T')[0], Validators.required]
    });

    // Formulário para adicionar ou editar uma visita
    this.visitaForm = this.fb.group({
      idUsuarioCliente: [null, Validators.required],
      descricao: ['', Validators.required],
      data: ['', Validators.required],
      hora: ['', Validators.required],
      // Campo "escondido" para guardar o ID da costureira durante a edição
      idUsuarioCostureira: [null]
    });
  }

  ngOnInit(): void {
    this.carregarClientes();
    this.onFiltrar();
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

    const visitaParaSalvar: Visita = {
      id: this.editandoVisitaId ?? undefined,
      ...this.visitaForm.value
    };

    this.visitaService.salvar(visitaParaSalvar).subscribe({
      next: () => {
        alert(`Visita ${this.editandoVisitaId ? 'atualizada' : 'agendada'} com sucesso!`);
        this.cancelarEdicao();
        this.onFiltrar(); // Atualiza a lista para mostrar a nova visita ou a alteração
      },
      error: (err) => {
        console.error('Erro ao salvar visita:', err);
        alert(err.error?.message || 'Não foi possível salvar a visita.');
      }
    });
  }

  editarVisita(visita: Visita): void {
    this.editandoVisitaId = visita.id ?? null;
    this.visitaForm.patchValue({
      ...visita, // Preenche todos os campos correspondentes, incluindo idUsuarioCostureira
      data: formatDate(visita.data, 'yyyy-MM-dd', 'en-US') // Formata a data para o input
    });
    window.scrollTo(0, 0); // Rola a página para o topo para que o utilizador veja o formulário preenchido
  }

  cancelarEdicao(): void {
    this.editandoVisitaId = null;
    this.visitaForm.reset(); // Limpa o formulário
  }

  excluirVisita(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta visita?')) {
      this.visitaService.excluir(id).subscribe({
        next: () => {
          alert('Visita excluída com sucesso!');
          this.onFiltrar(); // Atualiza a lista
        },
        error: (err) => {
          console.error('Erro ao excluir visita:', err);
          alert(err.error?.message || 'Não foi possível excluir a visita.');
        }
      });
    }
  }
}
