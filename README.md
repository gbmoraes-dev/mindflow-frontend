# 🧠 MindFlow App

O MindFlow é uma aplicação web moderna de journaling (diário) focada em saúde mental e bem-estar.

O objetivo do projeto é transformar o ato de escrever um diário em uma ferramenta de autoconhecimento, alinhada com o Objetivo de Desenvolvimento Sustentável (ODS) 3 da ONU: Saúde e Bem-Estar. Em vez de apenas armazenar texto, o MindFlow utiliza Inteligência Artificial para analisar as entradas do usuário, fornecendo insights acionáveis sobre seus padrões emocionais.

## 💡 Como Funciona

1. Registro: O usuário escreve uma entrada em seu diário digital, descrevendo seu dia, sentimentos ou pensamentos.

2. Análise Assíncrona: O backend recebe o texto e o despacha para uma fila de mensagens.

3. Processamento (IA): Um worker separado pega o job da fila e o envia para uma IA com um prompt avançado.

4. Insights: A IA analisa o conteúdo e retorna um objeto JSON estruturado contendo:
    - sentiment: O sentimento geral (ex: "positivo", "negativo", "neutro").
    - topics: Os tópicos principais (ex: ["trabalho", "ansiedade", "família"]).
    - summary: Um resumo curto do que foi dito.
    - suggestion: Um conselho empático e personalizado com base no contexto do usuário.

5. Notificação em Tempo Real: O worker salva essa análise no banco de dados e publica um evento em um canal de pub/sub.

6. Visualização: A API principal, que mantém uma conexão WebSocket com o cliente, ouve esse evento e envia a análise completa para o frontend em tempo real. O usuário vê seu dashboard (com gráficos de sentimento e nuvem de palavras) e os conselhos da IA aparecerem magicamente, sem precisar recarregar a página.

## 🚀 Como Executar

Este projeto usa Docker e Docker Compose para gerenciar os ambientes. Existem duas formas de executar a aplicação:

Modo de Desenvolvimento (com Hot-Reload)

Modo de Produção (simulando o deploy final com Nginx)

1. Pré requisitos:
    - Docker: [Instalação LINUX/WSL](https://docs.docker.com/engine/install/)
    - Bun (se quiser rodar localmente): [Instalação](https://bun.com/)

2. Configuração Inicial (Obrigatório)

Clone o repositório, navegue até ele e renomeie o arquivo `.env.example` para `.env` e preencha as variáveis de ambiente necessárias.:
```bash
git clone https://github.com/gbmoraes-dev/mindflow-frontend.git

cd mindflow-frontend

cp .env.example .env
```

3. Execute a Aplicação

Para construir a imagem e iniciar o container em modo "detached" (em segundo plano):

```bash
docker compose up --build -d
```

Para rodar localmente:

```bash
bun dev
```
