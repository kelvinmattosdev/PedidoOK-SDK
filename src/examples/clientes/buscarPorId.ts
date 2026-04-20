import { PedidoOK } from "../../clients/PedidoOK";

async function main() {
    const client = new PedidoOK({
        version: 1,
        token_parceiro: "SEU_TOKEN_PARCEIRO",
        token_pedidook: "SEU_TOKEN_PEDIDOOK"
    });

    /**
     * Busca um cliente específico pelo ID
     */
    const id = 12345678;

    const resposta = await client.clientes.buscarPorId(id);

    const cliente = resposta.cliente;

    console.log("Cliente encontrado:");
    console.dir(
        {
            id: cliente.id,
            codigo: cliente.codigo,
            razao_social: cliente.razao_social,
            fantasia: cliente.fantasia,
            cnpj_cpf: cliente.cnpj_cpf,
            telefone: cliente.telefone,
            excluido: cliente.excluido,
            ultima_alteracao: cliente.ultima_alteracao
        },
        { depth: null }
    );
}

main().catch(console.error);