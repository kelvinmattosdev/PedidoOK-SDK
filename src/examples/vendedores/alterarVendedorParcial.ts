import { PedidoOK } from "../../clients/PedidoOK";
import type { Vendedores_AlterarVendedorParcialObjReq } from "../../types/Vendedores.types";

async function main() {
    const client = new PedidoOK({
        version: 1,
        token_parceiro: "SEU_TOKEN_PARCEIRO",
        token_pedidook: "SEU_TOKEN_PEDIDOOK"
    });

    /**
     * PATCH = atualização parcial
     * Use quando quiser alterar só alguns campos.
     */
    const id = 12345678;

    const alteracoesParciais: Vendedores_AlterarVendedorParcialObjReq = {
        nome: "Vendedor Alterado Parcialmente",
        regiao: "SP",
        informacao_adicional: "Atualização parcial via PATCH"
    };

    const resposta = await client.vendedores.alterarVendedorParcial(id, alteracoesParciais);

    console.log("Vendedor alterado parcialmente com sucesso:");
    console.dir(resposta, { depth: null });
}

main().catch(console.error);
