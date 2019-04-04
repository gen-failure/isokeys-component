import MidiNotation from '../notations/midi';

export default class AbstractTuning {
  /**
   *  @abstract
   *  @return {NotationInstance}
   */
  static get notation() {
    return MidiNotation;
  }

  /**
   * @abstract
   * @return {string}
  */
  static get key() {
    return 'abstract, never use'
  }
  
  static fixDecimals(frequency, decimals) {
    return parseFloat(frequency.toFixed(decimals));
  }
}
