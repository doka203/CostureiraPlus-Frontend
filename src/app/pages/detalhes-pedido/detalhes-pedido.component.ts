import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PedidoService } from '../../services/pedido.service';
import { LembreteService } from '../../services/lembrete.service';
import { Pedido } from '../../models/pedido';
import { Lembrete } from '../../models/lembrete';
import { Pagamento } from '../../models/pagamento';
import { PagamentoService } from '../../services/pagamento.service';

@Component({
  selector: 'app-detalhes-pedido',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe, CurrencyPipe, ReactiveFormsModule],
  templateUrl: './detalhes-pedido.component.html',
  styleUrls: ['./detalhes-pedido.component.css']
})
export class DetalhesPedidoComponent implements OnInit {
  pedido: Pedido | null = null;
  lembretes: Lembrete[] = [];
  pagamentos: Pagamento[] = [];
  pedidoId: number = 0;
  lembreteForm: FormGroup;
  editandoLembreteStatusId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private pedidoService: PedidoService,
    private lembreteService: LembreteService,
    private pagamentoService: PagamentoService,
    private fb: FormBuilder
  ) {
    this.lembreteForm = this.fb.group({
      descricao: ['', Validators.required],
      data: ['', Validators.required],
      hora: ['', Validators.required],
      status: ['PENDENTE', Validators.required]
    });
  }

  ngOnInit(): void {
    // Captura o ID da rota
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.pedidoId = +idParam; // O '+' converte a string para número
      this.carregarDetalhesPedido();
    }
  }

  carregarDetalhesPedido(): void {
    // Busca os dados do pedido principal
    this.pedidoService.buscarPorId(this.pedidoId).subscribe(pedido => {
      this.pedido = pedido;
    });

    this.carregarLembretes();
    this.carregarPagamentos();
  }

   carregarLembretes(): void {
    this.pedidoService.getLembretesPorPedido(this.pedidoId).subscribe(lembretes => {
      this.lembretes = lembretes;
    });
  }

  onSubmitLembrete(): void {
    if (this.lembreteForm.invalid) {
      return;
    }

    const novoLembrete: Lembrete = {
      ...this.lembreteForm.value,
      idPedido: this.pedidoId
    };

    this.lembreteService.salvar(novoLembrete).subscribe(() => {
      alert('Lembrete adicionado com sucesso!');
      this.lembreteForm.reset({ status: 'PENDENTE' }); // Limpa o formulário
      this.carregarLembretes(); // Recarrega a lista
    });
  }

  excluirLembrete(id: number): void {
    if (confirm('Tem certeza que deseja excluir este lembrete?')) {
      this.lembreteService.excluir(id).subscribe(() => {
        alert('Lembrete excluído com sucesso!');
        this.carregarLembretes();
      });
    }
  }

  carregarPagamentos(): void {
    this.pedidoService.getPagamentosPorPedido(this.pedidoId).subscribe(pagamentos => {
      this.pagamentos = pagamentos;
    });
  }

  registrarPagamento(idPagamento: number): void {
    const hoje = new Date().toISOString().split('T')[0];

    this.pagamentoService.registrarPagamento(idPagamento, hoje).subscribe({
      next: () => {
        alert('Pagamento registrado com sucesso!');
        this.carregarPagamentos();
      },
      error: (err) => {
        console.error('Erro ao registrar pagamento:', err);
        alert(err.error?.message || 'Não foi possível registrar o pagamento.');
      }
    });
  }

  iniciarEdicaoStatus(lembrete: Lembrete): void {
    if (lembrete.id) {
      this.editandoLembreteStatusId = lembrete.id;
    }
  }

  cancelarEdicaoStatus(): void {
    this.editandoLembreteStatusId = null;
  }

  salvarStatusLembrete(lembrete: Lembrete, event: any): void {
    const novoStatus = (event.target as HTMLSelectElement).value;

    const lembreteAtualizado = { ...lembrete, status: novoStatus };

    this.lembreteService.salvar(lembreteAtualizado).subscribe({
      next: () => {
        lembrete.status = novoStatus;
        this.cancelarEdicaoStatus();
      },
      error: (err) => {
        console.error("Erro ao atualizar status do lembrete", err);
        alert("Não foi possível atualizar o status.");
        this.cancelarEdicaoStatus();
      }
    });
  }
}
