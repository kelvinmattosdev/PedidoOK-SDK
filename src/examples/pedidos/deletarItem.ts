import { PedidoOK } from "../../clients/PedidoOK";

async function main() {
    const client = new PedidoOK({
        version: 1,
        token_parceiro: "SEU_TOKEN_PARCEIRO",
        token_pedidook: "SEU_TOKEN_PEDIDOOK"
    });

    const idPedido = 67174897;
    const idProduto = 49179870;

    const deletado = await client.pedidos.deletarItem(idPedido, idProduto);

    console.log(
        deletado
            ? "Item do pedido excluído com sucesso! ✅"
            : "Houve um erro ao tentar excluir o item do pedido. ❌"
    );
}

main();