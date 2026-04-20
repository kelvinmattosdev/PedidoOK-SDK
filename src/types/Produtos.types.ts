import type { ISODateString } from "./Global.types";

export type Produtos_PedidoOkProduto = {
    excluido: boolean;
    codigo: string
    observacao: string;
    ipi: number;
    peso: number;
    codigo_barra: string;
    qtd_embalagem: number;
    categoria: string;
    nome: string;
    id_parceiro: string;
    grades: string[]; /** VARIAÇÕES */
    validade: ISODateString | null;
    estoque: number;
    marca: string;
    venda: number;
    comissao: number;
    ultima_alteracao: ISODateString,
    custo: number;
    id_fornecedor: number | null;
    estoque_minimo: number;
    ncm: string;
    id: number;
    embalagem: string;
    referencia: string;
}

export type Produtos_BuscarTodosRespOk = {
    href_proxima_pagina: string | null;
    produtos: Array<Produtos_PedidoOkProduto>;
}

export type Produtos_BuscarPorIdResoOk = { produto: Produtos_PedidoOkProduto }
export type Produtos_InserirRespOk = { produto: Produtos_PedidoOkProduto }
export type Produtos_AlterarProductRespOk = { produto: Produtos_PedidoOkProduto }
export type Produtos_AlterarProductParcialRespOk = { produto: Produtos_PedidoOkProduto }
export type Produtos_ReativarProductRespOk = { produto: Produtos_PedidoOkProduto }

export type Produtos_InserirProdBody = Omit<Produtos_PedidoOkProduto, "excluido" | "ultima_alteracao" | "id">;


export type Produtos_AlterarProduct = Omit<Produtos_PedidoOkProduto, "excluido" | "ultima_alteracao" | "id">
export type Produtos_AlterarProductParcial = Partial<Produtos_AlterarProduct>;
