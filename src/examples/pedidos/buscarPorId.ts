import { PedidoOK } from "../../clients/PedidoOK";

async function main() {
    const client = new PedidoOK({
        version: 1,
        token_parceiro: "SEU_TOKEN_PARCEIRO",
        token_pedidook: "SEU_TOKEN_PEDIDOOK"
    });

    const idPedido = 19604217;

    const resposta = await client.pedidos.buscarPorId(idPedido);

    console.log("ID:", resposta.pedido.id);
    console.log("Número:", resposta.pedido.numero);
    console.log("Excluído:", resposta.pedido.excluido);
    console.log("Status:", resposta.pedido.status);
    console.log("ID do cliente:", resposta.pedido.id_cliente);
    console.log("Quantidade de itens:", resposta.pedido.itens.length);
}

main();