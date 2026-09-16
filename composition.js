export const TEAM = Object.freeze({
  CEDRIC: { start: 0, name: "Cédric" },
  THEO: { start: 0, name: "Théo" },
  ERIC: { start: 0, name: "Eric" },
  MANO: { start: 0, name: "Mano" },
  LUDO: { start: 0, name: "Ludo" },
  STEVEN: { start: 1, name: "Steven" },
  TONY: { start: 3, name: "Tony" },
});

export const [theo, cedric, ludo, eric, mano, steven, tony] = [
  TEAM.THEO,
  TEAM.CEDRIC,
  TEAM.LUDO,
  TEAM.ERIC,
  TEAM.MANO,
  TEAM.STEVEN,
  TEAM.TONY,
];

/**
 * @type {string[][]}
 */
export const composition = [
  [cedric, ludo, mano, theo],
  [ludo, steven, eric, theo],
  [theo, eric, cedric, steven],
  [eric, theo, tony, steven],
  [cedric, eric, theo, steven],
  [ludo, cedric, tony, mano],
  [cedric, ludo, theo, mano],
];
