import { PedidoOK } from "../../clients/PedidoOK";

async function main(): Promise<void> {
    // DEFINE UMA VEZ E USA (Estilo Plug And Play)
    const client = new PedidoOK({
        version: 1,
        token_parceiro: "SEU_TOKEN_PARCEIRO",
        token_pedidook: "SEU_TOKEN_PEDIDOOK"
    });

    /**
     * =========================================================
     * EXEMPLOS DE USO - PRODUTOS
     * =========================================================
     *
     * Como usar este arquivo:
     * 1) Descomente apenas UM exemplo por vez.
     * 2) Execute o arquivo.
     * 3) Observe o retorno no console.
     *
     * Isso evita conflitos, principalmente em exemplos que:
     * - inserem produto
     * - alteram produto
     * - deletam produto
     */

    /**
     * Exemplo 1:
     * Buscar a primeira página de produtos
     */
    {
        const resposta = await client.produtos.buscarTodos();

        console.log("Próxima página:", resposta.href_proxima_pagina);
        console.log("Quantidade de produtos nesta página:", resposta.produtos.length);
        console.dir(resposta.produtos[0], { depth: null });
    }

    /**
     * Exemplo 2:
     * Buscar produtos a partir de uma URL de paginação
     */
    {
        const href = "https://api.pedidook.com.br/v1/produtos/?pagina=2";
        const resposta = await client.produtos.buscarTodos({ href });

        console.log("Próxima página:", resposta.href_proxima_pagina);
        console.log("Quantidade de produtos nesta página:", resposta.produtos.length);
    }

    /**
 * Exemplo 3:
 * Percorrer páginas até encontrar um produto pelo código
 */
    {
        let href: string | undefined = undefined;
        let paginaAtual = 1;
        let produtoEncontrado: unknown = undefined;

        do {
            console.log(`Buscando página ${paginaAtual}...`);

            const objHref = href ? { href } : undefined;
            const resposta = await client.produtos.buscarTodos(objHref);

            produtoEncontrado = resposta.produtos.find((produto) => {
                return produto.codigo === "APICOMP1";
            });

            if (produtoEncontrado) {
                console.log("Produto encontrado:");
                console.dir(produtoEncontrado, { depth: null });
                break;
            }

            href = resposta.href_proxima_pagina ?? undefined;
            paginaAtual++;
        } while (href);

        if (!produtoEncontrado) {
            console.log('Produto com código "APICOMP1" não foi encontrado.');
        }
    }
}

main().catch((error: unknown) => {
    console.error("Erro ao executar os exemplos da lib:", error);
    process.exit(1);
});