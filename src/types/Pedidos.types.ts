import type { ISODateString } from "./Global.types"

//? Genéricos
type PeloMenosUm<T> = [T, ...T[]];

type Pedidos_Grade = {
    tamanho_cor: string;
    quantidade: number;
};

type Pedidos_Item = {
    excluido: boolean;
    preco_bruto: number;
    observacao: string;
    ultima_alteracao: ISODateString;
    qtd_embalagem: number;
    percentual_desconto_acrescimo: number;
    embalagem: string;
    preco_liquido: number;
    grades: Array<Pedidos_Grade>;
    preco_custo: number;

    /**
     * id do produto no PedidoOK
     */
    id_produto: number;
    quantidade: number;
}

type Pedidos_Pedido = {
    situacao: 'entregue' | 'separado' | 'concluido' | 'pago' | 'faturado' | 'pendente';
    base_vencimento: 'emissao' | 'entrega' | 'faturamento';

    /**
     * Se null, o PedidoOk atribuirá um número automaticamente
     */
    numero: number | null;
    observacao_cliente: string;
    tipo_desconto_acrescimo: 'percentual' | 'monetario';
    forma_pagamento: 'voucher' | 'boleto' | 'cartao credito' | 'cartao debito' | 'dinheiro' | 'deposito em conta' | 'cheque';
    transportadora_contato: string;
    ultima_alteracao: ISODateString;
    observacao_representada: string;

    /**
     * 	Identificador único do registro no PedidoOK
     */
    id: number;

    /**
     * Formato YYYY-MM-DD
     */
    emissao: string;

    /**
     * Data de faturamento no formato YYYY-MM-DD
     */
    faturamento: string | null;
    tipo_frete: 'FOB' | 'CIF' | '';
    excluido: boolean;

    /**
     * id da tabela de preço no PedidoOK
     */
    id_tabela_preco: number | null;
    itens: Array<Pedidos_Item>;

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
    previsao_entrega: string | null;
    valor_frete: number;

    /**
     * Prazos referentes a condição de pagamento;
     * Quando não existir nenhuma condição de pagamento cadastra no PedidoOK, o usuário pode informar os prazos manualmente, nesse caso o campo id_cond_pagto fica null.
     */
    condicao_pagamento: number[];

    /**
     * Valores negativos representam desconto, valores positivos representam
     */
    valor_desconto_acrescimo: number;
    status: 'troca' | 'bonificacao' | 'orcamento' | 'pedido';
};

type Pedidos_Cabecalho = Omit<
    Pedidos_Pedido,
    "id" | "ultima_alteracao" | "itens"
>;

export type Pedidos_BuscarTodosObjReq = {
    /**
     * Retorna somente os registros alterados após a data/hora informados. Se esse parâmetro for omitido, todos os registros serão retornados.
     * Formato:YYYY-MM-DDTHH:MM:SS
     */
    alterado_apos?: ISODateString;

    /**
     * Retorna os registros excluídos (true) ou os registros ativos (false) . Se esse parâmetro for omitido, os registros excluídos e ativos serão retornados.
     * Formato: true/false
     */
    excluido?: boolean;

    /**
     * Retorna os registros com o número específico
     */
    numero?: number;

    /**
     * Retorna os registros com o id_parceiro específico
     */
    id_parceiro?: string;

    /**
     * Retorna os registros referentes a página informada
     */
    pagina?: number;
};

export type Pedidos_BuscarTodosRespOk = {
    href_proxima_pagina: string | null;
    pedidos: Array<Pedidos_Pedido>
};

export type Pedidos_BuscarPorIdRespOk = { pedido: Pedidos_Pedido };

export type Pedidos_InserirPedidoObjReq = Partial<Omit<Pedidos_Pedido,
    "ultima_alteracao" | "id" | "excluido" | //? Não faz parte
    "id_cliente" | "id_vendedor" | "emissao" | "id_parceiro" | "status" //? Obrigatório
>> & Required<Pick<Pedidos_Pedido, "id_cliente" | "id_vendedor" | "emissao" | "id_parceiro" | "status">>;

export type Pedidos_InserirPedidoRespOk = { pedido: Pedidos_Pedido };
export type Pedidos_ReativarPedidoRespOk = { pedido: Pedidos_Pedido };
export type Pedidos_AlterarCabecalhoRespOk = { pedido: Pedidos_Pedido };
export type Pedidos_AlterarItemRespOk = { pedido: Pedidos_Pedido };
export type Pedidos_InserirItemRespOk = { pedido: Pedidos_Pedido };

export type Pedidos_AlterarCabecalhoObjReq = Partial<Pedidos_Cabecalho>;
export type Pedidos_AlterarItemObjReq = Partial<Omit<Pedidos_Item, 'excluido' | 'ultima_alteracao' | 'id_produto'>>;

type Pedidos_InserirItem = Partial<Omit<Pedidos_Item,
    'excluido' | 'ultima_alteracao' | //? Não tem
    'quantidade' | 'embalagem' | 'id_produto' //? Obrigatórios
>> & Required<Pick<Pedidos_Item, 'quantidade' | 'embalagem' | 'id_produto'>>

export type Pedidos_InserirItemObjReq = { itens: PeloMenosUm<Pedidos_InserirItem> };