export type ISODateString = string; /** Ex.: 2019-04-09T10:41:31.00007 */

/**
 * ? ERROS CONHECIDOS:
 * * 2   token_parceiro não informado
 * * 3   token_pedidook não informado
 * * 4   token_parceiro inexistente
 * * 5   token_pedidook inexistente
 * * 6   token_parceiro desativado
 * * 7   token_pedidook desativado
 * * 8   token_parceiro com formato inválido
 * * 9   token_pedidook com formato inválido
 * * 10  Parâmetro inexistente
 * * 11  Valor do parâmetro inválido
 * * 12  Registro não encontrado
 * * 13  Campo obrigatório sem valor
 * * 14  Já existe um registro com o código informado
 * * 15  Valor do campo excede o limite permitido
 * * 16  Valor do campo inválido
 * * 17  Fornecedor inexistente
 * * 18  Operação não permitida em um registro excluído
 * * 19  Operação não permitida em um registro ativo
 * * 20  Existe um registro ativo com o mesmo código do registro excluído
 * * 21  Não existe licença disponível para a inclusão de um novo vendedor
 * * 22  Cliente inexistente
 * * 23  O pedido não pertence ao cliente
 * * 24  Já existe registro com o id_parceiro informado
 * * 25  Vendedor inexistente
 * * 26  Tabela de preço inexistente
 * * 27  Produto em duplicidade no pedido
 * * 28  Produto com quantidade zerada no pedido
 * * 29  Produto com embalagem não informada no pedido
 * * 30  Produto com tamanho ou cor da grade não informado no pedido
 * * 31  Produto inexistente no pedido
 * * 32  Produto inexistente
 * * 33  Pedido inexistente
 * * 34  Cobrança inexistente
 * * 35  Condição de pagamento inexistente
 * * 36  Produto inexistente na tabela de preço
 * * 37  JSON com formato inválido
 * * 38  Representada para integração não selecionada na plataforma PC
 * * 39  Integração não habilitada com esse parceiro na plataforma PC
 * * 40  Contato do cliente inexistente
 * * 41  Condição de pagamento inexistente
 * * 42  Limite diário de requisições excedido
 * * 998 Erro interno (uncaught)
 * * 999 Erro interno (caught)
 */
export type ErrorResponseModel = {
    codigo: number;
    mensagem: string;
}

export type RequestErrorResponse = {
    erros: Array<ErrorResponseModel>
}