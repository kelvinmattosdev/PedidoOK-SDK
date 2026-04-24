import type { ISODateString } from "./Global.types";

// * ===== TIPOS GENÉRICOS =====
export type Vendedores_Vendedor = {
    /**
     * Identificador único do registro no PedidoOK
     * !  Esse campo é retornado pelo GET, mas não pode ser alterado pelo POST, PUT ou PATCH.
     */
    id: number;

    /**
     * !  Esse campo é retornado pelo GET, mas não pode ser alterado pelo POST, PUT ou PATCH.
     */
    ultima_alteracao: ISODateString;

    /**
     * !  Esse campo é retornado pelo GET, mas não pode ser alterado pelo POST, PUT ou PATCH.
     */
    excluido: boolean;

    /**
     * Validade da licença associada ao vendedor
     * !  Esse campo é retornado pelo GET, mas não pode ser alterado pelo POST, PUT ou PATCH.
     */
    validade_licenca: ISODateString;

    /**
     * código único utilizado para ativação do App do vendedor
     * !  Esse campo é retornado pelo GET, mas não pode ser alterado pelo POST, PUT ou PATCH.
     */
    codigo_ativacao: string;

    /**
     * Identificador único do registro no ERP do parceiro
     */
    id_parceiro: string;

    nome: string;

    /**
     * Região em que atua
    */
    regiao: string;

    informacao_adicional: string;
}

// * ===== TIPOS DE PARÂMETROS =====
export type Vendedores_BuscarTodosObjReq = Partial<{
    /**
     * Retorna somente os registros alterados após a data/hora informados. Se esse parâmetro for omitido, todos os registros serão retornados.
     * Formato:YYYY-MM-DDTHH:MM:SS
     */
    alterado_apos: ISODateString;

    /**
     * Retorna os registros excluídos (true) ou os registros ativos (false) . Se esse parâmetro for omitido, os registros excluídos e ativos serão retornados.
     * Formato: true/false
     */
    excluido: boolean;

    /**
     * Retorna os registros com o nome específico
     */
    nome: string;

    /**
     * Retorna os registros com o id_parceiro específico
     */
    id_parceiro: string;

    /**
     * Retorna os registros referentes a página informada
    */
    pagina: number;
}> | {
    href: string;
    alterado_apos?: never;
    excluido?: never;
    nome?: never;
    id_parceiro?: never;
    pagina?: never;
}
export type Vendedores_InserirVendedorObjReq = Partial<Omit<Vendedores_Vendedor,
    'id' | 'ultima_alteracao' | 'excluido' | 'validade_licenca' | 'codigo_ativacao' | //? Não tem como inserir
    'nome' | 'id_parceiro'  //? Obrigatórios para inserção de um novo vendedor
>> & Required<Pick<Vendedores_Vendedor, 'nome' | 'id_parceiro'>>;
export type Vendedores_AlterarVendedorObjReq = Partial<Omit<Vendedores_Vendedor,
    'id' | 'ultima_alteracao' | 'excluido' | 'validade_licenca' | 'codigo_ativacao' | //? Não tem como alterar
    'nome' //? Obrigatório para alteração do vendedor
>> & Required<Pick<Vendedores_Vendedor, 'nome'>>;
export type Vendedores_AlterarVendedorParcialObjReq = Partial<Vendedores_AlterarVendedorObjReq>;


// * ===== TIPOS DE RESPOSTA =====
export type Vendedores_BuscarTodosRespOk = {
    href_proxima_pagina: string | null;
    vendedores: Array<Vendedores_Vendedor>;
}
export type Vendedores_BuscarPorIdRespOk = { vendedor: Vendedores_Vendedor };
export type Vendedores_InserirVendedorRespOk = { vendedor: Vendedores_Vendedor }
export type Vendedores_AlterarVendedorRespOk = { vendedor: Vendedores_Vendedor }
export type Vendedores_AlterarVendedorParcialRespOk = { vendedor: Vendedores_Vendedor }