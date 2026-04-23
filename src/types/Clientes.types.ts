import type { ISODateString } from "./Global.types";

export type Clientes_BuscarTodosObjReq =
    | {
        /**
         * Retorna os registros alterados após a data e hora informados.
         * Se esse parâmetro for omitido, todos os registros serão retornados.
         * Formato: YYYY-MM-DDTHH:MM:SS
         */
        alterado_apos?: ISODateString;

        /**
         * Retorna os registros excluídos (true) ou os registros ativos (false).
         * Se esse parâmetro for omitido, os registros excluídos e ativos serão retornados.
         */
        excluido?: boolean;

        /**
         * Retorna os registros com o código específico.
         */
        codigo?: string;

        /**
         * Retorna os registros com o CNPJ ou CPF específico.
         * A documentação usa o nome do parâmetro como "cnpjcpf".
         */
        cnpjcpf?: number;

        /**
         * Retorna o registro com o id_parceiro específico.
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
         * Se enviado, os outros parâmetros são ignorados.
         */
        href: string;

        alterado_apos?: never;
        excluido?: never;
        codigo?: never;
        cnpjcpf?: never;
        id_parceiro?: never;
        pagina?: never;
    };

export type EnderecoEnvelope = {
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
};

export type ReferenciaBancaria = {
    banco: string;
    agencia: string;
    conta: string;
    gerente: string;
    telefone: string;
};

export type ReferenciaComercial = {
    empresa: string;
    contato: string;
    telefone: string;
};

export type Contato = {
    dia_aniversario: number;
    excluido: boolean;
    telefone1: string;
    ultima_alteracao: ISODateString;
    mes_aniversario: number;
    departamento: string;
    nome: string;
    id_parceiro: string | null;
    id: number;
    telefone2: string;
    email: string;
};

export type Clientes_Cliente = {
    id: number;
    ultima_alteracao: ISODateString;
    excluido: boolean;
    id_parceiro: string | null;
    codigo: string;
    razao_social: string;
    fantasia: string;
    cnpj_cpf: string;
    telefone: string;
    ie_rg: string;
    email_copia_pedido: string;
    endereco: EnderecoEnvelope;
    ponto_de_referencia: string;
    endereco_cobranca: EnderecoEnvelope;
    endereco_entrega: EnderecoEnvelope;
    limite_credito: number;
    email_xml_nfe: string;
    segmento: string;
    observacao: string;
    referencias_bancarias: ReferenciaBancaria[];
    referencias_comerciais: ReferenciaComercial[];
    contatos?: Contato[];
    latitude: number;
    longitude: number;
    atendimento: string;
};

export type Clientes_BuscarTodosRespOk = {
    href_proxima_pagina: string | null;
    clientes: Clientes_Cliente[];
};

export type Clientes_BuscarPorIdRespOk = {
    cliente: Clientes_Cliente;
};

export type Clientes_InserirObj = {
    id_parceiro: string;
    codigo: string;
    razao_social: string;

    fantasia?: string;
    cnpj_cpf?: string;
    telefone?: string;
    ie_rg?: string;
    email_copia_pedido?: string;
    endereco?: EnderecoEnvelope;
    ponto_de_referencia?: string;
    endereco_cobranca?: EnderecoEnvelope;
    endereco_entrega?: EnderecoEnvelope;
    limite_credito?: number;
    email_xml_nfe?: string;
    segmento?: string;
    observacao?: string;
    referencias_bancarias?: ReferenciaBancaria[];
    referencias_comerciais?: ReferenciaComercial[] | null;
    latitude?: number;
    longitude?: number;
    atendimento?: string;
};

export type Clientes_InserirRespOk = {
    cliente: Clientes_Cliente;
};

export type Clientes_AlterarObj = {
    id_parceiro?: string;
    codigo: string;
    razao_social: string;

    fantasia?: string;
    cnpj_cpf?: string;
    telefone?: string;
    ie_rg?: string;
    email_copia_pedido?: string;
    endereco?: EnderecoEnvelope;
    ponto_de_referencia?: string;
    endereco_cobranca?: EnderecoEnvelope;
    endereco_entrega?: EnderecoEnvelope;
    limite_credito?: number;
    email_xml_nfe?: string;
    segmento?: string;
    observacao?: string;
    referencias_bancarias?: ReferenciaBancaria[];
    referencias_comerciais?: ReferenciaComercial[] | null;
    latitude?: number;
    longitude?: number;
    atendimento?: string;
};

export type Clientes_AlterarRespOk = {
    cliente: Clientes_Cliente;
};

type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[K] extends object
    ? DeepPartial<T[K]>
    : T[K];
};

export type Clientes_AlterarParcialObj = DeepPartial<Clientes_AlterarObj>;

export type Clientes_AlterarParcialRespOk = {
    cliente: Clientes_Cliente;
};

export type Clientes_ReativarClienteRespOk = {
    cliente: Clientes_Cliente;
};