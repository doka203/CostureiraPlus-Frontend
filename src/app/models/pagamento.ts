export class Pagamento {
    id!: number;
    data_vencimento!: string;
    data_pagamento?: string;
    valor!: number;
    idPedido!: number;
    descricaoPedido?: string;
    data_pedido?: string;
}
