import { PedidoOK } from "../../clients/PedidoOK";
import type { Pedidos_AlterarCabecalhoObjReq } from "../../types/Pedidos.types";

async function main() {
    const client = new PedidoOK({
        version: 1,
        token_parceiro: "SEU_TOKEN_PARCEIRO",
        token_pedidook: "SEU_TOKEN_PEDIDOOK"
    });

    const idPedido = 67174897;

    const cabecalho: Pedidos_AlterarCabecalhoObjReq = {
        forma_pagamento: "boleto",
        observacao_cliente: "Pedido alterado via SDK",
        tipo_frete: "FOB"
        // base_vencimento: "entrega",
        // condicao_pagamento: [0],
        // emissao: "2026-04-22",
        // faturamento: "2026-04-22",
        // id_cliente: 67158548,
        // id_parceiro: "V2rLKuesQGH4qJmuV7fN76iWKHXGvRQh",
        // id_tabela_preco: null,
        // id_vendedor: 169735,
        // numero: null
    };

    const resposta = await client.pedidos.alterarCabecalho(idPedido, cabecalho);

    console.log("Cabeçalho alterado com sucesso!");
    console.log("ID:", resposta.pedido.id);
    console.log("Forma de pagamento:", resposta.pedido.forma_pagamento);
    console.log("Observação do cliente:", resposta.pedido.observacao_cliente);
    console.log("Tipo de frete:", resposta.pedido.tipo_frete);
}

main();