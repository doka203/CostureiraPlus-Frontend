export class Pedido {
  id?: number;
  descricao!: string;
  data_pedido!: string;
  data_entrega!: string;
  status!: string;
  valor!: number;
  forma_pagamento!: string;
  numero_parcelas!: number;
  idUsuarioCliente!: number;
  nomeCliente?: string;
  idUsuarioCostureira!: number;
  nomeCostureira?: string;
}
