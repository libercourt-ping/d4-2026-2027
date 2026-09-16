import { Match } from "./matchs.js";
import { Player, Composition, Renfort } from "./player.js";

export const TEAM = Object.freeze({
  CEDRIC: new Player(0, "Cédric"),
  THEO: new Player(0, "Théo"),
  ERIC: new Player(0, "Eric"),
  MANO: new Player(0, "Mano"),
  LUDO: new Player(0, "Ludo"),
  STEVEN: new Player(1, "Steven"),
  TONY: new Player(3, "Tony"),
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
 * @type {Composition[]}
 */
export const composition = [
  { compo: [cedric, ludo, mano, theo], capitaine: cedric },
  { compo: [ludo, steven, eric, theo], capitaine: cedric },
  {
    compo: [theo, eric, cedric, steven],
    absents: [ludo, mano],
    capitaine: cedric,
  },
  {
    compo: [eric, theo, tony, steven],
    absents: [cedric, ludo, mano],
    capitaine: eric,
  },
  {
    compo: [cedric, eric, theo, steven],
    absents: [ludo, mano],
    capitaine: cedric,
    renfortsAutreEquipe: [
      new Renfort(tony, new Match("NOYELLES/LENS", "8h15")),
    ],
  },
  { compo: [ludo, cedric, steven, mano], capitaine: cedric, absents: [tony] },
  {
    compo: [cedric, ludo, theo, eric],
    capitaine: cedric,
    absents: [mano, tony],
  },
];
