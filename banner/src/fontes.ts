import { loadFont as carregarTitulo } from "@remotion/google-fonts/BigShoulders";
import { loadFont as carregarTexto } from "@remotion/google-fonts/Archivo";

// Só os pesos usados, para o render não baixar a família inteira.
export const fonteDoTitulo = carregarTitulo("normal", {
  weights: ["800"],
  subsets: ["latin"],
}).fontFamily;

export const fonteDoTexto = carregarTexto("normal", {
  weights: ["400", "600"],
  subsets: ["latin"],
}).fontFamily;
