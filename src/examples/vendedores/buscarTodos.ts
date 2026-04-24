import { PedidoOK } from "../../clients/PedidoOK";

async function main() {
    const client = new PedidoOK({
        version: 1,
        token_parceiro: "SEU_TOKEN_PARCEIRO",
        token_pedidook: "SEU_TOKEN_PEDIDOOK"
    });

    /**
     * Exemplo 1:
     * Busca vendedores ativos (excluído: false)
     */
    const vendedores = await client.vendedores.buscarTodos({
        excluido: false
    });

    console.log("Próxima página:", vendedores.href_proxima_pagina);

    const vendedoresResumidos = vendedores.vendedores.map((vendedor) => ({
        id: vendedor.id,
        nome: vendedor.nome,
        id_parceiro: vendedor.id_parceiro,
        regiao: vendedor.regiao,
        excluido: vendedor.excluido,
        validade_licenca: vendedor.validade_licenca
    }));

    console.log("Vendedores encontrados:");
    console.dir(vendedoresResumidos, { depth: null });

    /**
     * Exemplo 2:
     * Buscar próxima página manualmente usando o href_proxima_pagina
     */
    if (vendedores.href_proxima_pagina) {
        const proximaPagina = await client.vendedores.buscarTodos({
            href: vendedores.href_proxima_pagina
        });

        console.log("Quantidade de vendedores na próxima página:", proximaPagina.vendedores.length);
    }

    /**
     * Exemplo 3:
     * Outros filtros possíveis
     */
    // const filtradoPorNome = await client.vendedores.buscarTodos({
    //     nome: "Nome do Vendedor"
    // });

    // const filtradoPorIdParceiro = await client.vendedores.buscarTodos({
    //     id_parceiro: "vendedor-externo-001"
    // });

    // const alteradosApos = await client.vendedores.buscarTodos({
    //     alterado_apos: "2026-04-20T10:00:00"
    // });
}

main().catch(console.error);
