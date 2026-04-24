import { PedidoOK } from "../../clients/PedidoOK";

async function main() {
    const client = new PedidoOK({
        version: 1,
        token_parceiro: "SEU_TOKEN_PARCEIRO",
        token_pedidook: "SEU_TOKEN_PEDIDOOK"
    });

    /**
     * Busca um vendedor específico pelo ID
     */
    const id = 12345678;

    const resposta = await client.vendedores.buscarPorId(id);

    const vendedor = resposta.vendedor;

    console.log("Vendedor encontrado:");
    console.dir(
        {
            id: vendedor.id,
            nome: vendedor.nome,
            id_parceiro: vendedor.id_parceiro,
            regiao: vendedor.regiao,
            informacao_adicional: vendedor.informacao_adicional,
            codigo_ativacao: vendedor.codigo_ativacao,
            validade_licenca: vendedor.validade_licenca,
            excluido: vendedor.excluido,
            ultima_alteracao: vendedor.ultima_alteracao
        },
        { depth: null }
    );
}

main().catch(console.error);
