import type { HttpClient } from "../clients/HttpClient";
import type { Produtos_AlterarProduct, Produtos_AlterarProductParcial, Produtos_AlterarProductParcialRespOk, Produtos_AlterarProductRespOk, Produtos_BuscarPorIdResoOk, Produtos_BuscarTodosRespOk, Produtos_InserirProdBody, Produtos_InserirRespOk, Produtos_ReativarProductRespOk } from "../types/Produtos.types";

export class PedidoOk_Produtos {
    private readonly path: "/produtos"

    constructor(private readonly http: HttpClient) { this.path = "/produtos"; }

    async buscarTodos(href_proxima_pagina?: string): Promise<Produtos_BuscarTodosRespOk> { /** Busca somente a primeira página */
        if (href_proxima_pagina) {
            const url = new URL(href_proxima_pagina).searchParams;
            const pagina = url.get("pagina");

            const resp = await this.http.get<Produtos_BuscarTodosRespOk>(`${this.path}/?pagina=${pagina}`);
            return resp;
        }

        const resp = await this.http.get<Produtos_BuscarTodosRespOk>(this.path);
        return resp;
    }

    async buscarPorId(id: string | number): Promise<Produtos_BuscarPorIdResoOk> {
        const path = this.path + `/${id}`;
        const resp = this.http.get<Produtos_BuscarPorIdResoOk>(path);
        return resp;
    }

    async inserirProduto(body: Produtos_InserirProdBody): Promise<Produtos_InserirRespOk> {
        const resp = await this.http.post<Produtos_InserirRespOk>(this.path, body);
        return resp;
    }

    async alterarProduto(id: number | string, product: Produtos_AlterarProduct): Promise<Produtos_AlterarProductRespOk> {
        const path = this.path + `/${id}`;
        const resp = await this.http.put<Produtos_AlterarProductRespOk>(path, product);
        return resp;
    }

    async alterarProdutoParcial(id: number | string, product: Produtos_AlterarProductParcial): Promise<Produtos_AlterarProductParcialRespOk> {
        const path = this.path + `/${id}`;
        const resp = await this.http.patch<Produtos_AlterarProductParcialRespOk>(path, product);
        return resp;
    }

    async deletarProduto(id: number | string): Promise<Boolean> { /** A resposta geralmente é "null" */
        const path = this.path + `/${id}`;
        const resp = await this.http.delete(path);
        
        return resp;
    }

    async reativarProduto(id: number | string): Promise<Produtos_ReativarProductRespOk> {
        const path = this.path + `/${id}/undelete`;
        const resp = await this.http.patch<Produtos_ReativarProductRespOk>(path);
        return resp;
    }
}