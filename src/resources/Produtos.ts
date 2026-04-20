import type { HttpClient } from "../clients/HttpClient";
import type { AlterarProduct, AlterarProductParcial, AlterarProductParcialRespOk, AlterarProductRespOk, BuscarPorIdResoOk, BuscarTodosRespOk, InserirProdBody, InserirRespOk, ReativarProductRespOk } from "../types/Produtos.types";

export class PedidoOk_Produtos {
    private readonly path: "/produtos"

    constructor(private readonly http: HttpClient) { this.path = "/produtos"; }

    async buscarTodos(href_proxima_pagina?: string): Promise<BuscarTodosRespOk> { /** Busca somente a primeira página */
        if (href_proxima_pagina) {
            const url = new URL(href_proxima_pagina).searchParams;
            const pagina = url.get("pagina");

            const resp = await this.http.get<BuscarTodosRespOk>(`${this.path}/?pagina=${pagina}`);
            return resp;
        }

        const resp = await this.http.get<BuscarTodosRespOk>(this.path);
        return resp;
    }

    async buscarPorId(id: string | number): Promise<BuscarPorIdResoOk> {
        const path = this.path + `/${id}`;
        const resp = this.http.get<BuscarPorIdResoOk>(path);
        return resp;
    }

    async inserirProduto(body: InserirProdBody): Promise<InserirRespOk> {
        const resp = await this.http.post<InserirRespOk>(this.path, body);
        return resp;
    }

    async alterarProduto(id: number | string, product: AlterarProduct): Promise<AlterarProductRespOk> {
        const path = this.path + `/${id}`;
        const resp = await this.http.put<AlterarProductRespOk>(path, product);
        return resp;
    }

    async alterarProdutoParcial(id: number | string, product: AlterarProductParcial): Promise<AlterarProductParcialRespOk> {
        const path = this.path + `/${id}`;
        const resp = await this.http.patch<AlterarProductParcialRespOk>(path, product);
        return resp;
    }

    async deletarProduto(id: number | string): Promise<Boolean> { /** A resposta geralmente é "null" */
        const path = this.path + `/${id}`;
        const resp = await this.http.delete(path);
        
        return resp;
    }

    async reativarProduto(id: number | string): Promise<ReativarProductRespOk> {
        const path = this.path + `/${id}/undelete`;
        const resp = await this.http.patch<ReativarProductRespOk>(path);
        return resp;
    }
}