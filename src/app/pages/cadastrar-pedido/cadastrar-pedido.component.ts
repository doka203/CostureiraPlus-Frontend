import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-cadastrar-pedido',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './cadastrar-pedido.component.html',
  styleUrls: ['./cadastrar-pedido.component.css']
})
export class CadastrarPedidoComponent implements OnInit {

  formulario: FormGroup;
  clientes: Usuario[] = [];

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      id: [null],
      descricao: ['', Validators.required],
      data_pedido: ['', Validators.required],
      data_entrega: ['', Validators.required],
      status: ['', Validators.required],
      valor: [0, [Validators.required, Validators.min(0.01)]],
      forma_pagamento: ['', Validators.required],
      numero_parcelas: [1, [Validators.required, Validators.min(1)]],
      idUsuarioCliente: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.carregarClientes();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pedidoService.buscarPorId(Number(id)).subscribe(pedido => {
        // Formata as datas para o formato yyyy-MM-dd antes de preencher o formulário
        pedido.data_pedido = formatDate(pedido.data_pedido, 'yyyy-MM-dd', 'en-US');
        pedido.data_entrega = formatDate(pedido.data_entrega, 'yyyy-MM-dd', 'en-US');
        this.formulario.patchValue(pedido);
      });
    }
  }

  carregarClientes(): void {
    this.usuarioService.listarClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      this.pedidoService.salvar(this.formulario.value).subscribe(() => {
        alert('Pedido salvo com sucesso!');
        this.router.navigate(['/consultar-pedidos']);
      });
    }
  }
}
