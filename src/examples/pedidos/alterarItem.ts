import { PedidoOK } from "../../clients/PedidoOK";
import type { Pedidos_AlterarItemObjReq } from "../../types/Pedidos.types";

async function main() {
    const client = new PedidoOK({
        version: 1,
        token_parceiro: "SEU_TOKEN_PARCEIRO",
        token_pedidook: "SEU_TOKEN_PEDIDOOK"
    });

    const idPedido = 67174897;
    const idProduto = 49179870;

    const item: Pedidos_AlterarItemObjReq = {
        embalagem: "CX",
        observacao: "Item alterado via SDK"
        // quantidade: 10,
        // preco_bruto: 20,
        // preco_liquido: 18,
        // preco_custo: 12,
        // qtd_embalagem: 1,
        // percentual_desconto_acrescimo: -5,
        // grades: [{ tamanho_cor: "Azul", quantidade: 2 }]
    };

    const resposta = await client.pedidos.alterarItem(idPedido, idProduto, item);

    console.log("Item alterado com sucesso!");
    console.log("ID do pedido:", resposta.pedido.id);
    console.log("Itens atualizados:", resposta.pedido.itens);
}

main();