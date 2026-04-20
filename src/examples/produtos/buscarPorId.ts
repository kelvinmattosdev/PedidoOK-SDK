import { PedidoOK } from "../../clients/PedidoOK";

async function main(): Promise<void> {
    // DEFINE UMA VEZ E USA (Estilo Plug And Play)
    const client = new PedidoOK({
        version: 1,
        token_parceiro: "SEU_TOKEN_PARCEIRO",
        token_pedidook: "SEU_TOKEN_PEDIDOOK"
    });

    /**
     * Exemplo 4:
     * Buscar produto por ID
     */
    {
        const idProduto = 19783837;
        const resposta = await client.produtos.buscarPorId(idProduto);

        console.log("Produto encontrado:");
        console.dir(resposta.produto, { depth: null });
    }
}

main().catch((error: unknown) => {
    console.error("Erro ao executar os exemplos da lib:", error);
    process.exit(1);
});