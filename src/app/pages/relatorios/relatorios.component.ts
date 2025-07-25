import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { PedidoService } from '../../services/pedido.service';
import { PagamentoService } from '../../services/pagamento.service';
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
    private pedidoService: PedidoService,
    private pagamentoService: PagamentoService
  ) { }

  ngOnInit(): void {
    forkJoin({
      clientes: this.usuarioService.listarClientes(),
      pedidos: this.pedidoService.listar(),
      pagamentos: this.pagamentoService.listarTodos()
    }).subscribe(({ clientes, pedidos, pagamentos }) => {
      this.totalClientes = clientes.length;
      this.totalPedidos = pedidos.length;

      this.valorTotalRecebido = pagamentos
        .filter(p => p.data_pagamento != null) // Filtra apenas as parcelas que foram pagas
        .reduce((acc, pagamento) => acc + pagamento.valor, 0);

      this.valorTotalReceber = pagamentos
        .filter(p => p.data_pagamento == null) // Filtra apenas as parcelas pendentes
        .reduce((acc, pagamento) => acc + pagamento.valor, 0);

        // this.valorTotalReceber = pedidos
        // .filter(p => p.status === 'EM ANDAMENTO')
        // .reduce((acc, pedido) => acc + pedido.valor, 0);
    });
  }
}
