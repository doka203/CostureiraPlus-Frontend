import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/pedido';
import { Lembrete } from '../../models/lembrete';
import { Pagamento } from '../../models/pagamento';

@Component({
  selector: 'app-detalhes-pedido',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe, CurrencyPipe],
  templateUrl: './detalhes-pedido.component.html',
  styleUrls: ['./detalhes-pedido.component.css']
})
export class DetalhesPedidoComponent implements OnInit {
  pedido: Pedido | null = null;
  lembretes: Lembrete[] = [];
  pagamentos: Pagamento[] = [];
  pedidoId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private pedidoService: PedidoService
  ) { }

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

    // Busca os lembretes associados
    this.pedidoService.getLembretesPorPedido(this.pedidoId).subscribe(lembretes => {
      this.lembretes = lembretes;
    });

    // Busca os pagamentos associados
    this.pedidoService.getPagamentosPorPedido(this.pedidoId).subscribe(pagamentos => {
      this.pagamentos = pagamentos;
    });
  }
}
