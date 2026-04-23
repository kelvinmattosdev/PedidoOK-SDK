import { PedidoOK } from "../../clients/PedidoOK";
import type { Pedidos_InserirPedidoObjReq } from "../../types/Pedidos.types";

async function main() {
    const client = new PedidoOK({
        version: 1,
        token_parceiro: "SEU_TOKEN_PARCEIRO",
        token_pedidook: "SEU_TOKEN_PEDIDOOK"
    });

    // Exemplo mínimo de criação de pedido
    const pedido: Pedidos_InserirPedidoObjReq = {
        status: "pedido",
        emissao: "2026-04-22",
        id_cliente: 67158548,
        id_parceiro: "V2rLKuesQGH4qJmuV7fN76iWKHXGvRQh",
        id_vendedor: 169735
    };

    const resposta = await client.pedidos.inserirPedido(pedido);

    console.log("Pedido criado com sucesso!");
    console.log("ID:", resposta.pedido.id);
    console.log("Número:", resposta.pedido.numero);
    console.log("Excluído:", resposta.pedido.excluido);
    console.log("Status:", resposta.pedido.status);
    console.log("ID do cliente:", resposta.pedido.id_cliente);
}

main();