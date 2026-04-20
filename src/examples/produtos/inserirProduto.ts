import { PedidoOK } from "../../clients/PedidoOK";

async function main(): Promise<void> {
    // DEFINE UMA VEZ E USA (Estilo Plug And Play)
    const client = new PedidoOK({
        version: 1,
        token_parceiro: "SEU_TOKEN_PARCEIRO",
        token_pedidook: "SEU_TOKEN_PEDIDOOK"
    });

    /**
     * Exemplo 5:
     * Inserir um novo produto
     */
    {
        const novoProduto = {
            codigo: "TESTE-PEDIDOOK-001",
            observacao: "Produto criado pelo exemplo da lib",
            ipi: 0,
            peso: 0,
            codigo_barra: "1234567891234",
            qtd_embalagem: 1,
            categoria: "",
            nome: "Produto de Exemplo",
            id_parceiro: "",
            grades: [],
            validade: null,
            estoque: 10,
            marca: "JAU PESCA",
            venda: 29.9,
            comissao: 0,
            custo: 15,
            id_fornecedor: null,
            estoque_minimo: 0,
            ncm: "",
            embalagem: "UN",
            referencia: "REF-EXEMPLO-001"
        };

        const resposta = await client.produtos.inserirProduto(novoProduto);

        console.log("Produto inserido com sucesso:");
        console.dir(resposta, { depth: null });
    }
}

main().catch((error: unknown) => {
    console.error("Erro ao executar os exemplos da lib:", error);
    process.exit(1);
});
