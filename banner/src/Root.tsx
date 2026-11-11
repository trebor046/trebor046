import { Composition } from "remotion";
import { Banner } from "./Banner";
import { ALTURA, DURACAO, FPS, LARGURA } from "./dados";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="Banner-Escuro"
        component={Banner}
        durationInFrames={DURACAO}
        fps={FPS}
        width={LARGURA}
        height={ALTURA}
        defaultProps={{ tema: "escuro" }}
      />
      <Composition
        id="Banner-Claro"
        component={Banner}
        durationInFrames={DURACAO}
        fps={FPS}
        width={LARGURA}
        height={ALTURA}
        defaultProps={{ tema: "claro" }}
      />
    </>
  );
};
