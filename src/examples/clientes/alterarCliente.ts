import { PedidoOK } from "../../clients/PedidoOK";
import type { Clientes_AlterarObj } from "../../types/Clientes.types";

async function main() {
    const client = new PedidoOK({
        version: 1,
        token_parceiro: "SEU_TOKEN_PARCEIRO",
        token_pedidook: "SEU_TOKEN_PEDIDOOK"
    });

    /**
     * PUT = atualização completa
     * Ideal quando você quer enviar o objeto inteiro já atualizado.
     */
    const id = 12345678;

    const dadosAtualizados: Clientes_AlterarObj = {
        codigo: "CLI-TESTE-001",
        razao_social: "Cliente Alterado LTDA",
        id_parceiro: "cliente-externo-001",

        fantasia: "Cliente Alterado",
        cnpj_cpf: "12345678901234",
        telefone: "14988888888",
        observacao: "Cliente atualizado por PUT",
        atendimento: "Pós-venda",
        ie_rg: "ISENTO",
        email_copia_pedido: "pedido@clientealterado.com",
        email_xml_nfe: "fiscal@clientealterado.com",
        segmento: "Distribuidor",
        ponto_de_referencia: "Em frente à praça",
        limite_credito: 5000,

        endereco: {
            uf: "SP",
            cidade: "Jaú",
            complemento: "Bloco A",
            numero: "200",
            logradouro: "Avenida Atualizada",
            bairro: "Centro",
            cep: "17200000"
        },

        endereco_cobranca: {
            uf: "SP",
            cidade: "Jaú",
            complemento: "",
            numero: "200",
            logradouro: "Avenida Atualizada",
            bairro: "Centro",
            cep: "17200000"
        },

        endereco_entrega: {
            uf: "SP",
            cidade: "Jaú",
            complemento: "",
            numero: "200",
            logradouro: "Avenida Atualizada",
            bairro: "Centro",
            cep: "17200000"
        },

        referencias_bancarias: [],
        referencias_comerciais: []
    };

    const resposta = await client.clientes.alterarCliente(id, dadosAtualizados);

    console.log("Cliente alterado com sucesso:");
    console.dir(resposta, { depth: null });
}

main().catch(console.error);