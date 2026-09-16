import { Player, Composition, Renfort } from "./player.js";

export class Match {
  /**
   *
   * @param {string} adversaire
   * @param {string | undefined} rdv
   * @param {Localisation | null} localisation
   */
  constructor(adversaire, rdv, localisation) {
    this.adversaire = adversaire;
    this.domicile = false;
    this.rdv = rdv;
    this.team = null;
    this.capitaine = null;
    this.absences = null;
    this.renfortsAutreEquipe = null;
    this.localisation = null;

    if (localisation) {
      this.localisation = localisation;
    } else {
      this.domicile = true;
    }
  }

  /**
   * @param {string} date
   */
  setDate(date) {
    this.date = date;
  }

  /**
   *
   * @param {Composition} composition
   */
  load(composition) {
    const { compo, absents, capitaine, renfortsAutreEquipe } = composition;
    /**
     * @type {Player[]}
     */
    this.team = compo;
    /**
     * @type {Player}
     */
    this.capitaine = capitaine;

    /**
     * @type {Player[]}
     */
    this.absences = absents ?? [];

    /**
     * @type {Renfort[]}
     */
    this.renfortsAutreEquipe = renfortsAutreEquipe ?? [];
  }

  /**
   *
   * @param {number} value
   */
  addNbWonMatchs(value) {
    this.nbWinMatchs = value;
    return this;
  }

  /**
   * Ajoute des détails sur la gestion
   * @param {string} details
   */
  addDetails(details) {
    this.details = details;
    return this;
  }
}
