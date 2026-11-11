# Banner do perfil

O banner do README é um vídeo de 8 segundos escrito em React e renderizado com
[Remotion](https://www.remotion.dev). Ele sai como GIF, um por tema, em `../assets`.

A animação é uma linha do tempo de edição de vídeo: quatro pistas (Front, Back,
Banco e Vídeo) com um clipe por tecnologia. A agulha percorre a linha e os clipes
acendem quando ela passa. O contador mostra o quadro real do vídeo.

## Rodar

```bash
npm install
npm run dev      # abre o Remotion Studio para editar com prévia
npm run render   # grava ../assets/banner-escuro.gif e banner-claro.gif
```

Depois de mudar cores em `src/tema.json`, gere de novo os SVGs do README, a
partir da raiz do repositório:

```bash
node scripts/gerar-svgs.mjs
node scripts/conferir-assets.mjs
```

## Onde mexer

| Arquivo | O que tem |
|---|---|
| `src/tema.json` | Cores dos dois temas. Os SVGs do README leem daqui também. |
| `src/dados.ts` | Tamanho, duração, pistas e posição dos clipes. |
| `src/Banner.tsx` | Nome e frase. |
| `src/LinhaDoTempo.tsx` | Régua, pistas, clipes e agulha. |
| `src/Contador.tsx` | Contador de quadros. |
| `scripts/renderizar.mjs` | Render dos dois temas, um por vez. |

## Por que cada dependência

| Pacote | Para quê |
|---|---|
| `remotion`, `@remotion/cli` | Escrever o vídeo em React e renderizar pela linha de comando. |
| `react`, `react-dom` | O Remotion renderiza componentes React. |
| `@remotion/google-fonts` | Carrega as fontes do banner (Big Shoulders e Archivo) e segura o render até elas chegarem, para nenhum quadro sair com fonte errada. |
| `typescript`, `@types/react`, `@types/web` | Checagem de tipos (`npm run lint`). |
| `eslint`, `@remotion/eslint-config-flat` | Regras de lint do próprio Remotion, que pegam erros comuns de vídeo. |

## Decisões

- 20 quadros por segundo: no GIF cada quadro dura um número inteiro de
  centésimos de segundo, e 20 fps dá exatamente 5. Com 30 fps o tempo sairia
  arredondado.
- Quadros em PNG: as cores são chapadas, e o JPEG deixaria ruído que engorda o GIF.
- Um render por vez: cada render abre um navegador, e dois juntos estouram a
  memória em máquina de 8 GB.
- Nome e frase ficam parados. Quem chega no meio do laço lê o nome na hora, e
  o GIF fica leve porque só a linha do tempo muda entre os quadros.
