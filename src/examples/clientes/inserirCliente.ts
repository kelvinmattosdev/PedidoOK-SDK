import { PedidoOK } from "../../clients/PedidoOK";
import type { Clientes_InserirObj } from "../../types/Clientes.types";

async function main() {
    const client = new PedidoOK({
        version: 1,
        token_parceiro: "SEU_TOKEN_PARCEIRO",
        token_pedidook: "SEU_TOKEN_PEDIDOOK"
    });

    /**
     * Para inserir um cliente, pela tipagem os campos obrigatórios são:
     * - codigo
     * - razao_social
     * - id_parceiro
     */
    const novoCliente: Clientes_InserirObj = {
        codigo: "CLI-TESTE-001",
        razao_social: "Cliente de Exemplo LTDA",
        id_parceiro: "cliente-externo-001",

        fantasia: "Cliente Exemplo",
        cnpj_cpf: "12345678901234",
        telefone: "14999999999",
        observacao: "Cliente criado via exemplo da SDK",
        atendimento: "Comercial",
        ie_rg: "ISENTO",
        email_copia_pedido: "pedido@cliente.com",
        email_xml_nfe: "fiscal@cliente.com",
        segmento: "Varejo",
        ponto_de_referencia: "Próximo ao centro",
        limite_credito: 1000,

        endereco: {
            uf: "SP",
            cidade: "Jaú",
            complemento: "",
            numero: "100",
            logradouro: "Rua Exemplo",
            bairro: "Centro",
            cep: "17200000"
        },

        endereco_cobranca: {
            uf: "SP",
            cidade: "Jaú",
            complemento: "Sala 1",
            numero: "100",
            logradouro: "Rua Exemplo",
            bairro: "Centro",
            cep: "17200000"
        },

        endereco_entrega: {
            uf: "SP",
            cidade: "Jaú",
            complemento: "",
            numero: "100",
            logradouro: "Rua Exemplo",
            bairro: "Centro",
            cep: "17200000"
        }
    };

    const resposta = await client.clientes.inserirCliente(novoCliente);

    console.log("Cliente criado com sucesso:");
    console.dir(resposta, { depth: null });
}

main().catch(console.error);