# Rechearte Controle

Primeira versao alfa de um controle simples de vendas para doces.

## O que tem agora

- Dashboard com venda do dia, vendas do mes, clientes e alertas de estoque.
- Cadastro de produtos com preco, estoque e minimo.
- Cadastro de clientes com WhatsApp e observacoes.
- Lancamento rapido de venda com baixa automatica no estoque.
- Historico de vendas por cliente.
- Backup e restauracao em JSON.
- Layout responsivo para PC e celular.
- Dados compartilhados em PostgreSQL dentro do Docker.
- Configuracoes e senhas em `.env`.

## Configurar senhas

Antes de publicar fora da sua rede, edite o arquivo `.env` e troque:

```text
DB_PASSWORD=troque_esta_senha_antes_de_publicar
POSTGRES_PASSWORD=troque_esta_senha_antes_de_publicar
```

Use a mesma senha nas duas variaveis.

## Rodar com Docker

```bash
docker compose up -d --build
```

Depois acesse:

```text
http://localhost:8088
```

Na rede local, acesse pelo IP do computador:

```text
http://IP-DO-PC:8088
```

## Proximos passos bons para a beta

- Login com senha.
- Cadastro de encomendas futuras.
- Relatorio por periodo.
- Impressao ou envio de recibo pelo WhatsApp.
- Transformar em PWA instalavel com icones reais.
