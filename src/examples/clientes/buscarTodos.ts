import { PedidoOK } from "../../clients/PedidoOK";

async function main() {
    const client = new PedidoOK({
        version: 1,
        token_parceiro: "SEU_TOKEN_PARCEIRO",
        token_pedidook: "SEU_TOKEN_PEDIDOOK"
    });

    /**
     * Exemplo 1:
     * Busca clientes ativos (excluido: false)
     */
    const clientes = await client.clientes.buscarTodos({
        excluido: false
    });

    console.log("Próxima página:", clientes.href_proxima_pagina);

    const clientesResumidos = clientes.clientes.map((cliente) => ({
        id: cliente.id,
        codigo: cliente.codigo,
        razao_social: cliente.razao_social,
        fantasia: cliente.fantasia,
        cnpj_cpf: cliente.cnpj_cpf,
        excluido: cliente.excluido
    }));

    console.log("Clientes encontrados:");
    console.dir(clientesResumidos, { depth: null });

    /**
     * Exemplo 2:
     * Buscar próxima página manualmente usando o href_proxima_pagina
     */
    if (clientes.href_proxima_pagina) {
        const proximaPagina = await client.clientes.buscarTodos({
            href: clientes.href_proxima_pagina
        });

        console.log("Quantidade de clientes na próxima página:", proximaPagina.clientes.length);
    }

    /**
     * Exemplo 3:
     * Outros filtros possíveis
     */
    // const filtradoPorCodigo = await client.clientes.buscarTodos({
    //     codigo: "CLI001"
    // });

    // const filtradoPorCnpjCpf = await client.clientes.buscarTodos({
    //     cnpjcpf: 12345678901234
    // });

    // const filtradoPorIdParceiro = await client.clientes.buscarTodos({
    //     id_parceiro: "id-externo-do-cliente"
    // });

    // const alteradosApos = await client.clientes.buscarTodos({
    //     alterado_apos: "2026-04-20T10:00:00"
    // });
}

main().catch(console.error);