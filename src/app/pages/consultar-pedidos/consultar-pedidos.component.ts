import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/pedido';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-consultar-pedidos',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe, CurrencyPipe],
  templateUrl: './consultar-pedidos.component.html',
  styleUrls: ['./consultar-pedidos.component.css']
})
export class ConsultarPedidosComponent implements OnInit {
  pedidos: Pedido[] = [];

  constructor(private pedidoService: PedidoService, private router: Router) { }

  ngOnInit(): void {
    this.carregarPedidos();
  }

  carregarPedidos(): void {
    this.pedidoService.listar().subscribe(pedidos => {
      this.pedidos = pedidos;
    });
  }

  editarPedido(pedido: Pedido): void {
    this.router.navigate(['/cadastrar-pedido', pedido.id]);
  }

  excluirPedido(id: number): void {
    if (confirm('Tem certeza que deseja excluir este pedido?')) {
      this.pedidoService.excluir(id).subscribe({
        next: () => {
          alert('Pedido excluído com sucesso!');
          this.carregarPedidos();
        },
        error: (err) => {
          alert(err.error.message || 'Não foi possível excluir o pedido.');
        }
      });
    }
  }
}
