import temaJson from "./tema.json";

export type NomeDoTema = keyof typeof temaJson;
export type Tema = (typeof temaJson)[NomeDoTema];
export type CorDaPista = "front" | "back" | "banco" | "video";

export const temas = temaJson;

// O banner é um GIF: 20 quadros por segundo dá 5 centésimos por quadro,
// que é um atraso exato no formato (30 fps não é).
export const FPS = 20;
export const DURACAO = 160;
export const LARGURA = 1280;
export const ALTURA = 460;

// Quadro em que a agulha chega ao fim da linha do tempo. O resto do laço
// apaga os clipes para o GIF recomeçar sem salto.
export const QUADRO_FINAL_DA_AGULHA = 148;

export type Clip = {
  readonly inicio: number;
  readonly fim: number;
};

export type Pista = {
  readonly nome: string;
  readonly cor: CorDaPista;
  readonly clipes: readonly Clip[];
};

// Cada pista tem um clipe por tecnologia do bloco de mesmo nome no README.
// As posições (de 0 a 1 na largura da pista) só desenham o ritmo.
export const pistas: readonly Pista[] = [
  {
    nome: "Front",
    cor: "front",
    clipes: [
      { inicio: 0.02, fim: 0.2 },
      { inicio: 0.22, fim: 0.47 },
      { inicio: 0.52, fim: 0.7 },
      { inicio: 0.72, fim: 0.97 },
    ],
  },
  {
    nome: "Back",
    cor: "back",
    clipes: [
      { inicio: 0.08, fim: 0.3 },
      { inicio: 0.33, fim: 0.5 },
      { inicio: 0.6, fim: 0.72 },
      { inicio: 0.76, fim: 0.92 },
    ],
  },
  {
    nome: "Banco",
    cor: "banco",
    clipes: [
      { inicio: 0, fim: 0.26 },
      { inicio: 0.3, fim: 0.58 },
      { inicio: 0.66, fim: 0.88 },
    ],
  },
  {
    nome: "Vídeo",
    cor: "video",
    clipes: [
      { inicio: 0.12, fim: 0.42 },
      { inicio: 0.46, fim: 0.66 },
      { inicio: 0.7, fim: 0.94 },
    ],
  },
];
