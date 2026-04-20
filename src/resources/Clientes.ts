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
    private readonly path: string;

    constructor(private readonly http: HttpClient) { this.path = "/clientes" }

    /**
     * Retorna os clientes de acordo com os parâmetros (filtros) informados.
     * Todos os parâmetros são opcionais e podem ser combinados.
     */
    async buscarTodos(queryParameters?: Clientes_BuscarTodosObjReq): Promise<Clientes_BuscarTodosRespOk> {
        if (queryParameters?.href) {
            const path: string = this.path + queryParameters.href.split(this.path)[1];
            const resp = await this.http.get<Clientes_BuscarTodosRespOk>(path);
            return resp;
        }

        let path = this.path;

        if (queryParameters) {
            const params = new URLSearchParams();

            if (queryParameters.alterado_apos) {
                params.append("alterado_apos", String(queryParameters.alterado_apos));
            }

            if (queryParameters.cnpjcpf) {
                params.append("cnpjcpf", String(queryParameters.cnpjcpf));
            }

            if (queryParameters.codigo) {
                params.append("codigo", String(queryParameters.codigo));
            }

            if (queryParameters.excluido !== undefined) {
                params.append("excluido", String(queryParameters.excluido));
            }

            if (queryParameters.id_parceiro) {
                params.append("id_parceiro", String(queryParameters.id_parceiro));
            }

            if (queryParameters.pagina !== undefined) {
                params.append("pagina", String(queryParameters.pagina));
            }

            const queryString = params.toString();
            if (queryString) {
                path += `?${queryString}`;
            }
        }

        const resp = await this.http.get<Clientes_BuscarTodosRespOk>(path);
        return resp;
    }

    /**
     * Retorna o cliente como o id no PedidoOK.
     */
    async buscarPorId(id: string | number): Promise<Clientes_BuscarPorIdRespOk> {
        const path = this.path + `/${id}`;
        const resp = await this.http.get<Clientes_BuscarPorIdRespOk>(path);
        return resp;
    }

    /**
     * Insere um novo cliente no PedidoOK.
     */
    async inserirCliente(obj: Clientes_InserirObj): Promise<Clientes_InserirRespOk> {
        const resp = await this.http.post<Clientes_InserirRespOk>(this.path, obj);
        return resp;
    }

    /**
     * Altera todos os campos do registro do cliente.
     * ATENÇÃO: Se algum campo for omitido no JSON, será atribuído o valor padrão para esse campo de acordo com o seu tipo (zero, string vazia ou nulo).
     * Considere a utilização da alteração parcial com o método PATCH.
     */
    async alterarCliente(id: string | number, obj: Clientes_AlterarObj): Promise<Clientes_AlterarRespOk> {
        const path = this.path + `/${id}`;
        const resp = await this.http.put<Clientes_AlterarRespOk>(path, obj);
        return resp;
    }

    /**
     * Altera campo(s) específico(s) do registro do cliente.
     * Somente os campos informados no JSON terão seus valores alterados.
     */
    async alterarClienteParcial(id: string | number, obj: Clientes_AlterarParcialObj): Promise<Clientes_AlterarParcialRespOk> {
        const path = this.path + `/${id}`;
        const resp = this.http.patch<Clientes_AlterarParcialRespOk>(path, obj);
        return resp;
    }

    /**
     * Exclui um cliente do PedidoOK.
     * Em caso de sucesso, esse recurso retorna o HTTP status code 204 No Content.
     */
    async deletarCliente(id: string | number): Promise<Boolean> {
        const path = this.path + `/${id}`;
        const resp = this.http.delete(path);
        return resp;
    }

    /**
     * Reativa um cliente excluído.
     */
    async reativarCliente(id: string | number): Promise<Clientes_ReativarClienteRespOk> {
        const path = this.path + `/${id}/undelete`;
        const resp = this.http.patch<Clientes_ReativarClienteRespOk>(path);
        return resp;
    }
}