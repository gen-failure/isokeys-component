class AbstractNotation {
  constructor(tone, octave) {
    switch(typeof tone) {
      case 'number':
        this.toneNumber = tone;
        break;
      case 'string':
        let basicTones = Object.keys(this.constructor.basicTones);
        for (let i in basicTones) {
          if (this.constructor.basicTones[basicTones[i]] === tone) {
            this.toneNumber = Number(basicTones[i]);
            break;
          }
        }
        break;
      default:
        break;
    }
    if (arguments[1]) {
      this.toneNumber += this.constructor.intervals.PO*(octave);
    }
  }

  /**
   *  @return {Tone}
   */
  increase(interval, steps=1) {
    return new this.constructor(this.toneNumber + (interval*steps));
  }

  /**
   *  @return {Tone}
   */
  decrease(interval,steps=1) {
    return this.increase(interval,steps*-1)
  }
  
  /**
   * @return {String}
  */
  get label() {
    return `${this.constructor.basicTones[this.basicTone]}${this.octave}`; 
  }

  /**
   * @return {Boolean}
  */
  get isFlat() {
    return Boolean(this.constructor.flats.indexOf(this.basicTone) !== -1);
  }
  

  /**
   * @return {Boolean}
   */

  get isSharp() {
    return Boolean(this.constructor.sharps.indexOf(this.basicTone) !== -1);
  }

  /**
   * @return {Boolean}
   */
  get isSemitone() {
    return this.isFlat || this.isSharp;
  }

  /**
   *  Just a syntax sugar
   */
  get number() {
    return this.toneNumber;
  }
  /**
   * @abstract
   * @return {Boolean}
   */
  get isValid() {
    return false
  }

  /**
   *  @abstract
   *  @return {Number}
   */
  get basicTone() {
    return 0;
  }

  /**
   *  @abstract
   *  @return {Number}
   */
  get octave() {
    return 0;
  }

  /**
   *  @abstract
   *  @return {Object}
   */
  static get basicTones() {
    return {};
  }

  /**
   *  @abstract
   *  @return {Array}
   */
  static get rootTones() {
    return [];
  }

  /**
   *  @abstract
   *  @return {Array}
   */
  static get sharps() {
    return [];
  }

  /**
   *  @abstract
   *  @return {Array}
   */
  static get flats() {
    return [];
  }

  static get defaultStartTone() {
    return new this('C', 4);
  }
  
  static get defaultTuningTone() {
    return new this('A', 4);
  }

  static get defaultTuningFrequency() {
    return 440;
  }

  /**
   *  Return list of all possible tones
   *
   * @abstract
   * return {Array}
  */
  static get all() {
    return []
  }
  
  static get octaves(){
    return [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
  }
}

export default AbstractNotation;
