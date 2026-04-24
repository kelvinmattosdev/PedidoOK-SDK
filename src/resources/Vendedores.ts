import type { HttpClient } from "../clients/HttpClient";
import type {
    Vendedores_AlterarVendedorObjReq,
    Vendedores_AlterarVendedorParcialObjReq,
    Vendedores_AlterarVendedorParcialRespOk,
    Vendedores_AlterarVendedorRespOk,
    Vendedores_BuscarPorIdRespOk,
    Vendedores_BuscarTodosObjReq,
    Vendedores_BuscarTodosRespOk,
    Vendedores_InserirVendedorObjReq,
    Vendedores_InserirVendedorRespOk
} from "../types/Vendedores.types";

export class PedidoOk_Vendedores {
    private readonly path: "/vendedores";

    constructor(private readonly http: HttpClient) { this.path = "/vendedores"; }

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
     * Retorna os vendedores de acordo com os parâmetros (filtros) informados.
     * Todos os parâmetros são opcionais e podem ser combinados.
     */
    public async buscarTodos(obj?: Vendedores_BuscarTodosObjReq): Promise<Vendedores_BuscarTodosRespOk> {
        if (obj && 'href' in obj) {
            const path: string = this.hrefToRelativePath(obj.href);
            const resp = await this.http.get<Vendedores_BuscarTodosRespOk>(path);
            return resp;
        }

        const path = this.path + this.paramsInUrl(obj);
        const resp = await this.http.get<Vendedores_BuscarTodosRespOk>(path);
        return resp;
    }

    /**
     * Retorna o vendedor como o id no PedidoOK.
     */
    public async buscarPorId(id: string | number): Promise<Vendedores_BuscarPorIdRespOk> {
        const path = this.path + `/${id}`;
        const resp = await this.http.get<Vendedores_BuscarPorIdRespOk>(path);
        return resp;
    }

    /**
     * Insere um novo vendedor no PedidoOK.
     * ! IMPORTANTE: É necessário haver uma licença disponível no PedidoOK para o novo vendedor, caso contrário será retornado o erro 21-Não existe licença disponível para o inclusão de um novo vendedor.
     */
    public async inserirVendedor(obj: Vendedores_InserirVendedorObjReq): Promise<Vendedores_InserirVendedorRespOk> {
        const resp = await this.http.post<Vendedores_InserirVendedorRespOk>(this.path, obj);
        return resp;
    }

    /**
     * Altera todos os campos do registro do vendedor.
     * ! ATENÇÃO: Se algum campo for omitido no JSON, será atribuído o valor padrão para esse campo de acordo com o seu tipo (zero, string vazia ou nulo).
     * Considere a utilização da alteração parcial com o método PATCH.
     */
    public async alterarVendedor(id_vendedor: string | number, obj: Vendedores_AlterarVendedorObjReq): Promise<Vendedores_AlterarVendedorRespOk> {
        const path = this.path + `/${id_vendedor}`;
        const resp = await this.http.put<Vendedores_AlterarVendedorRespOk>(path, obj);
        return resp;
    }

    /**
     * Altera campo(s) específico(s) do registro do vendedor.
     * Somente os campos informados no JSON terão seus valores alterados.
     */
    public async alterarVendedorParcial(id_vendedor: string | number, obj: Vendedores_AlterarVendedorParcialObjReq): Promise<Vendedores_AlterarVendedorParcialRespOk> {
        const path = this.path + `/${id_vendedor}`;
        const resp = await this.http.patch<Vendedores_AlterarVendedorParcialRespOk>(path, obj);
        return resp;
    }

    /**
     * Exclui um vendedor do PedidoOK.
     * Em caso de sucesso, esse recurso retorna o HTTP status code 204 No Content.
     */
    public async deletarVendedor(id_vendedor: string | number): Promise<boolean> {
        const path = this.path + `/${id_vendedor}`;
        const resp = await this.http.delete(path);
        return resp;
    }
}