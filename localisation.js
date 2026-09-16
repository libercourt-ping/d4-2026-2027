export class Localisation {
  /**
   *
   * @param {string} maps
   * @param {string | undefined} waze
   * @param {number | undefined} estimatedTime
   */
  constructor(maps, waze, estimatedTime) {
    this.maps = maps;
    this.waze = waze;
    this.estimatedTime = estimatedTime;
  }
}

/**
 * @type {{[key:string]:Localisation}}
 */
export const LOCALISATIONS = {
  BILLY_MONTIGNY: new Localisation(
    "https://maps.app.goo.gl/YRxGGkJVSe2V9r7s9",
    "https://ul.waze.com/ul?ll=50.41701369%2C2.92179449&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location",
    20,
  ),
  DAINVILLE: new Localisation(
    "https://maps.app.goo.gl/o1j8xiLoqZzV1tvr5",
    "https://ul.waze.com/ul?venue_id=1769975.17896357.1027196&overview=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location",
    35,
  ),
  BILLY_BERCLAU: new Localisation(
    "https://maps.app.goo.gl/e5gnFm48hG2bFdfW7",
    "https://ul.waze.com/ul?ll=50.51966790%2C2.86756790&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location",
    25,
  ),
};
