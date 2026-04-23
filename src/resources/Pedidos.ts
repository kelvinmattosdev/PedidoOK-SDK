import type { HttpClient } from "../clients/HttpClient";
import type { Pedidos_AlterarCabecalhoObjReq, Pedidos_AlterarCabecalhoRespOk, Pedidos_AlterarItemObjReq, Pedidos_AlterarItemRespOk, Pedidos_BuscarPorIdRespOk, Pedidos_BuscarTodosObjReq, Pedidos_BuscarTodosRespOk, Pedidos_InserirItemObjReq, Pedidos_InserirItemRespOk, Pedidos_InserirPedidoObjReq, Pedidos_InserirPedidoRespOk, Pedidos_ReativarPedidoRespOk } from "../types/Pedidos.types";

export class PedidoOk_Pedidos {
    private readonly path: string;
    constructor(private readonly http: HttpClient) { this.path = "/pedidos"; }

    private paramsInUrl(params: Record<string, unknown> | undefined): string {
        if (!params) return '';

        const query = new URLSearchParams(
            Object.entries(params)
                .filter(([, value]) => value !== undefined && value !== null)
                .map(([key, value]): [string, string] => [key, String(value)])
        ).toString();

        return query ? `?${query}` : '';
    }

    /**
     * Retorna os pedidos de acordo com os parâmetros (filtros) informados.
     * Todos os parâmetros são opcionais e podem ser combinados.
     */
    public async buscarTodos(obj?: Pedidos_BuscarTodosObjReq): Promise<Pedidos_BuscarTodosRespOk> {
        const path = this.path + this.paramsInUrl(obj);
        const resp = await this.http.get<Pedidos_BuscarTodosRespOk>(path);
        return resp;
    }

    /**
     * Retorna o pedido como o id no PedidoOK.
     */
    public async buscarPorId(id: string | number): Promise<Pedidos_BuscarPorIdRespOk> {
        const path = this.path + `/${id}`;
        const resp = await this.http.get<Pedidos_BuscarPorIdRespOk>(path);
        return resp;
    }

    /**
     * Insere um novo pedido no PedidoOK.
     */
    public async inserirPedido(obj: Pedidos_InserirPedidoObjReq): Promise<Pedidos_InserirPedidoRespOk> {
        const resp = await this.http.post<Pedidos_InserirPedidoRespOk>(this.path, obj);
        return resp;
    }

    /**
     * Exclui um pedido do PedidoOK.
     * Em caso de sucesso, esse recurso retorna true.
     */
    public async deletarPedido(id: string | number): Promise<Boolean> {
        const path = this.path + `/${id}`;
        const resp = await this.http.delete(path);
        return resp;
    }

    /**
     * Reativa um pedido excluído.
     */
    public async reativarPedido(id: string | number): Promise<Pedidos_ReativarPedidoRespOk> {
        const path = this.path + `/${id}/undelete`;
        const resp = await this.http.patch<Pedidos_ReativarPedidoRespOk>(path);
        return resp;
    }

    /**
     * Altera campo(s) específico(s) do cabeçalho do pedido.
     * Somente os campos informados no JSON terão seus valores alterados.
     * Esse método não considera o campo itens
     */
    public async alterarCabecalho(id: string | number, obj: Pedidos_AlterarCabecalhoObjReq): Promise<Pedidos_AlterarCabecalhoRespOk> {
        const path = this.path + `/${id}/cabecalho`;
        const resp = await this.http.patch<Pedidos_AlterarCabecalhoRespOk>(path, obj);
        return resp;
    }

    /**
     * Altera campo(s) específico(s) do item do pedido.
     * Somente os campos informados no JSON terão seus valores alterados.
     */
    public async alterarItem(
        id_pedido: string | number,
        id_produto: string | number,
        item: Pedidos_AlterarItemObjReq
    ): Promise<Pedidos_AlterarItemRespOk> {
        const path = this.path + `/${id_pedido}/itens/${id_produto}`;
        const resp = await this.http.patch<Pedidos_AlterarItemRespOk>(path, item);
        return resp;
    }

    /**
     * Insere novo(s) item(ns) no pedido do PedidoOK.
     * O PedidoOK não permite duplicidade de produtos dentro do mesmo pedido, dessa forma se ocorrer alguma falha no recebimento da resposta do servidor, a requisição para inserção pode ser feita novamente sem o risco de duplicidade.
     */
    public async inserirItem(id_pedido: string | number, items: Pedidos_InserirItemObjReq): Promise<Pedidos_InserirItemRespOk> {
        const path = this.path + `/${id_pedido}/itens`;
        const resp = await this.http.post<Pedidos_InserirItemRespOk>(path, items);
        return resp;
    }

    /**
     * Exclui um item do pedido no PedidoOK.
     * Em caso de sucesso, esse recurso retorna true.
     */
    public async deletarItem(id_pedido: string | number, id_produto: string | number): Promise<Boolean>{
        const path = this.path + `/${id_pedido}/itens/${id_produto}`;
        const resp = await this.http.delete(path);
        return resp;
    }
}