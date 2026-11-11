import {
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  type Clip,
  DURACAO,
  type Pista,
  pistas,
  QUADRO_FINAL_DA_AGULHA,
  type Tema,
} from "./dados";

const ESQUERDA = 190;
const DIREITA = 1224;
const LARGURA_DAS_PISTAS = DIREITA - ESQUERDA;
const TOPO_DA_REGUA = 252;
const TOPO_DAS_PISTAS = 282;
const ALTURA_DA_PISTA = 30;
const VAO = 8;
const BASE_DAS_PISTAS =
  TOPO_DAS_PISTAS + pistas.length * (ALTURA_DA_PISTA + VAO) - VAO;

type ComCores = {
  readonly cores: Tema;
};

const Regua = ({ cores }: ComCores) => {
  const { fps } = useVideoConfig();
  const segundos = Math.floor(QUADRO_FINAL_DA_AGULHA / fps);
  const marcas = Array.from({ length: segundos * 2 + 1 }, (_, i) => i / 2);

  return (
    <>
      {marcas.map((segundo) => {
        const inteiro = Number.isInteger(segundo);
        const x =
          ESQUERDA +
          ((segundo * fps) / QUADRO_FINAL_DA_AGULHA) * LARGURA_DAS_PISTAS;

        return (
          <div key={segundo}>
            <div
              style={{
                position: "absolute",
                left: x,
                top: TOPO_DA_REGUA + (inteiro ? 0 : 10),
                width: 2,
                height: inteiro ? 20 : 10,
                backgroundColor: cores.risco,
              }}
            />
            {inteiro ? (
              <div
                style={{
                  position: "absolute",
                  left: x + 8,
                  top: TOPO_DA_REGUA - 3,
                  fontSize: 16,
                  color: cores.apagado,
                }}
              >
                {segundo}s
              </div>
            ) : null}
          </div>
        );
      })}
    </>
  );
};

type ClipProps = {
  readonly clip: Clip;
  readonly cor: string;
};

// O clipe acende da esquerda para a direita conforme a agulha passa por ele,
// dá um pulso quando ela entra e apaga no fim do laço.
const ClipBarra = ({ clip, cor }: ClipProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrada = clip.inicio * QUADRO_FINAL_DA_AGULHA;
  const saida = clip.fim * QUADRO_FINAL_DA_AGULHA;
  const assentou = spring({
    frame: frame - entrada,
    fps,
    config: { damping: 9, stiffness: 180, mass: 0.6 },
  });

  return (
    <div
      style={{
        position: "absolute",
        left: clip.inicio * LARGURA_DAS_PISTAS,
        width: (clip.fim - clip.inicio) * LARGURA_DAS_PISTAS,
        top: 0,
        height: ALTURA_DA_PISTA,
        borderRadius: 7,
        overflow: "hidden",
        scale: frame < entrada ? "1 1" : `1 ${1 + 0.34 * (1 - assentou)}`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: cor,
          opacity: 0.28,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          backgroundColor: cor,
          width: interpolate(frame, [entrada, saida], ["0%", "100%"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          opacity: interpolate(frame, [DURACAO - 10, DURACAO - 1], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.4, 0, 0.2, 1),
          }),
        }}
      />
    </div>
  );
};

type PistaProps = ComCores & {
  readonly pista: Pista;
  readonly indice: number;
};

const PistaLinha = ({ pista, indice, cores }: PistaProps) => {
  const topo = TOPO_DAS_PISTAS + indice * (ALTURA_DA_PISTA + VAO);

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 60,
          top: topo,
          height: ALTURA_DA_PISTA,
          display: "flex",
          alignItems: "center",
          fontSize: 23,
          fontWeight: 600,
        }}
      >
        {pista.nome}
      </div>
      <div
        style={{
          position: "absolute",
          left: ESQUERDA,
          top: topo,
          width: LARGURA_DAS_PISTAS,
          height: ALTURA_DA_PISTA,
          borderRadius: 7,
          backgroundColor: cores.pista,
        }}
      >
        {pista.clipes.map((clip) => (
          <ClipBarra
            key={clip.inicio}
            clip={clip}
            cor={cores[pista.cor]}
          />
        ))}
      </div>
    </>
  );
};

const Agulha = ({ cores }: ComCores) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        left: ESQUERDA - 8,
        top: TOPO_DA_REGUA - 6,
        width: 16,
        height: BASE_DAS_PISTAS - TOPO_DA_REGUA + 14,
        translate: interpolate(
          frame,
          [0, QUADRO_FINAL_DA_AGULHA],
          ["0px 0px", `${LARGURA_DAS_PISTAS}px 0px`],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        ),
        opacity: interpolate(
          frame,
          [0, 3, DURACAO - 8, DURACAO - 1],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        ),
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 16,
          height: 18,
          backgroundColor: cores.texto,
          clipPath: "polygon(0 0, 100% 0, 100% 55%, 50% 100%, 0 55%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 7,
          top: 10,
          bottom: 0,
          width: 2,
          backgroundColor: cores.texto,
        }}
      />
    </div>
  );
};

export const LinhaDoTempo = ({ cores }: ComCores) => {
  return (
    <>
      <Regua cores={cores} />
      {pistas.map((pista, indice) => (
        <PistaLinha
          key={pista.nome}
          pista={pista}
          indice={indice}
          cores={cores}
        />
      ))}
      <Agulha cores={cores} />
    </>
  );
};
