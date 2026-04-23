import chalk from "chalk";
import type { HttpClientConfig, PedidoOkHeaders } from "../types/HttpClient.types";
import type { RequestErrorResponse } from "../types/Global.types";

export class HttpClient {
    //? Atributos essenciais para a classe
    private readonly token_pedidook: string;
    private readonly token_parceiro: string;
    private readonly urlBase: string;
    private readonly headers: PedidoOkHeaders;

    constructor(config: HttpClientConfig) {
        this.token_pedidook = config.token_pedidook;
        this.token_parceiro = config.token_parceiro;
        this.urlBase = "https://api.pedidook.com.br/" + ("v" + config.version);

        this.headers = {
            token_parceiro: this.token_parceiro,
            token_pedidook: this.token_pedidook,
            "Content-Type": "application/json"
        }
    }

    private validateResponse<T>(response: unknown): response is T {
        const isError = (
            typeof response === 'object' &&
            response !== null &&
            'erros' in response &&
            Array.isArray(response.erros)
        );

        return !isError;
    }

    private isAPIErrorArray(value: unknown): value is RequestErrorResponse {
        return (
            typeof value === 'object' &&
            value !== null &&
            'erros' in value &&
            Array.isArray(value.erros) &&
            value.erros.every(
                (item) => {
                    return (
                        typeof item === 'object' &&
                        item !== null &&
                        typeof item.codigo === 'number' &&
                        typeof item.mensagem === 'string'
                    )
                }
            )
        )
    }

    private returnResponse<T>(data: unknown): T {
        if (this.validateResponse<T>(data)) {
            return data;
        } else {
            if (this.isAPIErrorArray(data)) {
                console.error(chalk.redBright(data.erros[0]?.mensagem ?? data));
            }
            throw new Error(`A API retornou erro: ${data}`);
        }
    }

    public async get<T>(path: string): Promise<T> {
        const url = this.urlBase + path;
        const req = await fetch(url, {
            method: 'GET',
            headers: this.headers
        });

        if (!req.ok) {
            console.error(await req.text());
            throw new Error(`Ocorreu um erro ao tentar acessar ${url}\n Erro: ${req.status}`)
        }

        const data = await req.json();
        return this.returnResponse<T>(data);
    }

    public async post<T>(path: string, body: Record<string, any>): Promise<T> {
        const url = this.urlBase + path;
        const req = await fetch(url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(body)
        });

        if (!req.ok) {
            console.error(await req.text());
            throw new Error(`Ocorreu um erro ao tentar acessar ${url}\n Erro: ${req.status}`);
        }

        const data = await req.json();
        return this.returnResponse<T>(data);
    }

    public async put<T>(path: string, body: Record<string, any>): Promise<T> {
        const url = this.urlBase + path;
        const req = await fetch(url, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(body)
        });

        if (!req.ok) {
            console.error(await req.text());
            throw new Error(`Ocorreu um erro ao tentar acessar ${url}\n Erro: ${req.status}`);
        }

        const data = await req.json();
        return this.returnResponse<T>(data);
    }

    public async patch<T>(path: string, body?: Record<string, any>): Promise<T> {
        const url = this.urlBase + path;
        const req = await fetch(url, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(body ?? {})
        });

        if (!req.ok) {
            console.error(await req.text());
            throw new Error(`Ocorreu um erro ao tentar acessar ${url}\n Erro: ${req.status}`);
        }

        const data = await req.json();
        return this.returnResponse<T>(data);
    }

    public async delete(path: string): Promise<Boolean> {
        const url = this.urlBase + path;
        const req = await fetch(url, {
            method: 'DELETE',
            headers: this.headers
        });

        if (req.status >= 200 && req.status <= 300) {
            return true;
        } else {
            console.error(await req.text());
            console.error(`Ocorreu um erro ao tentar acessar ${url}\n Erro: ${req.status}`);
            return false;
        }
    }
}