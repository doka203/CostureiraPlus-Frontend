import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';

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
      idUsuarioCliente: [null, Validators.required],
      // 1. Adicionar este campo para guardar o ID da costureira durante a edição
      idUsuarioCostureira: [null]
    });
  }

  ngOnInit(): void {
    this.carregarClientes();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pedidoService.buscarPorId(Number(id)).subscribe(pedido => {
        // O patchValue irá preencher todos os campos, incluindo o novo 'idUsuarioCostureira'
        this.formulario.patchValue({
          ...pedido,
          data_pedido: formatDate(pedido.data_pedido, 'yyyy-MM-dd', 'en-US'),
          data_entrega: formatDate(pedido.data_entrega, 'yyyy-MM-dd', 'en-US')
        });
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
      // 2. Adicionar o tratamento de erros ao subscribe
      this.pedidoService.salvar(this.formulario.value).subscribe({
        next: () => {
          alert('Pedido salvo com sucesso!');
          this.router.navigate(['/consultar-pedidos']);
        },
        error: (err) => {
          console.error('Erro ao salvar pedido:', err);
          alert(err.error?.message || 'Não foi possível salvar o pedido.');
        }
      });
    }
  }
}
