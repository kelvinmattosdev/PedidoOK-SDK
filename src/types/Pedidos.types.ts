import type { ISODateString } from "./Global.types";

//? Genéricos
type PeloMenosUm<T> = [T, ...T[]];
type ISODateOnlyString = string;

export type Pedidos_Grade = {
    tamanho_cor: string;
    quantidade: number;
};

export type Pedidos_Item = {
    excluido: boolean;
    preco_bruto: number;
    observacao: string;
    ultima_alteracao: ISODateString;
    qtd_embalagem: number;
    percentual_desconto_acrescimo: number;
    embalagem: string;
    preco_liquido: number;
    grades: Pedidos_Grade[];
    preco_custo: number;

    /**
     * id do produto no PedidoOK
     */
    id_produto: number;

    quantidade: number;
};

export type Pedidos_Pedido = {
    /**
     * A doc de exemplo mostra esse campo como string vazia.
     */
    situacao: string;

    base_vencimento: "emissao" | "entrega" | "faturamento";

    /**
     * Se null, o PedidoOK atribuirá um número automaticamente
     */
    numero: number | null;

    observacao_cliente: string;
    tipo_desconto_acrescimo: "percentual" | "monetario";

    /**
     * A doc de exemplo mostra esse campo como string vazia.
     */
    forma_pagamento: string;

    transportadora_contato: string;
    ultima_alteracao: ISODateString;
    observacao_representada: string;

    /**
     * Identificador único do registro no PedidoOK
     */
    id: number;

    /**
     * Formato YYYY-MM-DD
     */
    emissao: ISODateOnlyString;

    /**
     * Data de faturamento no formato YYYY-MM-DD
     */
    faturamento: ISODateOnlyString | null;

    tipo_frete: "FOB" | "CIF" | "";
    excluido: boolean;

    /**
     * id da tabela de preço no PedidoOK
     */
    id_tabela_preco: number | null;

    itens: Pedidos_Item[];

    /**
     * id do vendedor no PedidoOK
     */
    id_vendedor: number;

    /**
     * id do cliente no PedidoOK
     */
    id_cliente: number;

    ordem_compra: string;

    /**
     * Identificador único do registro no ERP do parceiro
     */
    id_parceiro: string | null;

    transportadora: string;

    /**
     * Formato YYYY-MM-DD
     */
    previsao_entrega: ISODateOnlyString | null;

    valor_frete: number;

    /**
     * Prazos referentes à condição de pagamento.
     */
    condicao_pagamento: number[];

    /**
     * Valores negativos representam desconto, positivos representam acréscimo.
     */
    valor_desconto_acrescimo: number;

    /**
     * A doc de exemplo mostra "pedido".
     * Mantido como string para não restringir excessivamente.
     */
    status: string;
};

export type Pedidos_Cabecalho = Omit<
    Pedidos_Pedido,
    "id" | "ultima_alteracao" | "itens"
>;

export type Pedidos_BuscarTodosObjReq =
    | {
        /**
         * Retorna somente os registros alterados após a data/hora informados.
         * Formato: YYYY-MM-DDTHH:MM:SS
         */
        alterado_apos?: ISODateString;

        /**
         * Retorna os registros excluídos (true) ou os registros ativos (false).
         * Se omitido, retorna excluídos e ativos.
         */
        excluido?: boolean;

        /**
         * Retorna os registros com o número específico.
         */
        numero?: number;

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
        numero?: never;
        id_parceiro?: never;
        pagina?: never;
    };

export type Pedidos_BuscarTodosRespOk = {
    href_proxima_pagina: string | null;
    pedidos: Pedidos_Pedido[];
};

export type Pedidos_BuscarPorIdRespOk = {
    pedido: Pedidos_Pedido;
};

export type Pedidos_InserirPedidoObjReq = Partial<
    Omit<
        Pedidos_Pedido,
        | "ultima_alteracao"
        | "id"
        | "excluido"
        | "id_cliente"
        | "id_vendedor"
        | "emissao"
        | "id_parceiro"
        | "status"
    >
> &
    Required<
        Pick<
            Pedidos_Pedido,
            "id_cliente" | "id_vendedor" | "emissao" | "id_parceiro" | "status"
        >
    >;

export type Pedidos_InserirPedidoRespOk = {
    pedido: Pedidos_Pedido;
};

export type Pedidos_ReativarPedidoRespOk = {
    pedido: Pedidos_Pedido;
};

export type Pedidos_AlterarCabecalhoRespOk = {
    pedido: Pedidos_Pedido;
};

export type Pedidos_AlterarItemRespOk = {
    pedido: Pedidos_Pedido;
};

export type Pedidos_InserirItemRespOk = {
    pedido: Pedidos_Pedido;
};

export type Pedidos_AlterarCabecalhoObjReq = Partial<Pedidos_Cabecalho>;

export type Pedidos_AlterarItemObjReq = Partial<
    Omit<Pedidos_Item, "excluido" | "ultima_alteracao" | "id_produto">
>;

export type Pedidos_InserirItem = Partial<
    Omit<
        Pedidos_Item,
        | "excluido"
        | "ultima_alteracao"
        | "quantidade"
        | "embalagem"
        | "id_produto"
    >
> &
    Required<Pick<Pedidos_Item, "quantidade" | "embalagem" | "id_produto">>;

export type Pedidos_InserirItemObjReq = {
    itens: PeloMenosUm<Pedidos_InserirItem>;
};