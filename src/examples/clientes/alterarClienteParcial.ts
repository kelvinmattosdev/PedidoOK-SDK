import { PedidoOK } from "../../clients/PedidoOK";
import type { Clientes_AlterarParcialObj } from "../../types/Clientes.types";

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

    const alteracoesParciais: Clientes_AlterarParcialObj = {
        razao_social: "Cliente Alterado Parcialmente LTDA",
        telefone: "14977777777",
        observacao: "Atualização parcial via PATCH"
    };

    const resposta = await client.clientes.alterarClienteParcial(id, alteracoesParciais);

    console.log("Cliente alterado parcialmente com sucesso:");
    console.dir(resposta, { depth: null });
}

main().catch(console.error);