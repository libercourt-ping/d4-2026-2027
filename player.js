import { Match } from "./matchs.js";

export class Player {
  /**
   *
   * @param {number} start
   * @param {string} name
   */
  constructor(start, name) {
    this.start = start;
    this.name = name;
  }
}

export class Renfort {
  /**
   *
   * @param {Player} player
   * @param {Match} match
   */
  constructor(player, match) {
    this.player = player;
    this.match = match;
  }
}

export class Composition {
  /**
   *
   * @param {Player[]} compo
   * @param {[Renfort]} renfortsAutreEquipe
   * @param {Player} capitaine
   * @param {[Player]} absents
   */
  constructor(compo, renfortsAutreEquipe, capitaine, absents) {
    this.compo = compo;
    this.renfortsAutreEquipe = renfortsAutreEquipe;
    this.capitaine = capitaine;
    this.absents = absents;
  }
}
