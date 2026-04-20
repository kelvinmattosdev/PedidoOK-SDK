import { PedidoOK } from "../../clients/PedidoOK";

async function main(): Promise<void> {
    // DEFINE UMA VEZ E USA (Estilo Plug And Play)
    const client = new PedidoOK({
        version: 1,
        token_parceiro: "SEU_TOKEN_PARCEIRO",
        token_pedidook: "SEU_TOKEN_PEDIDOOK"
    });

    /**
     * Exemplo 8:
     * Deletar um produto
     */
    {
        const idProduto = 49065360;
        const sucesso = await client.produtos.deletarProduto(idProduto);

        console.log(
            sucesso
                ? "Produto excluído com sucesso!"
                : "Não foi possível excluir o produto."
        );
    }
}

main().catch((error: unknown) => {
    console.error("Erro ao executar os exemplos da lib:", error);
    process.exit(1);
});