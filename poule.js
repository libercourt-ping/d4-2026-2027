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
  new Match("ST LAUREN/BLANG 15").setDomicile(),
  new Match("LEFOREST TT 7").setDomicile(),
  new Match("DAINVILLE ASTT 9", "8h15", LOCALISATIONS.DAINVILLE),
  new Match("FOUQUIERES/LENS 7").setDomicile(),
  new Match("BILLY BERCLAU 6", "8h25", LOCALISATIONS.BILLY_BERCLAU),
  new Match("LOISON / LENS 3").setDomicile(),
];
