import AbstractNotation from './abstract';

export default class MidiNotation extends AbstractNotation {
  get basicTone() {
    return this.number % 12;
  }
  
  get octave() {
    return Math.floor((this.number / 12)); 
  }

  get isValid() {
    return (this.number >=0 && this.number <= 127);
  }
  
  static get all() {
    let allTones = [];
    for (let i = 0;i<128;i++) {
      allTones.push(i)
    }

    return allTones;
  }

  static get intervals() {
    return {
      A1: 1,
      M2: 2,
      m3: 3,
      M3: 4,
      P4: 5,
      P5: 7,
      PO: 12
    }
  }

  static get basicTones() {
    return {0: 'C', 1: 'C♯', 2: 'D', 3: 'D♯', 4: 'E', 5: 'F', 6: 'G♭', 7: 'G', 8: 'A♭', 9: 'A', 10: 'B♭', 11: 'B'};
  }

  static get rootTones() {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  }

  static get sharps() {
    return [1, 3, 6];
  }

  static get flats() {
    return [8, 10];
  }

  static get label() {
    return 'Midi';
  }

  static get key() {
    return 'midi';
  }
}
