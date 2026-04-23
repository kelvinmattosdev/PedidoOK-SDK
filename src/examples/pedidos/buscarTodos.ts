import { PedidoOK } from "../../clients/PedidoOK";

async function main() {
    const client = new PedidoOK({
        version: 1,
        token_parceiro: "SEU_TOKEN_PARCEIRO",
        token_pedidook: "SEU_TOKEN_PEDIDOOK"
    });

    // Exemplo 1: buscar todos sem filtros
    const resposta = await client.pedidos.buscarTodos();

    console.log("Próxima página:", resposta.href_proxima_pagina);
    console.log("Quantidade de pedidos retornados:", resposta.pedidos.length);

    const primeiroPedido = resposta.pedidos[0];
    if (primeiroPedido) {
        console.log("ID:", primeiroPedido.id);
        console.log("Número:", primeiroPedido.numero);
        console.log("Excluído:", primeiroPedido.excluido);
        console.log("Status:", primeiroPedido.status);
    }

    // Exemplo 2: buscar com filtros
    const respostaComFiltros = await client.pedidos.buscarTodos({
        excluido: false,
        pagina: 1
        // numero: 501387,
        // id_parceiro: "ID_DO_PARCEIRO",
        // alterado_apos: "2026-04-22T00:00:00"
    });

    console.log("Quantidade com filtros:", respostaComFiltros.pedidos.length);
}

main();