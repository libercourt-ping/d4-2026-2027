export const TEAM = Object.freeze({
  CEDRIC: { start: 0, name: "Cédric" },
  THEO: { start: 0, name: "Théo" },
  ERIC: { start: 0, name: "Eric" },
  MANO: { start: 0, name: "Mano" },
  LUDO: { start: 0, name: "Ludo" },
  STEVEN: { start: 1, name: "Steven" },
  TONY: { start: 3, name: "Tony" },
});

const theo = TEAM.THEO;
const cedric = TEAM.CEDRIC;
const ludo = TEAM.LUDO;
const eric = TEAM.ERIC;
const mano = TEAM.MANO;
const steven = TEAM.STEVEN;
const tony = TEAM.TONY;

export const composition = [
  [cedric, ludo, mano, theo],
  [ludo, eric, steven, theo],
  [cedric, theo, eric, steven],
  [eric, tony, mano, steven],
  [cedric, theo, steven, eric],
  [ludo, cedric, tony, mano],
  [cedric, ludo, theo, mano],
];
