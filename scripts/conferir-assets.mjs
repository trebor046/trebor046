// Confere o README de perfil antes de ele ir para o ar. Sem dependências:
//
//   node scripts/conferir-assets.mjs
//
// Falha (código 1) se alguma imagem do README não existir, se uma imagem vier
// de outro site (widget de terceiros), se um SVG tiver algo que o GitHub
// bloqueia, ou se o banner passar do peso combinado.

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const LIMITE_DO_BANNER = 3 * 1024 * 1024;
const erros = [];

const readme = readFileSync(join(raiz, "README.md"), "utf8");

// Toda imagem citada em src="", srcset="" ou ![](...)
const imagens = [
  ...readme.matchAll(/\bsrc(?:set)?="([^"]+)"/g),
  ...readme.matchAll(/!\[[^\]]*\]\(([^)\s]+)/g),
].map((achado) => achado[1]);

if (imagens.length === 0) {
  erros.push("README.md não cita nenhuma imagem.");
}

for (const imagem of imagens) {
  if (/^(https?:)?\/\//.test(imagem)) {
    erros.push(`Imagem de fora do repositório: ${imagem}`);
  } else if (!existsSync(join(raiz, imagem))) {
    erros.push(`Imagem citada no README não existe: ${imagem}`);
  }
}

// Cada imagem com tema precisa das duas versões.
for (const imagem of imagens) {
  const par = imagem.includes("-escuro.")
    ? imagem.replace("-escuro.", "-claro.")
    : imagem.replace("-claro.", "-escuro.");
  if (par !== imagem && !imagens.includes(par)) {
    erros.push(`Falta a outra versão de tema de ${imagem} no README.`);
  }
}

const pastaDeAssets = join(raiz, "assets");
const arquivos = existsSync(pastaDeAssets) ? readdirSync(pastaDeAssets) : [];

const proibidoEmSvg = [
  [/<script/i, "tem <script>"],
  [/\son\w+\s*=/i, "tem atributo de evento (on...=)"],
  [/@import/i, "tem @import"],
  [/@font-face/i, "tem @font-face"],
  [/<foreignObject/i, "tem <foreignObject>"],
  [/(?:href|src)\s*=\s*["'](?:https?:)?\/\//i, "aponta para outro site"],
  [/url\(\s*["']?(?:https?:)?\/\//i, "carrega recurso de outro site"],
];

for (const arquivo of arquivos) {
  const caminho = join(pastaDeAssets, arquivo);

  if (arquivo.endsWith(".svg")) {
    const svg = readFileSync(caminho, "utf8");
    for (const [padrao, motivo] of proibidoEmSvg) {
      if (padrao.test(svg)) {
        erros.push(`assets/${arquivo} ${motivo}.`);
      }
    }
  }

  if (/^banner-.*\.(gif|webp)$/.test(arquivo)) {
    const tamanho = statSync(caminho).size;
    if (tamanho > LIMITE_DO_BANNER) {
      const emMb = (tamanho / 1024 / 1024).toFixed(2);
      erros.push(`assets/${arquivo} tem ${emMb} MB (limite: 3 MB).`);
    }
  }
}

if (erros.length > 0) {
  console.error(`${erros.length} problema(s):`);
  for (const erro of erros) {
    console.error(`- ${erro}`);
  }
  process.exit(1);
}

console.log(
  `README ok: ${imagens.length} imagens, todas do repositório, ${arquivos.length} arquivos em assets/.`,
);
