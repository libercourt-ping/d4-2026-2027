import { cedric, ludo, mano, tony } from "./composition.js";
import { LOCALISATIONS } from "./localisation.js";
import { Match } from "./matchs.js";

/**
 * @type {Match[]}
 */
export const poule = [
  new Match(
    "BILLY-MONTIGNY 5",
    "8h30",
    LOCALISATIONS.BILLY_MONTIGNY,
  ).addNbWonMatchs(6),
  new Match("ST LAUREN/BLANG 15").setDomicile().addNbWonMatchs(8),
  new Match("LEFOREST TT 7")
    .setDomicile()
    .addAbsences(ludo, mano)
    .addNbWonMatchs(11),
  new Match("DAINVILLE ASTT 9", "8h15", LOCALISATIONS.DAINVILLE)
    .addAbsences(cedric, ludo, mano)
    .addCapitaine("Eric")
    .addDetails(
      "Eric partira de son côté.\nPour Théo, Tony et Steven, départ avec ?",
    ),
  new Match("FOUQUIERES/LENS 7").setDomicile().addAbsences(tony, mano),
  new Match("BILLY BERCLAU 6", "8h25", LOCALISATIONS.BILLY_BERCLAU),
  new Match("LOISON / LENS 3").setDomicile(),
];
