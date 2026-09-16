import { composition } from "./composition.js";
import { isMobile } from "./data.js";
import { LOCALISATIONS } from "./localisation.js";
import { Match } from "./matchs.js";
import { Player } from "./player.js";

export const dates = [
  "20 septembre",
  "04 octobre",
  "18 octobre",
  "08 novembre",
  "22 novembre",
  "06 décembre",
  "13 décembre",
].map((el, index) => (isMobile ? el : `Dimanche ${el}`));

/**
 * @type {Match[]}
 */
export const poule = [
  new Match(
    "BILLY-MONTIGNY 5",
    "8h30",
    LOCALISATIONS.BILLY_MONTIGNY,
  ).addNbWonMatchs(6),
  new Match("ST LAUREN/BLANG 15").addNbWonMatchs(8),
  new Match("LEFOREST TT 7").addNbWonMatchs(11),
  new Match("DAINVILLE ASTT 9", "8h15", LOCALISATIONS.DAINVILLE)
    .addDetails(
      "Eric partira de son côté.\nPour Théo, Tony et Steven, départ avec Tony",
    )
    .addNbWonMatchs(9),
  new Match("FOUQUIERES/LENS 7").addDetails(
    "Tony jouera avec l'équipe de Vincent.",
  ),
  new Match("BILLY BERCLAU 6", "8h25", LOCALISATIONS.BILLY_BERCLAU),
  new Match("LOISON / LENS 3"),
];

poule.forEach((el, index) => {
  el.setDate(dates[index]);
  el.load(composition[index]);
});

/**
 *
 * @param {Player} player
 */
export function filterMatch(player) {
  const compo = poule
    .filter((el) => el.team.includes(player))
    .map((el) => {
      const index = dates.findIndex((d) => el.date === d);
      return {
        ...el,
        future: !el.nbWinMatchs,
        isRenfort: false,
        index,
      };
    });

  const renforts = poule
    .filter((el) =>
      el.renfortsAutreEquipe.some((el) => el && el.player.name === player.name),
    )
    .map((el) => {
      const index = dates.findIndex((d) => el.date === d);
      const infoMatch = el.renfortsAutreEquipe.find((r) => r.player === player);
      return {
        date: el.date,
        ...infoMatch,
        future: !infoMatch.match.nbWinMatchs,
        isRenfort: true,
        index,
      };
    });

  return [...compo, ...renforts];
}
