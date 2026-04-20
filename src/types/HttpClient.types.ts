import type { PedidoOkConfig } from "./PedidoOK.types";

export type PedidoOkHeaders = {
    token_parceiro: string;
    token_pedidook: string;
    "Content-Type": "application/json";
};

export type HttpClientConfig = PedidoOkConfig;