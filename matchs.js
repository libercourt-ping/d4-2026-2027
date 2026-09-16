export class Match {
  /**
   *
   * @param {string} adversaire
   * @param {string | undefined} rdv
   * @param {Localisation | undefined} localisation
   */
  constructor(adversaire, rdv, localisation) {
    this.adversaire = adversaire;
    this.domicile = false;
    this.rdv = rdv;
    this.localisation = localisation;
    this.capitaine = "Cédric";
  }

  setDomicile() {
    this.domicile = true;
    return this;
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
   * Ajoute les absences connues des joueurs
   * @param  {...{ start: number, name: string }} absences
   */
  addAbsences(...absences) {
    this.absences = absences;
    return this;
  }

  /**
   * Ajoute un capitaine
   * @param {string} value
   */
  addCapitaine(value) {
    this.capitaine = value;
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
