import { PedidoOK } from "../../clients/PedidoOK";

async function main() {
    const client = new PedidoOK({
        version: 1,
        token_parceiro: "SEU_TOKEN_PARCEIRO",
        token_pedidook: "SEU_TOKEN_PEDIDOOK"
    });

    /**
     * Exclui um vendedor pelo ID
     */
    const id = 12345678;

    const resposta = await client.vendedores.deletarVendedor(id);

    if (resposta) {
        console.log("Vendedor excluído com sucesso.");
        console.dir(resposta, { depth: null });
    } else {
        console.log("A exclusão não retornou sucesso.");
    }
}

main().catch(console.error);
