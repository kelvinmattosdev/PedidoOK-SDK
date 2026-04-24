import type { PedidoOkConfig } from "../types/PedidoOK.types";
import { PedidoOk_Clientes } from "../resources/Clientes";
import { PedidoOk_Pedidos } from "../resources/Pedidos";
import { PedidoOk_Produtos } from "../resources/Produtos";
import { PedidoOk_Vendedores } from "../resources/Vendedores";
import { HttpClient } from "./HttpClient";

export class PedidoOK {
    private readonly http: HttpClient;

    //? Métodos da API
    public readonly produtos: PedidoOk_Produtos;
    public readonly clientes: PedidoOk_Clientes;
    public readonly pedidos: PedidoOk_Pedidos;
    public readonly vendedores: PedidoOk_Vendedores;

    constructor(config: PedidoOkConfig) {
        this.http = new HttpClient(config);

        this.produtos = new PedidoOk_Produtos(this.http);
        this.clientes = new PedidoOk_Clientes(this.http);
        this.pedidos = new PedidoOk_Pedidos(this.http);
        this.vendedores = new PedidoOk_Vendedores(this.http);
    }

    /**
     * Feito para aqueles que querem usar o HttpClient diretamente, seja para acessar recursos não implementados ou para ter mais controle sobre as requisições.
     */
    public get client(): HttpClient {
        return this.http;
    }
}