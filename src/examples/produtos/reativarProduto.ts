import { PedidoOK } from "../../clients/PedidoOK";

async function main(): Promise<void> {
    // DEFINE UMA VEZ E USA (Estilo Plug And Play)
    const client = new PedidoOK({
        version: 1,
        token_parceiro: "SEU_TOKEN_PARCEIRO",
        token_pedidook: "SEU_TOKEN_PEDIDOOK"
    });

    /**
     * Exemplo 9:
     * Reativar um produto excluído
     */
    {
        const idProduto = 49065360;
        const sucesso = await client.produtos.reativarProduto(idProduto);

        console.log(
            sucesso
                ? "Produto reativado com sucesso!"
                : "Não foi possível reativar o produto."
        );
    }
}

main().catch((error: unknown) => {
    console.error("Erro ao executar os exemplos da lib:", error);
    process.exit(1);
});