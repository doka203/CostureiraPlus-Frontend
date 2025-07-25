import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { PedidoService } from '../../services/pedido.service';
import { UsuarioService } from '../../services/usuario.service';
import { Pedido } from '../../models/pedido';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatoriosComponent implements OnInit {

  totalClientes: number = 0;
  totalPedidos: number = 0;
  valorTotalReceber: number = 0;
  valorTotalRecebido: number = 0;

  constructor(
    private usuarioService: UsuarioService,
    private pedidoService: PedidoService
  ) { }

  ngOnInit(): void {
    forkJoin({
      clientes: this.usuarioService.listarClientes(),
      pedidos: this.pedidoService.listar()
    }).subscribe(({ clientes, pedidos }) => {
      this.totalClientes = clientes.length;
      this.totalPedidos = pedidos.length;

      this.valorTotalRecebido = pedidos
        .filter(p => p.status === 'FINALIZADO')
        .reduce((acc, pedido) => acc + pedido.valor, 0);

      this.valorTotalReceber = pedidos
        .filter(p => p.status === 'EM ANDAMENTO')
        .reduce((acc, pedido) => acc + pedido.valor, 0);
    });
  }
}
