import type { HttpClient } from "../clients/HttpClient";
import type {
    Produtos_AlterarProductParcialRespOk,
    Produtos_AlterarProductParcial,
    Produtos_ReativarProductRespOk,
    Produtos_AlterarProductRespOk,
    Produtos_BuscarPorIdRespOk,
    Produtos_BuscarTodosObjReq,
    Produtos_BuscarTodosRespOk,
    Produtos_InserirProdBody,
    Produtos_AlterarProduct,
    Produtos_InserirRespOk
} from "../types/Produtos.types";

export class PedidoOk_Produtos {
    private readonly path: "/produtos"

    constructor(private readonly http: HttpClient) { this.path = "/produtos"; }

    private paramsInUrl(params: Record<string, unknown> | undefined): string {
        if (!params) return "";

        const query = new URLSearchParams(
            Object.entries(params)
                .filter(([, value]) => value !== undefined && value !== null)
                .map(([key, value]): [string, string] => [key, String(value)])
        ).toString();

        return query ? `?${query}` : "";
    }

    private hrefToRelativePath(href: string): string {
        try {
            const url = new URL(href);
            const relative = `${url.pathname}${url.search}`;
            if (!relative.startsWith(this.path)) {
                throw new Error(`O href não pertence ao recurso ${this.path}: ${href}`);
            }
            return relative;
        } catch {
            if (href.startsWith(this.path)) return href;
            throw new Error(`Href inválido para ${this.path}: ${href}`);
        }
    }

    /**
     * Retorna os produtos de acordo com os parâmetros (filtros) informados.
     * Todos os parâmetros são opcionais e podem ser combinados.
     */
    public async buscarTodos(obj?: Produtos_BuscarTodosObjReq): Promise<Produtos_BuscarTodosRespOk> { /** Busca somente a primeira página */
        if (obj && 'href' in obj) {
            const path: string = this.hrefToRelativePath(obj.href);
            const resp = await this.http.get<Produtos_BuscarTodosRespOk>(path);
            return resp;
        }

        const path = this.path + this.paramsInUrl(obj);
        const resp = await this.http.get<Produtos_BuscarTodosRespOk>(path);
        return resp;
    }

    /**
     * Retorna o produto como o id no PedidoOK.
     */
    public async buscarPorId(id: string | number): Promise<Produtos_BuscarPorIdRespOk> {
        const path = this.path + `/${id}`;
        const resp = await this.http.get<Produtos_BuscarPorIdRespOk>(path);
        return resp;
    }

    /**
     * Insere um novo produto no PedidoOK.
     */
    public async inserirProduto(body: Produtos_InserirProdBody): Promise<Produtos_InserirRespOk> {
        const resp = await this.http.post<Produtos_InserirRespOk>(this.path, body);
        return resp;
    }

    /**
     * Altera todos os campos do registro do produto.
     * ! ATENÇÃO: Se algum campo for omitido no JSON, será atribuído o valor padrão para esse campo de acordo com o seu tipo (zero, string vazia ou nulo).
     * Considere a utilização da alteração parcial com o método PATCH.
     */
    public async alterarProduto(id: number | string, product: Produtos_AlterarProduct): Promise<Produtos_AlterarProductRespOk> {
        const path = this.path + `/${id}`;
        const resp = await this.http.put<Produtos_AlterarProductRespOk>(path, product);
        return resp;
    }

    /**
     * Altera campo(s) específico(s) do registro do produto.
     * ! Somente os campos informados no JSON terão seus valores alterados.
     */
    public async alterarProdutoParcial(id: number | string, product: Produtos_AlterarProductParcial): Promise<Produtos_AlterarProductParcialRespOk> {
        const path = this.path + `/${id}`;
        const resp = await this.http.patch<Produtos_AlterarProductParcialRespOk>(path, product);
        return resp;
    }

    /**
     * Exclui um produto do PedidoOK.
     * ! Em caso de sucesso, esse recurso retorna o HTTP status code 204 No Content.
     */
    public async deletarProduto(id: number | string): Promise<boolean> {
        const path = this.path + `/${id}`;
        const resp = await this.http.delete(path);
        return resp;
    }

    /**
     * Reativa um produto excluído.
     */
    public async reativarProduto(id: number | string): Promise<Produtos_ReativarProductRespOk> {
        const path = this.path + `/${id}/undelete`;
        const resp = await this.http.patch<Produtos_ReativarProductRespOk>(path, undefined);
        return resp;
    }
}