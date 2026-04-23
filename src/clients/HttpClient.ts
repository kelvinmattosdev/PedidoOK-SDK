import type { HttpClientConfig, PedidoOkHeaders } from "../types/HttpClient.types";

type DeleteOptionsWithBody = {
    body: true;
};

type DeleteOptionsWithoutBody = {
    body?: false | undefined;
};

export class HttpClient {
    private readonly token_pedidook: string;
    private readonly token_parceiro: string;
    private readonly urlBase: string;
    private readonly headers: PedidoOkHeaders;

    constructor(config: HttpClientConfig) {
        this.token_pedidook = config.token_pedidook;
        this.token_parceiro = config.token_parceiro;
        this.urlBase = `https://api.pedidook.com.br/v${config.version}`;

        this.headers = {
            token_parceiro: this.token_parceiro,
            token_pedidook: this.token_pedidook,
            "Content-Type": "application/json",
        };
    }

    private async parseResponseBody(req: Response): Promise<unknown | undefined> {
        if (req.status === 204) return undefined;

        const text = await req.text();
        if (!text.trim()) return undefined;

        try {
            return JSON.parse(text);
        } catch {
            return text;
        }
    }

    private async request<T>(
        method: "GET" | "POST" | "PUT" | "PATCH",
        path: string,
        body?: unknown
    ): Promise<T> {
        const url = this.urlBase + path;

        const req = await fetch(url, {
            method,
            headers: this.headers,
            ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
        });

        const data = await this.parseResponseBody(req);

        if (data === undefined) {
            throw new Error(`A resposta de ${method} em ${url} não retornou body.`);
        }

        return data as T;
    }

    public async get<T>(path: string): Promise<T> {
        return await this.request<T>("GET", path);
    }

    public async post<T>(path: string, body: unknown): Promise<T> {
        return await this.request<T>("POST", path, body);
    }

    public async put<T>(path: string, body: unknown): Promise<T> {
        return await this.request<T>("PUT", path, body);
    }

    public async patch<T>(path: string, body?: unknown): Promise<T> {
        return await this.request<T>("PATCH", path, body ?? {});
    }

    public async delete<T>(path: string, options: DeleteOptionsWithBody): Promise<T>;
    public async delete(path: string, options?: DeleteOptionsWithoutBody): Promise<boolean>;
    public async delete<T>(
        path: string,
        options?: DeleteOptionsWithBody | DeleteOptionsWithoutBody
    ): Promise<T | boolean> {
        const url = this.urlBase + path;

        const req = await fetch(url, {
            method: "DELETE",
            headers: this.headers,
        });

        const data = await this.parseResponseBody(req);

        if (options?.body === true) {
            if (data === undefined) {
                throw new Error(`A resposta de DELETE em ${url} não retornou body.`);
            }

            return data as T;
        }

        return req.ok;
    }
}