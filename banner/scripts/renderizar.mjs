// Renderiza o banner nos dois temas e grava os GIFs em ../assets.
//
//   npm run render
//
// Um tema por vez de propósito: cada render abre um navegador, e dois juntos
// estouram a memória em máquina de 8 GB.

import { spawnSync } from "node:child_process";
import { statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const pastaDoBanner = join(dirname(fileURLToPath(import.meta.url)), "..");
const assets = join(pastaDoBanner, "..", "assets");

const renders = [
  { composicao: "Banner-Escuro", arquivo: "banner-escuro.gif" },
  { composicao: "Banner-Claro", arquivo: "banner-claro.gif" },
];

for (const { composicao, arquivo } of renders) {
  const destino = join(assets, arquivo);
  // Caminho relativo à pasta do banner: sem espaço nem caractere especial,
  // então não precisa de aspas no shell (que o npx exige no Windows).
  const resultado = spawnSync(
    "npx",
    ["remotion", "render", composicao, `../assets/${arquivo}`, "--codec=gif"],
    { cwd: pastaDoBanner, stdio: "inherit", shell: true },
  );

  if (resultado.status !== 0) {
    console.error(`O render de ${composicao} falhou.`);
    process.exit(resultado.status ?? 1);
  }

  const emKb = Math.round(statSync(destino).size / 1024);
  console.log(`${arquivo}: ${emKb} kB`);
}
