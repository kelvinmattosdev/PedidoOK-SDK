import { PedidoOK } from "../../clients/PedidoOK";

async function main(): Promise<void> {
    // DEFINE UMA VEZ E USA (Estilo Plug And Play)
    const client = new PedidoOK({
        version: 1,
        token_parceiro: "SEU_TOKEN_PARCEIRO",
        token_pedidook: "SEU_TOKEN_PEDIDOOK"
    });

    /**
     * Exemplo 6:
     * Alterar completamente um produto existente
     *
     * Normalmente usado quando sua API espera praticamente
     * todos os campos do produto no body.
     */
    {
        const idProduto = 49065360;

        const produtoAtualizado = {
            codigo: "TESTE-PEDIDOOK-001",
            observacao: "Produto alterado pelo exemplo da lib",
            ipi: 0,
            peso: 0.5,
            codigo_barra: "1234567891234",
            qtd_embalagem: 1,
            categoria: "",
            nome: "Produto de Exemplo Alterado",
            id_parceiro: "",
            grades: [],
            validade: null,
            estoque: 25,
            marca: "JAU PESCA",
            venda: 39.9,
            comissao: 0,
            custo: 20,
            id_fornecedor: null,
            estoque_minimo: 2,
            ncm: "",
            embalagem: "UN",
            referencia: "REF-EXEMPLO-001"
        };

        const resposta = await client.produtos.alterarProduto(idProduto, produtoAtualizado);

        console.log("Produto alterado com sucesso:");
        console.dir(resposta, { depth: null });
    }
}

main().catch((error: unknown) => {
    console.error("Erro ao executar os exemplos da lib:", error);
    process.exit(1);
});