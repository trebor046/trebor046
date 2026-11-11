// Gera os SVGs do README (bloco da stack e cabeçalhos dos projetos) nos dois
// temas, a partir das mesmas cores do banner. Sem dependências:
//
//   node scripts/gerar-svgs.mjs
//
// Regras que o GitHub impõe a SVG dentro de <img>: nada de JavaScript, nada de
// fonte ou imagem externa. Por isso o texto usa a fonte do sistema e a única
// animação é CSS dentro do próprio arquivo.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const temas = JSON.parse(
  readFileSync(join(raiz, "banner", "src", "tema.json"), "utf8"),
);
const saida = join(raiz, "assets");

const FONTE =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif";

const blocos = [
  {
    nome: "Front",
    cor: "front",
    itens: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
  },
  {
    nome: "Back",
    cor: "back",
    itens: ["Node.js", "Express", "Zod", "Docker"],
  },
  {
    nome: "Banco de dados",
    cor: "banco",
    itens: ["Supabase", "PostgreSQL", "PL/pgSQL"],
  },
  {
    nome: "Vídeo em código",
    cor: "video",
    itens: ["Remotion", "Three.js", "Python"],
  },
];

const projetos = [
  {
    arquivo: "projeto-veylo",
    nome: "Veylo",
    lado: "veylo-kappa.vercel.app",
    cor: "front",
  },
  {
    arquivo: "projeto-sala-tec",
    nome: "Sala Tec",
    lado: "sala-tec.vercel.app",
    cor: "banco",
  },
  {
    arquivo: "projeto-videos",
    nome: "Vídeos em código",
    lado: "feitos com Remotion",
    cor: "video",
  },
];

const escapar = (texto) =>
  texto.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Largura estimada do texto na fonte do sistema (varia entre Windows, macOS e
// Linux, então a pastilha leva folga dos dois lados).
const larguraDoTexto = (texto, tamanho) => texto.length * tamanho * 0.6;

function svgDaStack(cores) {
  const LARGURA = 736;
  // Coluna dos rótulos com folga: "Vídeo em código" passa de 180 px em
  // fontes largas (DejaVu Sans, no Linux sem Noto).
  const INICIO_DA_PISTA = 190;
  const ALTURA_DA_PISTA = 52;
  const VAO = 8;
  const altura = blocos.length * (ALTURA_DA_PISTA + VAO) - VAO;
  const descricao = blocos
    .map((bloco) => `${bloco.nome}: ${bloco.itens.join(", ")}.`)
    .join(" ");

  const pistas = [];
  const pastilhas = [];

  blocos.forEach((bloco, indice) => {
    const y = indice * (ALTURA_DA_PISTA + VAO);
    const meio = y + ALTURA_DA_PISTA / 2;

    pistas.push(
      `<text x="0" y="${meio + 7}" font-size="20" font-weight="600" fill="${cores.texto}">${escapar(bloco.nome)}</text>`,
      `<rect x="${INICIO_DA_PISTA}" y="${y}" width="${LARGURA - INICIO_DA_PISTA}" height="${ALTURA_DA_PISTA}" rx="10" fill="${cores.pista}"/>`,
    );

    let x = INICIO_DA_PISTA + 8;
    for (const item of bloco.itens) {
      const largura = Math.round(larguraDoTexto(item, 19) + 26);
      pastilhas.push(
        `<rect x="${x}" y="${y + 8}" width="${largura}" height="${ALTURA_DA_PISTA - 16}" rx="7" fill="${cores[bloco.cor]}"/>`,
        `<text x="${x + largura / 2}" y="${meio + 6.5}" font-size="19" font-weight="600" text-anchor="middle" fill="${cores.tintaNoClip}">${escapar(item)}</text>`,
      );
      x += largura + 8;
    }
    if (x > LARGURA) {
      throw new Error(
        `O bloco "${bloco.nome}" não cabe na pista: precisa de ${x} de ${LARGURA}.`,
      );
    }
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${LARGURA} ${altura}" width="${LARGURA}" height="${altura}" role="img" aria-labelledby="titulo descricao" font-family="${FONTE}">
  <title id="titulo">O que eu uso</title>
  <desc id="descricao">${escapar(descricao)}</desc>
  <style>
    .agulha { animation: varrer 18s linear infinite; }
    @keyframes varrer {
      0% { transform: translateX(${INICIO_DA_PISTA}px); opacity: 0; }
      3% { opacity: 1; }
      97% { opacity: 1; }
      100% { transform: translateX(${LARGURA}px); opacity: 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      .agulha { animation: none; opacity: 0; }
    }
  </style>
  ${pistas.join("\n  ")}
  <rect class="agulha" x="-1" y="0" width="2" height="${altura}" fill="${cores.texto}"/>
  ${pastilhas.join("\n  ")}
</svg>
`;
}

function svgDoProjeto(projeto, cores) {
  const LARGURA = 720;
  const ALTURA = 64;
  const id = `recorte-${projeto.arquivo}`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${LARGURA} ${ALTURA}" width="${LARGURA}" height="${ALTURA}" role="img" aria-labelledby="titulo" font-family="${FONTE}">
  <title id="titulo">${escapar(`${projeto.nome} (${projeto.lado})`)}</title>
  <clipPath id="${id}"><rect width="${LARGURA}" height="${ALTURA}" rx="10"/></clipPath>
  <g clip-path="url(#${id})">
    <rect width="${LARGURA}" height="${ALTURA}" fill="${cores.pista}"/>
    <rect width="10" height="${ALTURA}" fill="${cores[projeto.cor]}"/>
  </g>
  <text x="32" y="${ALTURA / 2 + 9}" font-size="26" font-weight="700" fill="${cores.texto}">${escapar(projeto.nome)}</text>
  <text x="${LARGURA - 26}" y="${ALTURA / 2 + 6}" font-size="17" text-anchor="end" fill="${cores.apagado}">${escapar(projeto.lado)}</text>
</svg>
`;
}

function gerar() {
  mkdirSync(saida, { recursive: true });
  const escritos = [];

  for (const [nomeDoTema, cores] of Object.entries(temas)) {
    const arquivos = {
      [`stack-${nomeDoTema}.svg`]: svgDaStack(cores),
    };
    for (const projeto of projetos) {
      arquivos[`${projeto.arquivo}-${nomeDoTema}.svg`] = svgDoProjeto(
        projeto,
        cores,
      );
    }
    for (const [nome, conteudo] of Object.entries(arquivos)) {
      writeFileSync(join(saida, nome), conteudo, "utf8");
      escritos.push(nome);
    }
  }

  console.log(`assets/: ${escritos.join(", ")}`);
}

gerar();
