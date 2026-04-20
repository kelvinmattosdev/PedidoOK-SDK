import { PedidoOk_Clientes } from "../resources/Clientes";
import { PedidoOk_Produtos } from "../resources/Produtos";
import type { PedidoOkConfig } from "../types/PedidoOK.types";
import { HttpClient } from "./HttpClient";

export class PedidoOK {
    private readonly http: HttpClient;

    //? Métodos da API
    public readonly produtos: PedidoOk_Produtos;
    public readonly clientes: PedidoOk_Clientes;

    constructor(config: PedidoOkConfig) {
        this.http = new HttpClient(config);

        this.produtos = new PedidoOk_Produtos(this.http);
        this.clientes = new PedidoOk_Clientes(this.http);
    }
}