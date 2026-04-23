import type { HttpClient } from "../clients/HttpClient";
import type {
    Clientes_AlterarObj,
    Clientes_AlterarParcialObj,
    Clientes_AlterarParcialRespOk,
    Clientes_AlterarRespOk,
    Clientes_BuscarPorIdRespOk,
    Clientes_BuscarTodosObjReq,
    Clientes_BuscarTodosRespOk,
    Clientes_InserirObj,
    Clientes_InserirRespOk,
    Clientes_ReativarClienteRespOk
} from "../types/Clientes.types";

export class PedidoOk_Clientes {
    private readonly path: "/clientes";

    constructor(private readonly http: HttpClient) { this.path = "/clientes" }

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
     * Retorna os clientes de acordo com os parâmetros (filtros) informados.
     * Todos os parâmetros são opcionais e podem ser combinados.
     */
    public async buscarTodos(obj?: Clientes_BuscarTodosObjReq): Promise<Clientes_BuscarTodosRespOk> {
        if (obj && 'href' in obj) {
            const path = this.hrefToRelativePath(obj.href);
            const resp = await this.http.get<Clientes_BuscarTodosRespOk>(path);
            return resp;
        }

        const path = this.path + this.paramsInUrl(obj);
        const resp = await this.http.get<Clientes_BuscarTodosRespOk>(path);
        return resp;
    }

    /**
     * Retorna o cliente como o id no PedidoOK.
     */
    public async buscarPorId(id: string | number): Promise<Clientes_BuscarPorIdRespOk> {
        const path = this.path + `/${id}`;
        const resp = await this.http.get<Clientes_BuscarPorIdRespOk>(path);
        return resp;
    }

    /**
     * Insere um novo cliente no PedidoOK.
     */
    public async inserirCliente(obj: Clientes_InserirObj): Promise<Clientes_InserirRespOk> {
        const resp = await this.http.post<Clientes_InserirRespOk>(this.path, obj);
        return resp;
    }

    /**
     * Altera todos os campos do registro do cliente.
     * ATENÇÃO: Se algum campo for omitido no JSON, será atribuído o valor padrão para esse campo de acordo com o seu tipo (zero, string vazia ou nulo).
     * Considere a utilização da alteração parcial com o método PATCH.
     */
    public async alterarCliente(id: string | number, obj: Clientes_AlterarObj): Promise<Clientes_AlterarRespOk> {
        const path = this.path + `/${id}`;
        const resp = await this.http.put<Clientes_AlterarRespOk>(path, obj);
        return resp;
    }

    /**
     * Altera campo(s) específico(s) do registro do cliente.
     * Somente os campos informados no JSON terão seus valores alterados.
     */
    public async alterarClienteParcial(id: string | number, obj: Clientes_AlterarParcialObj): Promise<Clientes_AlterarParcialRespOk> {
        const path = this.path + `/${id}`;
        const resp = await this.http.patch<Clientes_AlterarParcialRespOk>(path, obj);
        return resp;
    }

    /**
     * Exclui um cliente do PedidoOK.
     * Em caso de sucesso, esse recurso retorna o HTTP status code 204 No Content.
     */
    public async deletarCliente(id: string | number): Promise<boolean> {
        const path = this.path + `/${id}`;
        const resp = await this.http.delete(path);
        return resp;
    }

    /**
     * Reativa um cliente excluído.
     */
    public async reativarCliente(id: string | number): Promise<Clientes_ReativarClienteRespOk> {
        const path = this.path + `/${id}/undelete`;
        const resp = await this.http.patch<Clientes_ReativarClienteRespOk>(path, undefined);
        return resp;
    }
}