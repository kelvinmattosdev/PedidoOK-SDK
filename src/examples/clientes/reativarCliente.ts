import { PedidoOK } from "../../clients/PedidoOK";

async function main() {
    const client = new PedidoOK({
        version: 1,
        token_parceiro: "SEU_TOKEN_PARCEIRO",
        token_pedidook: "SEU_TOKEN_PEDIDOOK"
    });

    /**
     * Reativa um cliente excluído pelo ID
     */
    const id = 12345678;

    const resposta = await client.clientes.reativarCliente(id);

    console.log("Cliente reativado com sucesso:");
    console.dir(resposta, { depth: null });
}

main().catch(console.error);