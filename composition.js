export const TEAM = Object.freeze({
  CEDRIC: "Cédric",
  THEO: "Théo",
  ERIC: "Eric",
  MANO: "Mano",
  LUDO: "Ludo",
  STEVEN: "Steven",
});

const theo = TEAM.THEO;
const cedric = TEAM.CEDRIC;
const ludo = TEAM.LUDO;
const eric = TEAM.ERIC;
const mano = TEAM.MANO;
const steven = TEAM.STEVEN;

export const composition = [
  [cedric, ludo, mano, theo],
  [ludo, eric, steven, theo],
  [cedric, mano, eric, steven],
  [eric, ludo, mano, theo],
  [cedric, mano, theo, eric],
  [mano, cedric, eric, steven],
  [cedric, ludo, theo, steven],
];
