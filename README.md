# pedidook-sdk

<div align="center">

# pedidook-sdk

SDK TypeScript para integração com a API REST do PedidoOK.

[![wakatime](https://wakatime.com/badge/user/db4a2800-e564-4201-9406-b98e170a6764/project/6466d2a4-ea90-488e-a6a8-b6064f121b39.svg)](https://wakatime.com/badge/user/db4a2800-e564-4201-9406-b98e170a6764/project/6466d2a4-ea90-488e-a6a8-b6064f121b39)
[![npm version](https://img.shields.io/npm/v/pedidook-sdk.svg)](https://www.npmjs.com/package/pedidook-sdk)
[![npm downloads](https://img.shields.io/npm/dm/pedidook-sdk.svg)](https://www.npmjs.com/package/pedidook-sdk)
[![license](https://img.shields.io/npm/l/pedidook-sdk.svg)](https://www.npmjs.com/package/pedidook-sdk)
[![typescript](https://img.shields.io/badge/TypeScript-ready-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![API PedidoOK](https://img.shields.io/badge/API-PedidoOK-0A7CFF)](https://docs.api.pedidook.com.br/)

</div>

---

## Visão geral

A **pedidook-sdk** é uma biblioteca para Node.js e TypeScript que simplifica a integração com a API do **PedidoOK**.

Com ela, você pode consumir os principais recursos da API com uma interface mais limpa, organizada e tipada, incluindo:

- **Produtos**
- **Clientes**
- **Pedidos**
- **Vendedores**

A proposta da biblioteca é oferecer:

- **tipagem forte**
- **métodos organizados por recurso**
- **payloads previsíveis**
- **paginação simplificada**
- **baixo atrito de uso em projetos Node.js com TypeScript**

---

## Instalação

> Esta biblioteca é distribuída **somente via npm**.

Use sempre o comando abaixo, esteja você vendo este projeto no **GitHub** ou no **npm**:

```bash
npm install pedidook-sdk
```

Também funciona com outros gerenciadores:

```bash
pnpm add pedidook-sdk
```

```bash
yarn add pedidook-sdk
```

---

## Requisitos

- **Node.js 18+**
- **TypeScript** (recomendado)
- Credenciais válidas da API do PedidoOK:
  - `token_parceiro`
  - `token_pedidook`

---

## Documentação oficial da API

Para consultar regras, comportamento dos endpoints e detalhes oficiais da plataforma PedidoOK, utilize a documentação oficial:

- **Documentação da API:** https://docs.api.pedidook.com.br/
- **Página da API PedidoOK:** https://www.pedidook.com.br/api

---

## Recursos disponíveis

A SDK atualmente expõe os seguintes módulos:

- `produtos`
- `clientes`
- `pedidos`
- `vendedores`

A instância principal da biblioteca organiza tudo por recurso:

```ts
import { PedidoOK } from "pedidook-sdk";

const client = new PedidoOK({
  version: 1,
  token_parceiro: "SEU_TOKEN_PARCEIRO",
  token_pedidook: "SEU_TOKEN_PEDIDOOK"
});
```

---

## Exemplo rápido

```ts
import { PedidoOK } from "pedidook-sdk";

async function main() {
  const client = new PedidoOK({
    version: 1,
    token_parceiro: "SEU_TOKEN_PARCEIRO",
    token_pedidook: "SEU_TOKEN_PEDIDOOK"
  });

  const resposta = await client.produtos.buscarTodos();

  console.log("Próxima página:", resposta.href_proxima_pagina);
  console.log("Quantidade de produtos:", resposta.produtos.length);
}

main().catch(console.error);
```

---

# Índice

- [Instalação](#instalação)
- [Requisitos](#requisitos)
- [Documentação oficial da API](#documentação-oficial-da-api)
- [Recursos disponíveis](#recursos-disponíveis)
- [Exemplo rápido](#exemplo-rápido)
- [Como a SDK está organizada](#como-a-sdk-está-organizada)
- [Configuração](#configuração)
- [Uso por módulo](#uso-por-módulo)
  - [Produtos](#produtos)
  - [Clientes](#clientes)
  - [Vendedores](#vendedores)
  - [Pedidos](#pedidos)
- [Paginação com `href_proxima_pagina`](#paginação-com-href_proxima_pagina)
- [Uso do `client` bruto](#uso-do-client-bruto)
- [Tipagens exportadas](#tipagens-exportadas)
- [Tratamento de erros](#tratamento-de-erros)
- [Boas práticas](#boas-práticas)
- [Roadmap sugerido](#roadmap-sugerido)
- [Licença](#licença)

---

## Como a SDK está organizada

A biblioteca foi estruturada em camadas bem separadas:

```txt
src/
├── clients/
│   ├── HttpClient.ts
│   └── PedidoOK.ts
├── resources/
│   ├── Produtos.ts
│   ├── Clientes.ts
│   ├── Pedidos.ts
│   └── Vendedores.ts
├── types/
│   ├── Global.types.ts
│   ├── HttpClient.types.ts
│   ├── PedidoOK.types.ts
│   ├── Produtos.types.ts
│   ├── Clientes.types.ts
│   ├── Pedidos.types.ts
│   └── Vendedores.types.ts
├── examples/
│   ├── produtos/
│   ├── clientes/
│   ├── pedidos/
│   └── vendedores/
└── index.ts
```

### Resumo da arquitetura

- **`index.ts`**  
  Ponto de entrada da biblioteca. Exporta a classe principal e as tipagens públicas.

- **`clients/HttpClient.ts`**  
  Camada HTTP base responsável por executar as requisições.

- **`clients/PedidoOK.ts`**  
  Classe principal da SDK. Centraliza os módulos e expõe a interface pública.

- **`resources/*`**  
  Implementação dos métodos por domínio da API.

- **`types/*`**  
  Modelos TypeScript para requests, responses e entidades.

- **`examples/*`**  
  Exemplos reais de uso da biblioteca.

---

## Configuração

A biblioteca espera uma configuração simples:

```ts
import { PedidoOK } from "pedidook-sdk";

const client = new PedidoOK({
  version: 1,
  token_parceiro: "SEU_TOKEN_PARCEIRO",
  token_pedidook: "SEU_TOKEN_PEDIDOOK"
});
```

### Campos

| Campo | Tipo | Obrigatório | Descrição |
|---|---:|:---:|---|
| `version` | `1` | Sim | Versão da API utilizada pela SDK |
| `token_parceiro` | `string` | Sim | Token de autenticação do parceiro |
| `token_pedidook` | `string` | Sim | Token de autenticação do PedidoOK |

---

# Uso por módulo

## Produtos

O módulo `produtos` cobre os métodos principais de leitura e escrita.

### Métodos disponíveis

- `buscarTodos(obj?)`
- `buscarPorId(id)`
- `inserirProduto(body)`
- `alterarProduto(id, product)`
- `alterarProdutoParcial(id, product)`
- `deletarProduto(id)`
- `reativarProduto(id)`

---

### Buscar produtos

```ts
import { PedidoOK } from "pedidook-sdk";

async function main() {
  const client = new PedidoOK({
    version: 1,
    token_parceiro: "SEU_TOKEN_PARCEIRO",
    token_pedidook: "SEU_TOKEN_PEDIDOOK"
  });

  const resposta = await client.produtos.buscarTodos({
    excluido: false
  });

  console.log("Próxima página:", resposta.href_proxima_pagina);
  console.log("Produtos encontrados:", resposta.produtos.length);
  console.dir(resposta.produtos[0], { depth: null });
}

main().catch(console.error);
```

---

### Buscar produto por ID

```ts
import { PedidoOK } from "pedidook-sdk";

async function main() {
  const client = new PedidoOK({
    version: 1,
    token_parceiro: "SEU_TOKEN_PARCEIRO",
    token_pedidook: "SEU_TOKEN_PEDIDOOK"
  });

  const resposta = await client.produtos.buscarPorId(19783837);

  console.log("Produto encontrado:");
  console.dir(resposta.produto, { depth: null });
}

main().catch(console.error);
```

---

### Inserir produto

```ts
import { PedidoOK } from "pedidook-sdk";

async function main() {
  const client = new PedidoOK({
    version: 1,
    token_parceiro: "SEU_TOKEN_PARCEIRO",
    token_pedidook: "SEU_TOKEN_PEDIDOOK"
  });

  const novoProduto = {
    codigo: "TESTE-PEDIDOOK-001",
    observacao: "Produto criado via SDK",
    ipi: 0,
    peso: 0,
    codigo_barra: "1234567891234",
    qtd_embalagem: 1,
    categoria: "",
    nome: "Produto de Exemplo",
    id_parceiro: "",
    grades: [],
    validade: null,
    estoque: 10,
    marca: "JAU PESCA",
    venda: 29.9,
    comissao: 0,
    custo: 15,
    id_fornecedor: null,
    estoque_minimo: 0,
    ncm: "",
    embalagem: "UN",
    referencia: "REF-EXEMPLO-001"
  };

  const resposta = await client.produtos.inserirProduto(novoProduto);

  console.log("Produto inserido com sucesso:");
  console.dir(resposta, { depth: null });
}

main().catch(console.error);
```

---

### Alterar produto completamente

> Use `PUT` quando quiser atualizar o registro inteiro.

```ts
import { PedidoOK } from "pedidook-sdk";

async function main() {
  const client = new PedidoOK({
    version: 1,
    token_parceiro: "SEU_TOKEN_PARCEIRO",
    token_pedidook: "SEU_TOKEN_PEDIDOOK"
  });

  const idProduto = 49065360;

  const produtoAtualizado = {
    codigo: "TESTE-PEDIDOOK-001",
    observacao: "Produto alterado via SDK",
    ipi: 0,
    peso: 0.5,
    codigo_barra: "1234567891234",
    qtd_embalagem: 1,
    categoria: "",
    nome: "Produto de Exemplo Alterado",
    id_parceiro: "",
    grades: [],
    validade: null,
    estoque: 25,
    marca: "JAU PESCA",
    venda: 39.9,
    comissao: 0,
    custo: 20,
    id_fornecedor: null,
    estoque_minimo: 2,
    ncm: "",
    embalagem: "UN",
    referencia: "REF-EXEMPLO-001"
  };

  const resposta = await client.produtos.alterarProduto(idProduto, produtoAtualizado);

  console.log("Produto alterado com sucesso:");
  console.dir(resposta, { depth: null });
}

main().catch(console.error);
```

---

### Alterar produto parcialmente

> Use `PATCH` quando quiser alterar apenas alguns campos.

```ts
import { PedidoOK } from "pedidook-sdk";

async function main() {
  const client = new PedidoOK({
    version: 1,
    token_parceiro: "SEU_TOKEN_PARCEIRO",
    token_pedidook: "SEU_TOKEN_PEDIDOOK"
  });

  const idProduto = 49065360;

  const alteracaoParcial = {
    nome: "Produto de Exemplo - Alteração Parcial",
    observacao: "Somente alguns campos foram alterados",
    estoque: 200,
    custo: 25.19,
    venda: 49.9,
    peso: 1.25
  };

  const resposta = await client.produtos.alterarProdutoParcial(idProduto, alteracaoParcial);

  console.log("Produto alterado parcialmente com sucesso:");
  console.dir(resposta, { depth: null });
}

main().catch(console.error);
```

---

### Deletar produto

```ts
import { PedidoOK } from "pedidook-sdk";

async function main() {
  const client = new PedidoOK({
    version: 1,
    token_parceiro: "SEU_TOKEN_PARCEIRO",
    token_pedidook: "SEU_TOKEN_PEDIDOOK"
  });

  const sucesso = await client.produtos.deletarProduto(49065360);

  console.log(
    sucesso
      ? "Produto excluído com sucesso!"
      : "Não foi possível excluir o produto."
  );
}

main().catch(console.error);
```

---

### Reativar produto

```ts
import { PedidoOK } from "pedidook-sdk";

async function main() {
  const client = new PedidoOK({
    version: 1,
    token_parceiro: "SEU_TOKEN_PARCEIRO",
    token_pedidook: "SEU_TOKEN_PEDIDOOK"
  });

  const resposta = await client.produtos.reativarProduto(49065360);

  console.log("Produto reativado com sucesso:");
  console.dir(resposta, { depth: null });
}

main().catch(console.error);
```

---

## Clientes

O módulo `clientes` cobre os métodos principais do recurso de clientes.

### Métodos disponíveis

- `buscarTodos(obj?)`
- `buscarPorId(id)`
- `inserirCliente(obj)`
- `alterarCliente(id, obj)`
- `alterarClienteParcial(id, obj)`
- `deletarCliente(id)`
- `reativarCliente(id)`

---

### Buscar clientes

```ts
import { PedidoOK } from "pedidook-sdk";

async function main() {
  const client = new PedidoOK({
    version: 1,
    token_parceiro: "SEU_TOKEN_PARCEIRO",
    token_pedidook: "SEU_TOKEN_PEDIDOOK"
  });

  const clientes = await client.clientes.buscarTodos({
    excluido: false
  });

  console.log("Próxima página:", clientes.href_proxima_pagina);

  const clientesResumidos = clientes.clientes.map((cliente) => ({
    id: cliente.id,
    codigo: cliente.codigo,
    razao_social: cliente.razao_social,
    fantasia: cliente.fantasia,
    cnpj_cpf: cliente.cnpj_cpf,
    excluido: cliente.excluido
  }));

  console.dir(clientesResumidos, { depth: null });
}

main().catch(console.error);
```

---

### Buscar cliente por ID

```ts
import { PedidoOK } from "pedidook-sdk";

async function main() {
  const client = new PedidoOK({
    version: 1,
    token_parceiro: "SEU_TOKEN_PARCEIRO",
    token_pedidook: "SEU_TOKEN_PEDIDOOK"
  });

  const resposta = await client.clientes.buscarPorId(12345678);

  console.log("Cliente encontrado:");
  console.dir(resposta.cliente, { depth: null });
}

main().catch(console.error);
```

---

### Inserir cliente

```ts
import { PedidoOK } from "pedidook-sdk";
import type { Clientes_InserirObj } from "pedidook-sdk";

async function main() {
  const client = new PedidoOK({
    version: 1,
    token_parceiro: "SEU_TOKEN_PARCEIRO",
    token_pedidook: "SEU_TOKEN_PEDIDOOK"
  });

  const novoCliente: Clientes_InserirObj = {
    codigo: "CLI-TESTE-001",
    razao_social: "Cliente de Exemplo LTDA",
    id_parceiro: "cliente-externo-001",
    fantasia: "Cliente Exemplo",
    cnpj_cpf: "12345678901234",
    telefone: "14999999999",
    observacao: "Cliente criado via SDK",
    atendimento: "Comercial"
  };

  const resposta = await client.clientes.inserirCliente(novoCliente);

  console.log("Cliente criado com sucesso:");
  console.dir(resposta, { depth: null });
}

main().catch(console.error);
```

---

### Alterar cliente completamente

```ts
import { PedidoOK } from "pedidook-sdk";
import type { Clientes_AlterarObj } from "pedidook-sdk";

async function main() {
  const client = new PedidoOK({
    version: 1,
    token_parceiro: "SEU_TOKEN_PARCEIRO",
    token_pedidook: "SEU_TOKEN_PEDIDOOK"
  });

  const dadosAtualizados: Clientes_AlterarObj = {
    codigo: "CLI-TESTE-001",
    razao_social: "Cliente Alterado LTDA",
    id_parceiro: "cliente-externo-001",
    telefone: "14988888888",
    observacao: "Cliente atualizado por PUT"
  };

  const resposta = await client.clientes.alterarCliente(12345678, dadosAtualizados);

  console.log("Cliente alterado com sucesso:");
  console.dir(resposta, { depth: null });
}

main().catch(console.error);
```

---

### Alterar cliente parcialmente

```ts
import { PedidoOK } from "pedidook-sdk";
import type { Clientes_AlterarParcialObj } from "pedidook-sdk";

async function main() {
  const client = new PedidoOK({
    version: 1,
    token_parceiro: "SEU_TOKEN_PARCEIRO",
    token_pedidook: "SEU_TOKEN_PEDIDOOK"
  });

  const alteracoesParciais: Clientes_AlterarParcialObj = {
    razao_social: "Cliente Alterado Parcialmente LTDA",
    telefone: "14977777777",
    observacao: "Atualização parcial via PATCH"
  };

  const resposta = await client.clientes.alterarClienteParcial(12345678, alteracoesParciais);

  console.log("Cliente alterado parcialmente com sucesso:");
  console.dir(resposta, { depth: null });
}

main().catch(console.error);
```

---

### Deletar cliente

```ts
import { PedidoOK } from "pedidook-sdk";

async function main() {
  const client = new PedidoOK({
    version: 1,
    token_parceiro: "SEU_TOKEN_PARCEIRO",
    token_pedidook: "SEU_TOKEN_PEDIDOOK"
  });

  const sucesso = await client.clientes.deletarCliente(12345678);

  console.log(
    sucesso
      ? "Cliente excluído com sucesso."
      : "A exclusão não retornou sucesso."
  );
}

main().catch(console.error);
```

---

### Reativar cliente

```ts
import { PedidoOK } from "pedidook-sdk";

async function main() {
  const client = new PedidoOK({
    version: 1,
    token_parceiro: "SEU_TOKEN_PARCEIRO",
    token_pedidook: "SEU_TOKEN_PEDIDOOK"
  });

  const resposta = await client.clientes.reativarCliente(12345678);

  console.log("Cliente reativado com sucesso:");
  console.dir(resposta, { depth: null });
}

main().catch(console.error);
```

---

## Vendedores

O módulo `vendedores` cobre leitura, criação, atualização e exclusão de vendedores.

### Métodos disponíveis

- `buscarTodos(obj?)`
- `buscarPorId(id)`
- `inserirVendedor(obj)`
- `alterarVendedor(id, obj)`
- `alterarVendedorParcial(id, obj)`
- `deletarVendedor(id)`

---

### Buscar vendedores

```ts
import { PedidoOK } from "pedidook-sdk";

async function main() {
  const client = new PedidoOK({
    version: 1,
    token_parceiro: "SEU_TOKEN_PARCEIRO",
    token_pedidook: "SEU_TOKEN_PEDIDOOK"
  });

  const vendedores = await client.vendedores.buscarTodos({
    excluido: false
  });

  console.log("Próxima página:", vendedores.href_proxima_pagina);

  const vendedoresResumidos = vendedores.vendedores.map((vendedor) => ({
    id: vendedor.id,
    nome: vendedor.nome,
    id_parceiro: vendedor.id_parceiro,
    regiao: vendedor.regiao,
    excluido: vendedor.excluido,
    validade_licenca: vendedor.validade_licenca
  }));

  console.dir(vendedoresResumidos, { depth: null });
}

main().catch(console.error);
```

---

### Buscar vendedor por ID

```ts
import { PedidoOK } from "pedidook-sdk";

async function main() {
  const client = new PedidoOK({
    version: 1,
    token_parceiro: "SEU_TOKEN_PARCEIRO",
    token_pedidook: "SEU_TOKEN_PEDIDOOK"
  });

  const resposta = await client.vendedores.buscarPorId(12345678);

  console.log("Vendedor encontrado:");
  console.dir(resposta.vendedor, { depth: null });
}

main().catch(console.error);
```

---

### Inserir vendedor

```ts
import { PedidoOK } from "pedidook-sdk";
import type { Vendedores_InserirVendedorObjReq } from "pedidook-sdk";

async function main() {
  const client = new PedidoOK({
    version: 1,
    token_parceiro: "SEU_TOKEN_PARCEIRO",
    token_pedidook: "SEU_TOKEN_PEDIDOOK"
  });

  const novoVendedor: Vendedores_InserirVendedorObjReq = {
    nome: "Vendedor de Exemplo",
    id_parceiro: "vendedor-externo-001",
    regiao: "SP",
    informacao_adicional: "Vendedor criado via SDK"
  };

  const resposta = await client.vendedores.inserirVendedor(novoVendedor);

  console.log("Vendedor criado com sucesso:");
  console.dir(resposta, { depth: null });
}

main().catch(console.error);
```

> Para inserir um vendedor, é necessário haver uma licença disponível no PedidoOK.

---

### Alterar vendedor completamente

```ts
import { PedidoOK } from "pedidook-sdk";
import type { Vendedores_AlterarVendedorObjReq } from "pedidook-sdk";

async function main() {
  const client = new PedidoOK({
    version: 1,
    token_parceiro: "SEU_TOKEN_PARCEIRO",
    token_pedidook: "SEU_TOKEN_PEDIDOOK"
  });

  const dadosAtualizados: Vendedores_AlterarVendedorObjReq = {
    nome: "Vendedor Alterado",
    id_parceiro: "vendedor-externo-001",
    regiao: "SP",
    informacao_adicional: "Vendedor atualizado por PUT"
  };

  const resposta = await client.vendedores.alterarVendedor(12345678, dadosAtualizados);

  console.log("Vendedor alterado com sucesso:");
  console.dir(resposta, { depth: null });
}

main().catch(console.error);
```

> Use `PUT` quando quiser atualizar o registro inteiro. Campos omitidos podem ser gravados com valor padrão pela API.

---

### Alterar vendedor parcialmente

```ts
import { PedidoOK } from "pedidook-sdk";
import type { Vendedores_AlterarVendedorParcialObjReq } from "pedidook-sdk";

async function main() {
  const client = new PedidoOK({
    version: 1,
    token_parceiro: "SEU_TOKEN_PARCEIRO",
    token_pedidook: "SEU_TOKEN_PEDIDOOK"
  });

  const alteracoesParciais: Vendedores_AlterarVendedorParcialObjReq = {
    nome: "Vendedor Alterado Parcialmente",
    regiao: "SP",
    informacao_adicional: "Atualização parcial via PATCH"
  };

  const resposta = await client.vendedores.alterarVendedorParcial(12345678, alteracoesParciais);

  console.log("Vendedor alterado parcialmente com sucesso:");
  console.dir(resposta, { depth: null });
}

main().catch(console.error);
```

---

### Deletar vendedor

```ts
import { PedidoOK } from "pedidook-sdk";

async function main() {
  const client = new PedidoOK({
    version: 1,
    token_parceiro: "SEU_TOKEN_PARCEIRO",
    token_pedidook: "SEU_TOKEN_PEDIDOOK"
  });

  const sucesso = await client.vendedores.deletarVendedor(12345678);

  console.log(
    sucesso
      ? "Vendedor excluído com sucesso."
      : "A exclusão não retornou sucesso."
  );
}

main().catch(console.error);
```

---

## Pedidos

O módulo `pedidos` cobre leitura, criação, atualização de cabeçalho, atualização de itens, inserção de itens, exclusão e reativação.

### Métodos disponíveis

- `buscarTodos(obj?)`
- `buscarPorId(id)`
- `inserirPedido(obj)`
- `deletarPedido(id)`
- `reativarPedido(id)`
- `alterarCabecalho(id, obj)`
- `alterarItem(id_pedido, id_produto, obj)`
- `inserirItem(id_pedido, obj)`
- `deletarItem(id_pedido, id_produto)`

---

### Buscar pedidos

```ts
import { PedidoOK } from "pedidook-sdk";

async function main() {
  const client = new PedidoOK({
    version: 1,
    token_parceiro: "SEU_TOKEN_PARCEIRO",
    token_pedidook: "SEU_TOKEN_PEDIDOOK"
  });

  const resposta = await client.pedidos.buscarTodos({
    excluido: false,
    pagina: 1
  });

  console.log("Próxima página:", resposta.href_proxima_pagina);
  console.log("Quantidade de pedidos:", resposta.pedidos.length);
}

main().catch(console.error);
```

---

### Buscar pedido por ID

```ts
import { PedidoOK } from "pedidook-sdk";

async function main() {
  const client = new PedidoOK({
    version: 1,
    token_parceiro: "SEU_TOKEN_PARCEIRO",
    token_pedidook: "SEU_TOKEN_PEDIDOOK"
  });

  const resposta = await client.pedidos.buscarPorId(19604217);

  console.log("Pedido encontrado:");
  console.dir(resposta.pedido, { depth: null });
}

main().catch(console.error);
```

---

### Inserir pedido

```ts
import { PedidoOK } from "pedidook-sdk";
import type { Pedidos_InserirPedidoObjReq } from "pedidook-sdk";

async function main() {
  const client = new PedidoOK({
    version: 1,
    token_parceiro: "SEU_TOKEN_PARCEIRO",
    token_pedidook: "SEU_TOKEN_PEDIDOOK"
  });

  const pedido: Pedidos_InserirPedidoObjReq = {
    status: "pedido",
    emissao: "2026-04-22",
    id_cliente: 67158548,
    id_parceiro: "V2rLKuesQGH4qJmuV7fN76iWKHXGvRQh",
    id_vendedor: 169735
  };

  const resposta = await client.pedidos.inserirPedido(pedido);

  console.log("Pedido criado com sucesso!");
  console.dir(resposta, { depth: null });
}

main().catch(console.error);
```

---

### Alterar cabeçalho do pedido

```ts
import { PedidoOK } from "pedidook-sdk";
import type { Pedidos_AlterarCabecalhoObjReq } from "pedidook-sdk";

async function main() {
  const client = new PedidoOK({
    version: 1,
    token_parceiro: "SEU_TOKEN_PARCEIRO",
    token_pedidook: "SEU_TOKEN_PEDIDOOK"
  });

  const cabecalho: Pedidos_AlterarCabecalhoObjReq = {
    forma_pagamento: "boleto",
    observacao_cliente: "Pedido alterado via SDK",
    tipo_frete: "FOB"
  };

  const resposta = await client.pedidos.alterarCabecalho(67174897, cabecalho);

  console.log("Cabeçalho alterado com sucesso:");
  console.dir(resposta, { depth: null });
}

main().catch(console.error);
```

---

### Alterar item do pedido

```ts
import { PedidoOK } from "pedidook-sdk";
import type { Pedidos_AlterarItemObjReq } from "pedidook-sdk";

async function main() {
  const client = new PedidoOK({
    version: 1,
    token_parceiro: "SEU_TOKEN_PARCEIRO",
    token_pedidook: "SEU_TOKEN_PEDIDOOK"
  });

  const item: Pedidos_AlterarItemObjReq = {
    embalagem: "CX",
    observacao: "Item alterado via SDK"
  };

  const resposta = await client.pedidos.alterarItem(67174897, 49179870, item);

  console.log("Item alterado com sucesso:");
  console.dir(resposta, { depth: null });
}

main().catch(console.error);
```

---

### Inserir item no pedido

```ts
import { PedidoOK } from "pedidook-sdk";
import type { Pedidos_InserirItemObjReq } from "pedidook-sdk";

async function main() {
  const client = new PedidoOK({
    version: 1,
    token_parceiro: "SEU_TOKEN_PARCEIRO",
    token_pedidook: "SEU_TOKEN_PEDIDOOK"
  });

  const itens: Pedidos_InserirItemObjReq = {
    itens: [
      {
        quantidade: 10,
        embalagem: "UN",
        id_produto: 49179870
      }
    ]
  };

  const resposta = await client.pedidos.inserirItem(67174897, itens);

  console.log("Itens inseridos com sucesso:");
  console.dir(resposta, { depth: null });
}

main().catch(console.error);
```

---

### Deletar item do pedido

```ts
import { PedidoOK } from "pedidook-sdk";

async function main() {
  const client = new PedidoOK({
    version: 1,
    token_parceiro: "SEU_TOKEN_PARCEIRO",
    token_pedidook: "SEU_TOKEN_PEDIDOOK"
  });

  const deletado = await client.pedidos.deletarItem(67174897, 49179870);

  console.log(
    deletado
      ? "Item do pedido excluído com sucesso!"
      : "Houve um erro ao tentar excluir o item do pedido."
  );
}

main().catch(console.error);
```

---

### Deletar pedido

```ts
import { PedidoOK } from "pedidook-sdk";

async function main() {
  const client = new PedidoOK({
    version: 1,
    token_parceiro: "SEU_TOKEN_PARCEIRO",
    token_pedidook: "SEU_TOKEN_PEDIDOOK"
  });

  const deletado = await client.pedidos.deletarPedido(67174897);

  console.log(
    deletado
      ? "Pedido excluído com sucesso!"
      : "Houve um erro ao tentar excluir o pedido."
  );
}

main().catch(console.error);
```

---

### Reativar pedido

```ts
import { PedidoOK } from "pedidook-sdk";

async function main() {
  const client = new PedidoOK({
    version: 1,
    token_parceiro: "SEU_TOKEN_PARCEIRO",
    token_pedidook: "SEU_TOKEN_PEDIDOOK"
  });

  const resposta = await client.pedidos.reativarPedido(67174897);

  console.log("Pedido reativado com sucesso:");
  console.dir(resposta, { depth: null });
}

main().catch(console.error);
```

---

## Paginação com `href_proxima_pagina`

Os métodos de listagem retornam:

```ts
{
  href_proxima_pagina: string | null;
  ...
}
```

Quando `href_proxima_pagina` vier preenchido, você pode chamar o mesmo método novamente usando `href`.

### Exemplo

```ts
import { PedidoOK } from "pedidook-sdk";

async function main() {
  const client = new PedidoOK({
    version: 1,
    token_parceiro: "SEU_TOKEN_PARCEIRO",
    token_pedidook: "SEU_TOKEN_PEDIDOOK"
  });

  const pagina1 = await client.produtos.buscarTodos();

  if (pagina1.href_proxima_pagina) {
    const pagina2 = await client.produtos.buscarTodos({
      href: pagina1.href_proxima_pagina
    });

    console.log("Produtos na próxima página:", pagina2.produtos.length);
  }
}

main().catch(console.error);
```

### Vantagem desse modelo

A SDK aceita dois formatos para listagem:

1. **com filtros normais**
2. **com `href` de paginação**

Isso evita montar URLs manualmente e reduz erro em paginação.

---

## Uso do `client` bruto

A classe principal expõe também o `HttpClient` bruto via getter `client`.

Isso é útil quando:

- você precisa consumir um endpoint ainda não implementado na SDK
- você quer testar recursos novos da API
- você precisa de controle mais direto sobre o path

### Exemplo

```ts
import { PedidoOK } from "pedidook-sdk";

async function main() {
  const sdk = new PedidoOK({
    version: 1,
    token_parceiro: "SEU_TOKEN_PARCEIRO",
    token_pedidook: "SEU_TOKEN_PEDIDOOK"
  });

  const resposta = await sdk.client.get("/produtos");

  console.dir(resposta, { depth: null });
}

main().catch(console.error);
```

---

## Tipagens exportadas

A biblioteca também exporta as tipagens públicas, permitindo escrever código mais seguro e autoexplicativo.

### Exemplos

```ts
import type { Clientes_InserirObj } from "pedidook-sdk";
import type { Pedidos_InserirPedidoObjReq } from "pedidook-sdk";
import type { Produtos_BuscarTodosObjReq } from "pedidook-sdk";
import type { Vendedores_InserirVendedorObjReq } from "pedidook-sdk";
```

### Tipos disponíveis

A SDK exporta, entre outros:

- `PedidoOkConfig`
- `ISODateString`
- `RequestErrorResponse`
- `Produtos_*`
- `Clientes_*`
- `Pedidos_*`
- `Vendedores_*`

Isso facilita:

- autocomplete
- validação em tempo de desenvolvimento
- documentação implícita no editor
- redução de erros de payload

---

## Tratamento de erros

A API pode retornar erros estruturados.  
A SDK possui o modelo tipado de erro:

```ts
type ErrorResponseModel = {
  codigo: number;
  mensagem: string;
};

type RequestErrorResponse = {
  erros: Array<ErrorResponseModel>;
};
```

### Exemplo de uso defensivo

```ts
import { PedidoOK } from "pedidook-sdk";
import type { RequestErrorResponse } from "pedidook-sdk";

function isRequestErrorResponse(value: unknown): value is RequestErrorResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "erros" in value &&
    Array.isArray((value as RequestErrorResponse).erros)
  );
}

async function main() {
  const client = new PedidoOK({
    version: 1,
    token_parceiro: "SEU_TOKEN_PARCEIRO",
    token_pedidook: "SEU_TOKEN_PEDIDOOK"
  });

  try {
    const resposta = await client.clientes.buscarPorId(12345678);
    console.dir(resposta, { depth: null });
  } catch (error) {
    if (isRequestErrorResponse(error)) {
      console.error("Erro da API:", error.erros);
      return;
    }

    console.error("Erro inesperado:", error);
  }
}

main().catch(console.error);
```

> Observação: dependendo da estratégia de tratamento adotada pela aplicação consumidora, você pode criar wrappers próprios para padronizar exceptions, logs e retries.

---

## Boas práticas

### 1. Centralize a instância da SDK
Evite criar uma instância nova em cada função se o contexto da aplicação permitir reutilização.

### 2. Use as tipagens públicas
Sempre que possível, tipar payloads e responses melhora muito a manutenção.

### 3. Prefira `PATCH` quando a alteração for parcial
Isso reduz risco de sobrescrever campos com valores padrão involuntariamente.

### 4. Aproveite o `href_proxima_pagina`
Em vez de montar paginação manualmente, reutilize o `href` retornado pela própria API.

### 5. Trate logs com cuidado
Não exponha `token_parceiro` e `token_pedidook` em logs, prints ou monitoramento.

### 6. Valide o ambiente antes de subir para produção
Teste credenciais, conectividade e comportamento dos endpoints em um ambiente controlado antes de integrar fluxos críticos.

---

## Roadmap sugerido

Algumas evoluções que combinam bem com a proposta da SDK:

- melhoria do tratamento de erros HTTP
- exceptions tipadas por faixa de status
- suporte a mais recursos da API do PedidoOK
- retries configuráveis
- interceptors/hooks
- suporte mais avançado a paginação automática
- documentação gerada por recurso
- suíte de testes automatizados

---

## Licença

MIT

---

## Instalação rápida

Para evitar qualquer dúvida:

- No **GitHub**, instale com:
```bash
npm install pedidook-sdk
```

- No **npm**, instale com:
```bash
npm install pedidook-sdk
```

A instalação da biblioteca é **via npm**.

---

## Author

**Kelvin Kauan Melo Mattos**  
Software Developer • API Integrations • TypeScript

Desenvolvido com foco em:

- produtividade
- tipagem forte
- integração limpa com a API do PedidoOK
- arquitetura previsível e reutilizável

Se este projeto te ajudar, considere deixar uma ⭐ no repositório.
