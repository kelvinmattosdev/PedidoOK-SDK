import { PedidoOK } from "../../clients/PedidoOK";
import type { Pedidos_InserirItemObjReq } from "../../types/Pedidos.types";

async function main() {
    const client = new PedidoOK({
        version: 1,
        token_parceiro: "SEU_TOKEN_PARCEIRO",
        token_pedidook: "SEU_TOKEN_PEDIDOOK"
    });

    const idPedido = 67174897;

    const itens: Pedidos_InserirItemObjReq = {
        itens: [
            {
                quantidade: 10,
                embalagem: "UN",
                id_produto: 49179870
            }
        ]
    };

    const resposta = await client.pedidos.inserirItem(idPedido, itens);

    console.log("Item(ns) inserido(s) com sucesso!");
    console.log("ID do pedido:", resposta.pedido.id);
    console.log("Quantidade total de itens no pedido:", resposta.pedido.itens.length);
    console.log("Itens:", resposta.pedido.itens);
}

main();