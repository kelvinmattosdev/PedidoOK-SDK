import { PedidoOK } from "../../clients/PedidoOK";

async function main(): Promise<void> {
    // DEFINE UMA VEZ E USA (Estilo Plug And Play)
    const client = new PedidoOK({
        version: 1,
        token_parceiro: "SEU_TOKEN_PARCEIRO",
        token_pedidook: "SEU_TOKEN_PEDIDOOK"
    });

    /**
     * Exemplo 7:
     * Alterar parcialmente um produto
     *
     * Use este exemplo quando sua API aceitar atualização parcial.
     * Aqui estamos enviando só alguns campos.
     */
    {
        const idProduto = 49065360;

        const alteracaoParcial = {
            nome: "Produto de Exemplo - Alteração Parcial",
            observacao: "Apenas alguns campos foram alterados",
            estoque: 200,
            custo: 25.19,
            venda: 49.9,
            peso: 1.25
        };

        const resposta = await client.produtos.alterarProdutoParcial(idProduto, alteracaoParcial);

        console.log("Produto alterado parcialmente com sucesso:");
        console.dir(resposta, { depth: null });
    }
}

main().catch((error: unknown) => {
    console.error("Erro ao executar os exemplos da lib:", error);
    process.exit(1);
});