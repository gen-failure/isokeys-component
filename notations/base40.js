import AbstractNotation from './abstract';

export default class Base40Notation extends AbstractNotation {

  get basicTone() {
    let toneIndex = this.number % 40;
    return (toneIndex !== 0) ? toneIndex : 40;
  }

  get octave() {
    return Math.floor((this.number / 40)); 
  }
  
  //FIXME: Fix problem with non existent tones (like triple flat etc.)
  get isValid() {
    return (this.number > 0 && this.number <= 360)
  }

  static get all() {
    let baseTones = Object.keys(this.basicTones);
    let tones = [];

    for (let octave=0;octave<=9;octave++) {
      baseTones.forEach((baseTone) => {
        let fullTone = parseInt(baseTone) + (40*octave);
        tones.push(new this(fullTone));
      });
    }
    return tones;
  }

  static get intervals() {
    return {
      M2: 6,
      m3: 11,
      M3: 12,
      P4: 17,
      P5: 23,
      PO: 40
    }
  }

  static get basicTones() {
    return {
      1: 'C♭♭', 2: 'C♭', 3: 'C', 4: 'C♯', 5: 'C♯♯',
      7: 'D♭♭', 8: 'D♭', 9: 'D', 10:'D♯', 11:'D♯♯',
      13: 'E♭♭', 14: 'E♭', 15:'E', 16: 'E♯', 17: 'E♯♯',
      18: 'F♭♭', 19: 'F♭', 20: 'F', 21:'F♯', 22: 'F♯♯', 
      24: 'G♭♭', 25: 'G♭', 26: 'G', 27: 'G♯', 28: 'G♯♯',
      30: 'A♭♭', 31:'A♭', 32: 'A', 33: 'A♯', 34: 'A♯♯',
      36:'B♭♭', 37:'B♭', 38:'B', 39: 'B♯', 40: 'B♯♯',
    };
  }

  static get rootTones() {
   return [2, 3, 9, 14, 15, 20, 26, 32, 38];
  }

  static get sharps() {
    return [4, 10, 21, 27, 33, 40];
  }

  static get flats() {
    return [2, 8, 14, 18, 25, 31, 37];
  }

  static get label() {
    return 'Base40';
  }

  static get key() {
    return 'base40';
  }
}
