import { PedidoOK } from "../../clients/PedidoOK";

async function main() {
    const client = new PedidoOK({
        version: 1,
        token_parceiro: "SEU_TOKEN_PARCEIRO",
        token_pedidook: "SEU_TOKEN_PEDIDOOK"
    });

    const idPedido = 67174897;

    const resposta = await client.pedidos.reativarPedido(idPedido);

    console.log("Pedido reativado com sucesso!");
    console.log("ID:", resposta.pedido.id);
    console.log("Excluído:", resposta.pedido.excluido);
    console.log("ID do cliente:", resposta.pedido.id_cliente);
    console.log("Status:", resposta.pedido.status);
}

main();