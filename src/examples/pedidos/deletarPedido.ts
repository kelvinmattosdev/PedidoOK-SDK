import { PedidoOK } from "../../clients/PedidoOK";

async function main() {
    const client = new PedidoOK({
        version: 1,
        token_parceiro: "SEU_TOKEN_PARCEIRO",
        token_pedidook: "SEU_TOKEN_PEDIDOOK"
    });

    const idPedido = 67174897;

    const deletado = await client.pedidos.deletarPedido(idPedido);

    console.log(
        deletado
            ? "Pedido excluído com sucesso! ✅"
            : "Houve um erro ao tentar excluir o pedido. ❌"
    );
}

main();