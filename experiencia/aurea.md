# Meu trabalho na AUREA

Fui Desenvolvedor Full Stack Júnior na AUREA de abril a setembro de 2026.

A AUREA é uma empresa de tecnologia. Ela desenvolveu as plataformas internas usadas pelo time da Aceleraí, empresa que conecta marcas a celebridades para campanhas de publicidade, voltada a pequenas e médias empresas.

## Por que o código não está aqui

Esses sistemas são internos e pertencem à empresa. O código fica nos repositórios privados dela, que eu acessava com a conta corporativa, e não com esta conta do GitHub. Por isso esta página só descreve o que cada sistema fazia e qual foi a minha parte. Não há código, telas reais nem dados de clientes.

## O que eu usava

React, TypeScript, Node.js, Supabase (PostgreSQL) e integrações com IA (Claude API e MCP).

## Os sistemas

### Aceleraí CRM

**O que era:** o CRM da operação comercial, com funil, calendário e montagem de propostas.

**O que eu fiz:** a sustentação, perto dos vendedores.

- Carga de listas de leads no banco, conferindo se cada uma entrou certa.
- Ajustes de dados, imagens e acessos de quem entrava ou saía do time.
- Melhorias de front-end pedidas pelos vendedores.
- Ajuste no calendário para o convite da reunião ir direto ao cliente.

Escrevi sobre isso [neste post](https://www.linkedin.com/feed/update/urn:li:share:7525969774930124801/).

### Aceleraí Vision

**O que era:** o painel de desempenho do time comercial. O vendedor via faturamento, conversão, os nichos em que vendia melhor e o ritmo para a meta, recebia feedback e marcava a conversa individual com o diretor. O diretor via o time inteiro e o Sonar: leads e vendas apareciam como pontos em um radar, ao lado do faturamento e de quanto faltava para a meta.

**O que eu fiz:** ajudei a montar o produto e fiz a maior parte da estrutura visual e dos gráficos: velocímetros com ponteiro, anéis de progresso e o radar com linha de varredura.

Mostrei o Sonar em vídeo [neste post](https://www.linkedin.com/feed/update/urn:li:ugcPost:7526377759812587520/). O vídeo recria a tela em animação, com dados fictícios.

### Aurea Pages

**O que era:** a plataforma interna de criação e hospedagem de landing pages.

**O que eu fiz:** peguei o sistema já funcionando e trabalhei na evolução dele. Nesse período a plataforma passou a ter:

- As páginas que estavam em ferramentas externas, reunidas em um lugar só.
- Criação a partir de um modelo, de um design do Figma ou de uma página existente.
- Um banco de formas, imagens e modelos.
- Criação com IA, a partir de uma descrição e de referências.
- Um painel lateral de edição.
- A "tesoura", que seleciona um elemento da página para editar só aquele pedaço.

### Aurea Cloud

**O que era:** a plataforma de planejamento de campanhas, com um painel de marketing: investimento, leads, custo, métricas de Instagram e Facebook e funis por origem (landing page, post, anúncio).

**O que eu fiz:** trabalhei na camada visual.

### Curadoria

**O que era:** um painel de visualização por celebridade, com região, nicho, vendas e etapa do processo.

**O que eu fiz:** trabalhei na visualização.

### Abracadabra

**O que era:** uma ferramenta interna de chamadas.

**O que eu fiz:** participação menor, em testes e detalhes visuais.

## Um caso de performance

O painel principal levava cerca de 7 s para responder. As consultas ignoravam o índice do banco. Reescrevi essas consultas e a resposta caiu para cerca de 600 ms.
