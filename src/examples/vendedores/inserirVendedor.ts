import { PedidoOK } from "../../clients/PedidoOK";
import type { Vendedores_InserirVendedorObjReq } from "../../types/Vendedores.types";

async function main() {
    const client = new PedidoOK({
        version: 1,
        token_parceiro: "SEU_TOKEN_PARCEIRO",
        token_pedidook: "SEU_TOKEN_PEDIDOOK"
    });

    /**
     * Para inserir um vendedor, pela tipagem os campos obrigatórios são:
     * - nome
     * - id_parceiro
     *
     * Também é necessário haver uma licença disponível no PedidoOK.
     */
    const novoVendedor: Vendedores_InserirVendedorObjReq = {
        nome: "Vendedor de Exemplo",
        id_parceiro: "vendedor-externo-001",
        regiao: "SP",
        informacao_adicional: "Vendedor criado via exemplo da SDK"
    };

    const resposta = await client.vendedores.inserirVendedor(novoVendedor);

    console.log("Vendedor criado com sucesso:");
    console.dir(resposta, { depth: null });
}

main().catch(console.error);
