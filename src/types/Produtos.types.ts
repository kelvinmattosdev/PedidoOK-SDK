import type { ISODateString } from "./Global.types";

type ISODateOnlyString = string;

export type Produtos_PedidoOkProduto = {
    excluido: boolean;
    codigo: string;
    observacao: string;
    ipi: number;
    peso: number;
    codigo_barra: string;
    qtd_embalagem: number;
    categoria: string | null;
    nome: string;
    id_parceiro: string;
    grades: string[];
    validade: ISODateOnlyString | null;
    estoque: number;
    marca: string;
    venda: number;
    comissao: number;
    ultima_alteracao: ISODateString;
    custo: number;
    id_fornecedor: number | null;
    estoque_minimo: number;
    ncm: string;
    id: number;
    embalagem: string;
    referencia: string;
};

export type Produtos_BuscarTodosRespOk = {
    href_proxima_pagina: string | null;
    produtos: Produtos_PedidoOkProduto[];
};

export type Produtos_BuscarTodosObjReq =
    | {
        /**
         * Retorna somente os registros alterados após a data/hora informados.
         * Formato: YYYY-MM-DDTHH:MM:SS
         */
        alterado_apos?: ISODateString;

        /**
         * Retorna os registros excluídos (true) ou os registros ativos (false).
         * Se omitido, retornará excluídos e ativos.
         */
        excluido?: boolean;

        /**
         * Retorna os registros com o código específico.
         */
        codigo?: string;

        /**
         * Retorna os registros com o código de barras específico.
         * A doc do filtro usa Integer, mas o campo estrutural e os exemplos usam string.
         * Mantido como string por segurança de identificador.
         */
        codigo_barra?: string;

        /**
         * Retorna os registros com o id_parceiro específico.
         */
        id_parceiro?: string;

        /**
         * Retorna os registros referentes à página informada.
         */
        pagina?: number;

        href?: never;
    }
    | {
        /**
         * Se enviado, busca diretamente a partir daquela URL.
         * Se informado, os demais parâmetros são ignorados.
         */
        href: string;

        alterado_apos?: never;
        excluido?: never;
        codigo?: never;
        codigo_barra?: never;
        id_parceiro?: never;
        pagina?: never;
    };

export type Produtos_BuscarPorIdRespOk = {
    produto: Produtos_PedidoOkProduto;
};

export type Produtos_InserirRespOk = {
    produto: Produtos_PedidoOkProduto;
};

export type Produtos_AlterarProductRespOk = {
    produto: Produtos_PedidoOkProduto;
};

export type Produtos_AlterarProductParcialRespOk = {
    produto: Produtos_PedidoOkProduto;
};

export type Produtos_ReativarProductRespOk = {
    produto: Produtos_PedidoOkProduto;
};

export type Produtos_InserirProdBody = Omit<
    Produtos_PedidoOkProduto,
    "excluido" | "ultima_alteracao" | "id"
>;

export type Produtos_AlterarProduct = Omit<
    Produtos_PedidoOkProduto,
    "excluido" | "ultima_alteracao" | "id"
>;

export type Produtos_AlterarProductParcial = Partial<Produtos_AlterarProduct>;