import { useCurrentFrame, useVideoConfig } from "remotion";
import type { Tema } from "./dados";

type Props = {
  readonly cores: Tema;
};

// Mostra o quadro real do vídeo. Cada algarismo ocupa uma caixa de largura
// fixa para o número não "dançar" quando muda.
export const Contador = ({ cores }: Props) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const algarismos = String(frame + 1).padStart(3, "0").split("");

  return (
    <div
      style={{
        position: "absolute",
        right: 56,
        top: 52,
        display: "flex",
        alignItems: "baseline",
        fontSize: 24,
        fontWeight: 600,
        color: cores.apagado,
      }}
    >
      <span style={{ marginRight: 10, fontWeight: 400 }}>quadro</span>
      {algarismos.map((algarismo, posicao) => (
        <span
          key={posicao}
          style={{
            display: "inline-block",
            width: 16,
            textAlign: "center",
            color: cores.texto,
          }}
        >
          {algarismo}
        </span>
      ))}
      <span style={{ marginLeft: 8, fontWeight: 400 }}>
        de {durationInFrames}
      </span>
    </div>
  );
};
