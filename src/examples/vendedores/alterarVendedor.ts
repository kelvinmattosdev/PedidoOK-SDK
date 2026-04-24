import { PedidoOK } from "../../clients/PedidoOK";
import type { Vendedores_AlterarVendedorObjReq } from "../../types/Vendedores.types";

async function main() {
    const client = new PedidoOK({
        version: 1,
        token_parceiro: "SEU_TOKEN_PARCEIRO",
        token_pedidook: "SEU_TOKEN_PEDIDOOK"
    });

    /**
     * PUT = atualização completa
     * Ideal quando você quer enviar o objeto inteiro já atualizado.
     *
     * Atenção: campos omitidos podem ser gravados com valor padrão pela API.
     */
    const id = 12345678;

    const dadosAtualizados: Vendedores_AlterarVendedorObjReq = {
        nome: "Vendedor Alterado",
        id_parceiro: "vendedor-externo-001",
        regiao: "SP",
        informacao_adicional: "Vendedor atualizado por PUT"
    };

    const resposta = await client.vendedores.alterarVendedor(id, dadosAtualizados);

    console.log("Vendedor alterado com sucesso:");
    console.dir(resposta, { depth: null });
}

main().catch(console.error);
