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
}
