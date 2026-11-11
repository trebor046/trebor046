import { AbsoluteFill } from "remotion";
import { Contador } from "./Contador";
import { type NomeDoTema, temas } from "./dados";
import { fonteDoTexto, fonteDoTitulo } from "./fontes";
import { LinhaDoTempo } from "./LinhaDoTempo";

export type BannerProps = {
  readonly tema: NomeDoTema;
};

export const Banner = ({ tema }: BannerProps) => {
  const cores = temas[tema];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: cores.fundo,
        color: cores.texto,
        fontFamily: fonteDoTexto,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 56,
          top: 34,
          fontFamily: fonteDoTitulo,
          fontWeight: 800,
          fontSize: 148,
          lineHeight: 1,
          letterSpacing: "0.01em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        Robert Sousa
      </div>
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 190,
          fontSize: 31,
          fontWeight: 400,
          color: cores.apagado,
          whiteSpace: "nowrap",
        }}
      >
        Desenvolvedor full stack: web, banco de dados e vídeo em código.
      </div>
      <Contador cores={cores} />
      <LinhaDoTempo cores={cores} />
    </AbsoluteFill>
  );
};
