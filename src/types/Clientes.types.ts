import type { ISODateString } from "./Global.types";

export type Clientes_BuscarTodosObjReq = {
    /** Retorna os registros alterados após a data e hora informados. 
     * Se esse parâmetro for omitido, todos os registros serão retornados.
     * Formato:YYYY-MM-DDTHH:MM:SS
     * */
    alterado_apos?: ISODateString;

    /**
     * Retorna os registros excluídos (true) ou os registros ativos (false) .
     * Se esse parâmetro for omitido, os registros excluídos e ativos serão retornados.
     * Formato: true/false
     */
    excluido?: boolean;

    /**
     * Retorna os registros com o código específico
     */
    codigo?: string | number;

    /**
     * Retorna os registros com o CNPJ ou CPF específico
     */
    cnpjcpf?: number;

    /**
     * Retorna o registro com o id_parceiro específico
     */
    id_parceiro?: string;

    /**
     * Retorna os registros referentes a página informada
     */
    pagina?: string;

    /**
     * Se enviado ele busca diretamente a partir daquela URL
     * Obs.: Se enviado todos os outros parâmetros são ignorados, só serão considerado os parâmetros já inclusos no href
     */
    href?: string;
}

export type ReferenciaBancaria = {
    telefone: string;
    conta: string;
    banco: string;
    agencia: string;
    gerente: string;
}

export type EnderecoEnvelope = {
    uf: string;
    cidade: string;
    complemento: string;
    numero: string;
    logradouro: string;
    bairro: string;
    cep: string;
}

export type ReferenciaComercial = {
    telefone: string;
    empresa: string;
    contato: string;
}

export type Contato = {
    dia_aniversario: number;
    excluido: boolean;
    telefone1: string;
    ultima_alteracao: string;
    mes_aniversario: number
    departamento: string;
    nome: string;
    id_parceiro: string | null;
    id: number
    telefone2: string;
    email: string;
}

export type Clientes_BuscarTodosRespOk = {
    href_proxima_pagina: string | null;
    clientes: Array<{
        endereco_entrega: EnderecoEnvelope;
        telefone: string;
        observacao: string;
        limite_credito: number;
        referencias_bancarias: Array<ReferenciaComercial> | null;
        latitude: number;
        ie_rg: "ISENTO" | string;
        email_copia_pedido: string;
        ultima_alteracao: string;
        razao_social: string;
        id: number
        cnpj_cpf: string;
        longitude: number;
        endereco_cobranca: EnderecoEnvelope;
        excluido: boolean;
        codigo: string | number;
        endereco: EnderecoEnvelope;
        contatos: Array<Contato>;
        id_parceiro: string | null;
        atendimento: string;
        referencias_comerciais: Array<ReferenciaComercial>;
        fantasia: string;
        segmento: string;
        email_xml_nfe: string;
        ponto_de_referencia: string;
    }>
}

export type Clientes_BuscarPorIdRespOk = {
    cliente: {
        endereco_entrega: EnderecoEnvelope;
        endereco_cobranca: EnderecoEnvelope;
        excluido: boolean;
        codigo: string | number;
        telefone: string;
        observacao: string;
        endereco: EnderecoEnvelope;
        limite_credito: number;
        referencias_bancarias: Array<ReferenciaBancaria>;
        latitude: number;
        id_parceiro: string | null;
        atendimento: string;
        ie_rg: "ISENTO" | string;
        email_copia_pedido: string;
        referencias_comerciais: Array<ReferenciaComercial> | null;
        fantasia: string;
        segmento: string;
        ultima_alteracao: ISODateString
        email_xml_nfe: string;
        razao_social: string;
        ponto_de_referencia: string;
        id: number;
        cnpj_cpf: string;
        longitude: number;
    }
}

export type Clientes_InserirObj = {
    endereco_entrega?: EnderecoEnvelope;
    endereco_cobranca?: EnderecoEnvelope;
    codigo: string | number;
    telefone?: string;
    observacao?: string;
    endereco?: EnderecoEnvelope;
    limite_credito?: number;
    referencias_bancarias?: Array<ReferenciaBancaria>;
    latitude?: number;
    id_parceiro: string;
    atendimento?: string;
    ie_rg?: string;
    email_copia_pedido?: string;
    referencias_comerciais?: Array<ReferenciaComercial> | null;
    fantasia?: string;
    segmento?: string;
    email_xml_nfe?: string;
    razao_social: string;
    ponto_de_referencia?: string;
    cnpj_cpf?: string;
    longitude?: number;
}

export type Clientes_InserirRespOk = {
    cliente: Required<Clientes_InserirObj> & { id: number, excluido: boolean, ultima_alteracao: ISODateString };
}

export type Clientes_AlterarObj = Omit<Clientes_InserirObj, 'id_parceiro'> & { id_parceiro?: string };
export type Clientes_AlterarRespOk = Clientes_InserirRespOk;

export type Clientes_AlterarParcialObj = Partial<Clientes_AlterarObj> ;
export type Clientes_AlterarParcialRespOk = Clientes_InserirRespOk;

export type Clientes_ReativarClienteRespOk = Clientes_InserirRespOk;