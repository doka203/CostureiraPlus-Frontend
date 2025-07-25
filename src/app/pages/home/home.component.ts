import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { forkJoin } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalClientes: number = 0;
  totalPedidos: number = 0;
  valorTotalReceber: number = 0;

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
      this.valorTotalReceber = pedidos
        .filter(p => p.status === 'EM ANDAMENTO')
        .reduce((acc, pedido) => acc + pedido.valor, 0);
    });
  }
}
