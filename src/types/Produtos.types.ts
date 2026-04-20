import type { ISODateString } from "./Global.types";

export type PedidoOkProduto = {
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

export type BuscarTodosRespOk = {
    href_proxima_pagina: string | null;
    produtos: Array<PedidoOkProduto>;
}

export type BuscarPorIdResoOk = { produto: PedidoOkProduto }
export type InserirRespOk = { produto: PedidoOkProduto }
export type AlterarProductRespOk = { produto: PedidoOkProduto }
export type AlterarProductParcialRespOk = { produto: PedidoOkProduto }
export type ReativarProductRespOk = { produto: PedidoOkProduto }

export type InserirProdBody = Omit<PedidoOkProduto, "excluido" | "ultima_alteracao" | "id">;


export type AlterarProduct = Omit<PedidoOkProduto, "excluido" | "ultima_alteracao" | "id">
export type AlterarProductParcial = Partial<AlterarProduct>;
